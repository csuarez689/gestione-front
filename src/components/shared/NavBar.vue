<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="primary">
			<b-navbar-brand href="#">GestionE</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav v-if="$store.state.auth.user.isAdmin">
					<b-nav-item to="/users"> Usuarios </b-nav-item>
					<b-nav-item to="/schools"> Escuelas </b-nav-item>
					<b-nav-item to="/teachers"> Docentes </b-nav-item>
				</b-navbar-nav>
				<b-navbar-nav v-else>
					<b-nav-item to="/teachingPlant">
						Planta Docente
					</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template v-slot:button-content>
							<em class="pr-2">{{ userFullName }}</em>
						</template>
						<b-dropdown-item to="/profile">Perfil</b-dropdown-item>
						<b-dropdown-item @click="logout">Salir</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	methods: {
		logout() {
			this.$store
				.dispatch("auth/logout")
				.then(res => {
					this.$router.push("/login");
					this.$root.createToast(res, "success");
				})
				.catch(error => {
					this.$root.createToast(error, "danger");
				});
		}
	},
	computed: {
		...mapGetters("auth", ["userFullName"])
	}
	// created(){
	// 	this.$store.state.auth.
	// }
};
</script>
