<template>
	<b-card class="mt-5">
		<template v-slot:header>
			<h5 class="my-1">
				Perfil
			</h5>
		</template>
		<b-card-body>
			<form ref="form" @submit.prevent="sendForm">
				<b-row>
					<b-col sm="12" md="6" class="form-group">
						<label>Apellido</label>
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': hasError('last_name') }"
							required
							maxlength="100"
							minlength="3"
							v-model="form.last_name"
						/>
						<div
							class="invalid-feedback"
							v-if="hasError('last_name')"
						>
							{{ getError("last_name") }}
						</div>
					</b-col>
					<b-col sm="12" md="6" class="form-group">
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
					</b-col>
				</b-row>
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
					<b-col sm="12" class="form-group">
						<label>Correo electronico</label>

						<b-form-input
							maxlength="100"
							minlength="10"
							v-model="form.email"
							required
							type="email"
							disabled
						></b-form-input>
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
				class="text-light"
				variant="info"
				>Actualizar</b-button
			>
		</template>
	</b-card>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: "",
				last_name: "",
				dni: "",
				phone: ""
			},
			vErrors: []
		};
	},
	methods: {
		hasError(key) {
			return this.vErrors[key] ? true : false;
		},
		getError(key) {
			return this.vErrors[key][0];
		},
		sendForm() {
			if (this.$refs.form.checkValidity()) this.updateProfile();
			else this.$refs.form.reportValidity();
		},
		updateProfile() {
			this.$store.commit("setLoader", true);
			this.$store
				.dispatch("auth/updateProfile", this.form)
				.then(() => {
					this.$root.createToast("Datos actualizados.", "success");
					this.$router.push(this.$store.getters["auth/redirectUrl"]);
				})
				.catch(error => {
					this.vErrors = error.errors;
				})
				.finally(() => this.$store.commit("setLoader", false));
		}
	},
	created() {
		this.$store.commit("setLoader", true);
		this.$store
			.dispatch("auth/profile")
			.then(data => {
				this.form = data;
			})
			.finally(() => this.$store.commit("setLoader", false));
	}
};
</script>

<style lang="scss" scoped>
.card {
	margin: auto;
	max-width: 35rem;
	min-width: 35rem;
	.card-footer {
		text-align: end;
	}
}
</style>