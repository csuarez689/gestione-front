<template>
	<b-card class="mt-5">
		<template v-slot:header>
			<h5 class="my-1">
				Cambiar contraseña
			</h5>
		</template>
		<b-card-body>
			<form ref="form" @submit.prevent="sendForm">
				<b-row>
					<b-col sm="12" class="form-group">
						<label>Contraseña actual</label>
						<input
							type="password"
							class="form-control"
							:class="{
								'is-invalid': hasError('current_password')
							}"
							required
							maxlength="100"
							minlength="6"
							v-model="form.current_password"
						/>
						<div
							class="invalid-feedback"
							v-if="hasError('current_password')"
						>
							{{ getError("current_password") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" md="12" class="form-group">
						<label>Nueva contraseña</label>
						<input
							type="password"
							class="form-control"
							:class="{ 'is-invalid': hasError('new_password') }"
							required
							maxlength="100"
							minlength="6"
							v-model="form.new_password"
						/>
						<div
							class="invalid-feedback"
							v-if="hasError('new_password')"
						>
							{{ getError("new_password") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" md="12" class="form-group">
						<label>Confirme contraseña</label>
						<input
							type="password"
							class="form-control"
							:class="{
								'is-invalid': hasError('new_password')
							}"
							required
							minlength="6"
							maxlength="100"
							v-model="form.new_password_confirmation"
						/>
						<div
							class="invalid-feedback"
							v-if="hasError('new_password')"
						>
							{{ getError("new_password") }}
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
				current_password: "",
				new_password: "",
				new_password_confirmation: ""
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
			if (this.$refs.form.checkValidity()) this.changePassword();
			else this.$refs.form.reportValidity();
		},
		changePassword() {
			this.$store.commit("setLoader", true);
			this.$store
				.dispatch("auth/changePassword", this.form)
				.then(() => {
					this.$router.push("/login");
				})
				.catch(error => {
					this.vErrors = error.errors ?? [];
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