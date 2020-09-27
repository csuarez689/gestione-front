<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="primary">
			<b-navbar-brand href="#">GestionE</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item to="/users"> Usuarios </b-nav-item>
					<b-nav-item to="/schools"> Escuelas </b-nav-item>
					<b-nav-item to="/teachers"> Docentes </b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template v-slot:button-content>
							<em class="pr-2">{{ userFullName }}</em>
						</template>
						<b-dropdown-item to="/profile">Perfil</b-dropdown-item>
						<b-dropdown-item @click="logOut">Salir</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>
<script>
export default {
	props: ["user"],
	methods: {
		logOut() {
			this.$http
				.post("/auth/logout")
				.then(() => {
					this.$root.user = "";
					this.$root.token = "";
					this.$router.push("/login");
				})
				.catch(error => console.log(error));
		}
	},
	computed: {
		userFullName() {
			return this.user.name + " " + this.user.last_name;
		}
	}
};
</script>
