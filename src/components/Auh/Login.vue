<template>
	<b-row class="vh-100" align-v="center">
		<b-card class="m-auto login-form">
			<form @submit.prevent="sendForm" ref="form">
				<div class="avatar">
					<img src="../../assets/img/avatar.png" alt="Avatar" />
				</div>
				<div class="form-group">
					<b-form-input
						maxlength="100"
						minlength="10"
						v-model="form.email"
						placeholder="Correo electronico"
						required
						type="email"
						:class="{
							'is-invalid': Boolean(vErrors.email)
						}"
					></b-form-input>
					<div class="invalid-feedback" v-if="Boolean(vErrors.email)">
						{{ vErrors.email[0] }}
					</div>
				</div>
				<div class="form-group">
					<b-form-input
						type="password"
						placeholder="Contraseña"
						required
						minlength="6"
						maxlength="100"
						v-model="form.password"
						:class="{
							'is-invalid': Boolean(vErrors.password)
						}"
					/>
					<div
						class="invalid-feedback"
						v-if="Boolean(vErrors.password)"
					>
						{{ vErrors.password[0] }}
					</div>
				</div>
				<div class="form-group">
					<b-button
						type="submit"
						class="btn btn-lg btn-block login-btn"
					>
						Ingresar
					</b-button>
				</div>
				<div class="form-footer text-center">
					<router-link :to="{ name: 'ForgotPassword' }"
						>¿Olvidaste tu contraseña?</router-link
					>
				</div>
			</form>
		</b-card>
	</b-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			vErrors: [],
			form: {
				email: "",
				password: ""
			},
			loader: false
		};
	},
	computed: {
		...mapGetters("auth", ["redirectUrl"])
	},
	methods: {
		sendForm() {
			if (this.$refs.form.checkValidity()) this.login();
			else this.$refs.form.reportValidity();
		},
		login() {
			this.$store.commit("setLoader", true);
			this.$store
				.dispatch("auth/login", this.form)
				.then(() => {
					this.$router.push(this.redirectUrl);
				})
				.catch(error => {
					this.vErrors = error.errors ?? [];
					this.form.password = "";
					if (!this.vErrors.length)
						this.$root.createToast(
							"Credenciales invalidas",
							"danger"
						);
				})
				.finally(() => this.$store.commit("setLoader", false));
		}
	}
};
</script>

<style lang="scss" scoped>
.card {
	width: 30rem;
	border-radius: 8px;
	.avatar {
		margin: 0 auto 30px;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		z-index: 9;
		background: #3e699c;
		padding: 15px;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
		img {
			width: 100%;
		}
	}
	form {
		.btn {
			margin-top: 30px;
			background: #3e699c;
			color: whitesmoke;

			&:hover {
				background: #3e699c !important;
				border: none;
			}
		}
		a {
			color: #435d7d;
		}
	}
}
</style>
