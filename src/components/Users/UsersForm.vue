<template>
	<b-card class="mt-5">
		<template v-slot:header>
			<h5 class="my-1">
				{{ isEditMode ? "Editar Usuario" : "Nuevo Usuario" }}
			</h5>
		</template>
		<b-card-body>
			<form ref="form" @submit.prevent="sendForm">
				<div class="form-group">
					<label>Apellido</label>
					<input
						type="text"
						name="last_name"
						class="form-control"
						:class="{ 'is-invalid': hasError('last_name') }"
						required
						maxlength="100"
						minlength="3"
						v-model="form.last_name"
					/>
					<div class="invalid-feedback" v-if="hasError('last_name')">
						{{ getError("last_name") }}
					</div>
				</div>
				<div class="form-group">
					<label>Nombre</label>
					<input
						type="text"
						name="name"
						class="form-control"
						:class="{ 'is-invalid': hasError('name') }"
						required
						maxlength="100"
						minlength="3"
						v-model="form.name"
					/>
					<div class="invalid-feedback" v-if="hasError('name')">
						{{ getError("name") }}
					</div>
				</div>
				<b-row>
					<b-col sm="12" md="6" class="form-group">
						<label>DNI</label>
						<input
							type="text"
							name="dni"
							class="form-control"
							:class="{ 'is-invalid': hasError('dni') }"
							required
							minlength="8"
							maxlength="8"
							v-model="form.dni"
						/>
						<div class="invalid-feedback" v-if="hasError('dni')">
							{{ getError("dni") }}
						</div>
					</b-col>
					<b-col sm="12" md="6" class="form-group">
						<label>Telefono</label>
						<input
							type="tel"
							name="phone"
							class="form-control"
							:class="{ 'is-invalid': hasError('phone') }"
							required
							minlength="10"
							maxlength="15"
							v-model="form.phone"
						/>
						<div class="invalid-feedback" v-if="hasError('phone')">
							{{ getError("phone") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" md="12" class="form-group">
						<label>Correo electrónico</label>
						<input
							type="email"
							name="email"
							class="form-control"
							:class="{ 'is-invalid': hasError('email') }"
							required
							maxlength="100"
							v-model="form.email"
							:disabled="isEditMode"
						/>
						<div class="invalid-feedback" v-if="hasError('email')">
							{{ getError("email") }}
						</div>
					</b-col>
				</b-row>
			</form>
		</b-card-body>
		<template v-slot:footer>
			<b-button
				type="reset"
				size="md"
				variant="outline"
				@click="$router.go(-1)"
				class="mr-3"
				>Cancelar</b-button
			>
			<b-button
				type="submit"
				size="md"
				@click="sendForm"
				:class="{
					'btn-success': !isEditMode,
					'btn-info': isEditMode
				}"
				class="text-light"
				>{{ isEditMode ? "Actualizar" : "Guardar" }}</b-button
			>
		</template>
	</b-card>
</template>

<script>
import dataService from "../../services/data-service";
import FormMixin from "../shared/mixins/formMixin";

export default {
	mixins: [FormMixin],
	data() {
		return {
			form: {
				id: "",
				name: "",
				last_name: "",
				dni: "",
				email: "",
				phone: ""
			}
		};
	},
	methods: {
		update() {
			this.$store.commit("setLoader", true);
			dataService
				.update("users", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Usuario actualizado.", "success");
				})
				.catch(error => {
					this.vErrors = error.response.data.errors ?? [];
				})
				.finally(() => this.$store.commit("setLoader", false));
		},
		create() {
			this.$store.commit("setLoader", true);
			dataService
				.create("users", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast(
						"Usuario creado. Se ha enviado un correo de notificación.",
						"success"
					);
				})
				.catch(error => {
					this.vErrors = error.response.data.errors ?? [];
				})
				.finally(() => this.$store.commit("setLoader", false));
		}
	},
	created() {
		if (this.isEditMode) {
			this.$store.commit("setLoader", true);
			dataService
				.getOne("users", this.$route.params.id)
				.then(data => {
					this.form.id = data.id;
					this.form.name = data.name;
					this.form.last_name = data.last_name;
					this.form.dni = data.dni;
					this.form.email = data.email;
					this.form.phone = data.phone;
				})
				.catch(() => {
					this.$router.go(-1);
				})
				.finally(() => this.$store.commit("setLoader", false));
		}
	}
};
</script>

<style lang="scss" scoped>
.card {
	margin: auto;
	max-width: 30rem;
	min-width: 30rem;
	.card-footer {
		text-align: end;
	}
}
</style>