<template>
	<b-modal size="md" centered no-close-on-backdrop no-close-on-esc ref="modal"
		><template v-slot:modal-header>
			<h5>Nueva Carga</h5>
		</template>
		<template v-slot:default>
			<form ref="form">
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
			<b-button size="md" variant="success" @click="sendForm"
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
			year: ""
		};
	},
	methods: {
		create() {
			let formData = new FormData();
			formData.append("file", this.file);
			formData.append("year", this.year);
			dataService
				.upload(`ordenesMerito/upload`, formData)
				.then(res => {
					this.closeModal();
					if (!res.failed_rows)
						this.$root.createToast(
							`Se procesaron de manera correcta ${res.success_rows}`,
							"success"
						);
					this.showMsgBox(res);
				})
				.catch(error => {
					console.log(error);
					this.vErrors = error.response.data.errors ?? [];
				});
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
						buttonSize: "sm",
						okVariant: "success",
						okTitle: "Aceptar",
						cancelTitle: "Cancelar",
						footerClass: "p-2",
						hideHeaderClose: false,
						centered: true
					}
				)
				.then(value => {
					if (value) this.$router.push({ name: "OrdenesFails" });
				})
				.catch(err => {
					console.log(err);
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