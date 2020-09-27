<template>
	<div class="login-form">
		<form @submit.prevent="sendForm" ref="form">
			<div class="avatar">
				<img src="../assets/img/avatar.png" alt="Avatar" />
			</div>
			<div class="form-group">
				<input
					type="email"
					class="form-control input-lg"
					placeholder="Correo electronico"
					required
					maxlength="100"
					v-model="form.email"
				/>
			</div>
			<div class="form-group">
				<input
					type="password"
					class="form-control input-lg"
					placeholder="Contraseña"
					required
					minlength="6"
					maxlength="100"
					v-model="form.password"
				/>
			</div>
			<div class="form-group">
				<button
					type="submit"
					class="btn btn-primary btn-lg btn-block login-btn"
				>
					Ingresar
				</button>
			</div>
			<div class="form-footer">
				<a href>¿Olvidaste tu contraseña?</a>
			</div>
		</form>
		<b-alert :show="message.length > 0" dismissible variant="danger">{{
			message
		}}</b-alert>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				email: "",
				password: ""
			},
			message: ""
		};
	},
	methods: {
		login() {
			this.$http
				.post("auth/login", this.form)
				.then(res => {
					this.$root.user = res.data.user;
					this.$root.token = res.data.access_token;
					this.$router.push("/users");
				})
				.catch(error => {
					this.message =
						error.response.status == 401
							? "Credenciales invalidas."
							: "Ha ocurrido un error.";
					this.form.password = "";
				});
		},
		sendForm() {
			if (this.$refs.form.checkValidity()) this.login();
			else this.$refs.form.reportValidity();
		}
	}
};
</script>

<style lang="scss" scoped>
body {
	color: #4e4e4e !important;
	background: #e2e2e2;
	font-family: "Roboto", sans-serif !important;
}
.form-control {
	font-size: 16px;
	background: #f2f2f2;
	box-shadow: none !important;
	border-color: transparent;
}
.form-control:focus {
	border-color: #d3d3d3;
}
.form-control,
.btn {
	border-radius: 2px;
}
.login-form {
	width: 380px;
	margin: 0 auto;
	font-size: 15px;
}
.login-form h2 {
	margin: 0;
	padding: 30px 0;
	font-size: 34px;
}
.login-form .avatar {
	margin: 0 auto 30px;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	z-index: 9;
	background: #3e699c;
	padding: 15px;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
}
.login-form .avatar img {
	width: 100%;
}
.login-form form {
	color: #7a7a7a;
	border-radius: 4px;
	margin-bottom: 15px;
	background: #fff;
	box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
	padding: 30px;
}
.login-form .btn,
.login-form .btn:active {
	font-weight: bold;
	background: #3e699c !important;
	border: none;
	margin-bottom: 20px;
}
.login-form .btn:hover,
.login-form .btn:focus {
	background: #435d7d !important;
}
.login-form a {
	color: #435d7d;
}
.login-form form a {
	color: #435d7d;
}
.login-form a:hover,
.login-form form a:hover {
	text-decoration: underline;
}
.hint-text {
	color: #999;
	text-align: center;
}
.form-footer {
	padding-bottom: 15px;
	text-align: center;
}
</style>
