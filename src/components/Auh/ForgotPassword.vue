<template>
	<b-row class="vh-100" align-v="center">
		<b-card class="m-auto login-form">
			<template v-slot:header>
				<h5 class="my-1">
					Ovide mi contraseña
				</h5>
			</template>
			<b-card-body>
				<form ref="form" @submit.prevent="sendForm">
					<b-row>
						<b-col sm="12" md="12" class="form-group">
							<label>Correo electrónico</label>
							<input
								type="email"
								class="form-control"
								:class="{ 'is-invalid': hasError('email') }"
								required
								maxlength="100"
								v-model="email"
							/>
							<div
								class="invalid-feedback"
								v-if="hasError('email')"
							>
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
					variant="success"
					class="text-light"
					>Enviar</b-button
				>
			</template>
		</b-card>
	</b-row>
</template>

<script>
import authService from "../../services/auth-service";
import FormMixin from "../shared/mixins/formMixin";

export default {
	mixins: [FormMixin],
	data() {
		return {
			email: "",
			error: ""
		};
	},
	methods: {
		create() {
			this.$store.commit("setLoader", true);
			authService
				.forgotPassword({ email: this.email })
				.then(() => {
					this.$router.go(-1);
				})
				.catch(error => {
					console.log(error.response);
					this.vErrors = error.response.data.errors ?? [];
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