<template>
	<b-card class="mt-5">
		<template v-slot:header>
			<h5 class="my-1">{{isEditMode ? 'Editar Usuario' : 'Nuevo Usuario'}}</h5>
		</template>
		<b-card-body>
			<form ref="form">
				<div class="form-group">
					<label>Apellido</label>
					<input
						type="text"
						name="last_name"
						class="form-control"
						:class="{'is-invalid': hasError('last_name')}"
						required
						maxlength="100"
						minlength="3"
						v-model="form.last_name"
					/>
					<div class="invalid-feedback" v-if="hasError('last_name')">{{ getError('last_name') }}</div>
				</div>
				<div class="form-group">
					<label>Nombre</label>
					<input
						type="text"
						name="name"
						class="form-control"
						:class="{'is-invalid': hasError('name')}"
						required
						maxlength="100"
						minlength="3"
						v-model="form.name"
					/>
					<div class="invalid-feedback" v-if="hasError('name')">{{ getError('name') }}</div>
				</div>
				<b-row>
					<b-col sm="12" md="6" class="form-group">
						<label>DNI</label>
						<input
							type="text"
							name="dni"
							class="form-control"
							:class="{'is-invalid': hasError('dni')}"
							required
							minlength="8"
							maxlength="8"
							v-model="form.dni"
						/>
						<div class="invalid-feedback" v-if="hasError('dni')">{{ getError('dni') }}</div>
					</b-col>
					<b-col sm="12" md="6" class="form-group">
						<label>Telefono</label>
						<input
							type="tel"
							name="phone"
							class="form-control"
							:class="{'is-invalid': hasError('phone')}"
							required
							minlength="10"
							maxlength="15"
							v-model="form.phone"
						/>
						<div class="invalid-feedback" v-if="hasError('phone')">{{ getError('phone') }}</div>
					</b-col>
				</b-row>
				<div class="form-group">
					<label>Correo electrónico</label>
					<input
						type="email"
						name="email"
						class="form-control"
						:class="{'is-invalid': hasError('email')}"
						required
						maxlength="100"
						v-model="form.email"
						:disabled="isEditMode"
					/>
					<div class="invalid-feedback" v-if="hasError('email')">{{ getError('email') }}</div>
				</div>
			</form>
		</b-card-body>
		<template v-slot:footer>
			<b-button type="reset" size="md" variant="outline" @click="$router.go(-1)" class="mr-3">Cancelar</b-button>
			<b-button
				type="submit"
				size="md"
				@click="sendForm"
				:class="{'btn-success': !isEditMode, 'btn-info': isEditMode}"
				class="text-light"
			>{{isEditMode ? 'Actualizar': 'Guardar'}}</b-button>
		</template>
	</b-card>
</template>

<style lang="scss" scoped>
.card {
	margin: auto;
	max-width: 40rem;
	min-width: 20rem;
}
</style>

<script>
import FormMixin from "../shared/mixins/formMixin";

export default {
	mixins: [FormMixin],
	data() {
		return {
			form: {
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
			this.$http

				.put(`users/${this.$route.params.id}`, this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createSuccessToast("Usuario actualizado.");
				})
				.catch(error => {
					console.log(error.response);
					this.vErrors = error.response.data.errors ?? [];
				});
		},
		create() {
			this.$http
				.post("users", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createSuccessToast(
						"Usuario creado. Se ha enviado un correo de notificación."
					);
				})
				.catch(error => {
					console.log(error.response);
					this.vErrors = error.response.data.errors ?? [];
				});
		}
	},
	created() {
		if (this.isEditMode) {
			this.$http
				.get(`users/${this.$route.params.id}`)
				.then(res => {
					this.form.name = res.data.name;
					this.form.last_name = res.data.last_name;
					this.form.dni = res.data.dni;
					this.form.email = res.data.email;
					this.form.phone = res.data.phone;
				})
				.catch(error => {
					this.$route.go(-1);
					console.log(error);
				});
		}
	}
};
</script>
