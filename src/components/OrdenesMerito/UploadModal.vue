<template>
	<b-modal size="md" centered no-close-on-backdrop no-close-on-esc ref="modal"
		><template v-slot:modal-header>
			<h5>Nueva Carga</h5>
			<a href @click.prevent="showInfo = !showInfo">
				<i class="material-icons" title="Ayuda">help_outline </i>
			</a>
		</template>
		<template v-slot:default>
			<b-alert
				:show="showInfo"
				variant="primary"
				class="mb-5"
				dismissible
				@dismissed="showInfo = false"
			>
				<b-row>
					<b-col>
						<b
							>Un docente solo se puede incribir una vez por año a
							un mismo cargo.</b
						></b-col
					>
				</b-row>
				<b-row class="mt-2">
					<b-col>
						<b>Incumbencia:</b> No obligatorio. Admitidos valores
						que contengan A1, A2, A3, B1, B2, B3, B4, B5, C1, C2,
						C3, C4, C5.
					</b-col>
				</b-row>
				<b-row class="mt-2">
					<b-col>
						<b>Nivel:</b>Admitidos valores inicial, primario,
						secundario.
					</b-col>
				</b-row>
				<b-row class="mt-2">
					<b-col>
						<b>Región:</b> Admitidos valores del 1 al 6.
					</b-col>
				</b-row>
				<b-row class="mt-2">
					<b-col>
						<b>Nombre y Apellido:</b> Son de caracter obligatorio.
					</b-col>
				</b-row>
				<b-row class="mt-2">
					<b-col>
						<b>CUIL/CUIT:</b> Solo numeros, sin guiones.
					</b-col>
				</b-row>
				<b-row class="mt-2">
					<b-col>
						<b>Genero:</b> Solo admitido masculino y femenino.
					</b-col>
				</b-row>
				<b-row class="mt-2">
					<b-col> <b>Localidad:</b> De caracter obligatorio. </b-col>
				</b-row>
				<b-row class="mt-2">
					<b-col> <b>Cargo:</b> De caracter obligatorio. </b-col>
				</b-row>
				<b-row class="mt-2">
					<b-col> <b>Titulo 1:</b> De caracter obligatorio. </b-col>
				</b-row>
				<b-row class="mt-2">
					<b-col>
						<b
							>MAXIMO DE REGISTROS ERRONEOS PERMITIDOS: 50.</b
						></b-col
					>
				</b-row>
			</b-alert>

			<form ref="form" @submit.prevent="sendForm">
				<b-row align-h="center">
					<b-col xs="12" md="12" class="mb-3">
						<b-form-input
							:class="{ 'is-invalid': hasError('year') }"
							placeholder="Ingrese el año..."
							type="number"
							required
							v-model="year"
							size="md"
							min="2000"
							max="2020"
							step="1"
						></b-form-input>
						<div class="invalid-feedback" v-if="hasError('year')">
							{{ getError("year") }}
						</div>
					</b-col>
					<b-col xs="12" md="12" class="mt-3">
						<b-form-file
							:state="!hasError('file') && Boolean(file)"
							v-model="file"
							placeholder="Seleccione o arrastre un documento..."
							drop-placeholder="Arrastre un documento..."
							browse-text="Buscar"
							accept=".xls,.xlsx,.csv"
							required
							size="md"
						></b-form-file>
						<div class="invalid-feedback" v-if="hasError('file')">
							{{ getError("file") }}
						</div></b-col
					>
				</b-row>
				<b-alert
					:show="hasError('message')"
					variant="danger"
					class="mt-5 text-center"
					>{{ vErrors.message }}</b-alert
				>
			</form>
		</template>
		<template v-slot:modal-footer>
			<b-button size="md" variant="outline" @click="closeModal()"
				>Cancelar</b-button
			>
			<b-button
				size="md"
				variant="success"
				@click="sendForm"
				:disabled="loader"
			>
				<b-spinner small class="mb-1 mr-1" v-show="loader"></b-spinner
				>Enviar</b-button
			>
		</template>
	</b-modal>
</template>
<script>
import FormMixin from "../shared/mixins/formMixin";
import dataService from "../../services/data-service";

export default {
	mixins: [FormMixin],
	data() {
		return {
			file: null,
			year: "",
			loader: false,
			showInfo: false
		};
	},
	methods: {
		create() {
			let formData = new FormData();
			formData.append("file", this.file);
			formData.append("year", this.year);
			this.loader = true;
			dataService
				.upload(`ordenesMerito/upload`, formData)
				.then(res => {
					this.closeModal();
					if (!res.failed_rows)
						this.$root.createToast(
							`Se procesaron de manera correcta ${res.success_rows}`,
							"success"
						);
					else this.showMsgBox(res);
				})
				.catch(error => {
					this.vErrors = error.response.data.errors ?? [];
				})
				.finally(() => (this.loader = false));
		},
		show() {
			this.$refs.modal.show();
		},
		closeModal() {
			this.file = null;
			this.year = "";
			this.vErrors = [];
			this.$refs.modal.hide();
		},

		showMsgBox(data) {
			this.$bvModal
				.msgBoxConfirm(
					`Fallaron ${
						data.failed_rows
					} registros, de ${data.success_rows +
						data.failed_rows}. ¿Desea repararlos ahora?`,
					{
						size: "sm",
						buttonSize: "md",
						okVariant: "success",
						okTitle: "Aceptar",
						cancelVariant: "outlined",
						cancelTitle: "Cancelar",
						footerClass: "p-2",
						hideHeaderClose: false,
						centered: true,
						bodyClass: "text-center"
					}
				)
				.then(value => {
					if (value) this.$router.push({ name: "OrdenesFails" });
					else this.$emit("on-done");
				});
		}
	}
};
</script>

<style lang="scss" scoped>
::v-deep .modal-body {
	padding: 40px 40px;
	[type="number"] {
		height: 33px;
	}
}
</style>