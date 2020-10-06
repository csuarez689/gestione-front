<template>
	<div>
		<b-navbar toggleable="lg" type="dark">
			<b-navbar-brand href="#" class="mr-5">GestionE</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav v-if="$store.state.auth.user.isAdmin">
					<b-nav-item
						to="/users"
						active-class="item-active"
						class="nav-item-link"
					>
						Usuarios
					</b-nav-item>
					<b-nav-item
						to="/schools"
						active-class="item-active"
						class="nav-item-link"
					>
						Escuelas
					</b-nav-item>
					<b-nav-item
						to="/teachers"
						active-class="item-active"
						class="nav-item-link"
					>
						Docentes
					</b-nav-item>
					<b-nav-item
						to="/teachingPlant"
						active-class="item-active"
						class="nav-item-link"
					>
						Planta Docente
					</b-nav-item>
				</b-navbar-nav>
				<b-navbar-nav v-else>
					<b-nav-item
						to="/teachingPlant"
						active-class="item-active"
						class="nav-item-link"
					>
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
<style lang="scss">
.navbar {
	background: #365070;

	.navbar-brand {
		font-style: italic;
		opacity: 0.8;
		font-size: 1.6em;
		color: #9ca9b8 !important;
	}
	.nav-item-link {
		font-size: 1.1em;
	}
}
.item-active {
	color: white !important;
	font-weight: 500;
}
</style>