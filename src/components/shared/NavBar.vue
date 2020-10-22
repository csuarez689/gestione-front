<template>
	<div>
		<b-navbar toggleable="md" type="dark">
			<b-navbar-brand class="mr-5">GestionE</b-navbar-brand>

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
						to="/ordenesMerito"
						active-class="item-active"
						class="nav-item-link"
						>Ordenes de Merito
					</b-nav-item>
					<b-nav-item-dropdown
						text="Informes"
						:class="{ 'item-active': activeDropdown }"
					>
						<b-dropdown-item to="/reports/schoolsCount"
							>Canitdad de Escuelas</b-dropdown-item
						>
						<b-dropdown-item to="/reports/teachingPlantCharges"
							>Cargos Planta Docente</b-dropdown-item
						>
						<b-dropdown-item to="/reports/omInscriptions"
							>Inscripciones Orden de Merito</b-dropdown-item
						>
					</b-nav-item-dropdown>
				</b-navbar-nav>

				<b-navbar-nav v-else>
					<b-nav-item
						to="/teachingPlant"
						active-class="item-active"
						class="nav-item-link"
					>
						Planta Docente
					</b-nav-item>
					<b-nav-item
						to="/teachers"
						active-class="item-active"
						class="nav-item-link"
					>
						Docentes
					</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template v-slot:button-content>
							<em class="pr-2">{{ userFullName }}</em>
						</template>
						<b-dropdown-item
							v-if="$store.state.auth.user.school_id"
							to="/me/school"
							>Mi Escuela</b-dropdown-item
						>
						<b-dropdown-item to="/me">Mis datos</b-dropdown-item>
						<b-dropdown-item to="/me/changePassword"
							>Cambiar contraseña</b-dropdown-item
						>

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
			this.$store.commit("auth/logout");
			this.$router.push("/login");
		}
	},
	computed: {
		...mapGetters("auth", ["userFullName"]),
		activeDropdown() {
			return this.$route.path.includes("reports");
		}
	}
};
</script>
<style lang="scss">
$defbackgrnd: #365070;
$activebg: #ffffff;
$colordefault: #ffffff;
$activecolor: #365070;
$bdrcolor: #ffffff;
$dropDown: true;
.navbar {
	background-color: $defbackgrnd;
	border-color: $bdrcolor;
	.navbar-brand {
		color: $colordefault;
	}
	.navbar-text {
		color: $colordefault;
	}
	.item-active {
		border-bottom: 3px solid rgba(255, 255, 255, 1);
		border-radius: 1px;
		border-spacing: 20px;
		color: whitesmoke !important;
	}
	.navbar-nav {
		> li {
			> a {
				color: $colordefault;
				&:hover,
				&:focus {
					color: $activecolor;
				}
			}
			@if $dropDown {
				> .dropdown-menu {
					background-color: $defbackgrnd;
					> li > a {
						color: $colordefault;
						&:hover,
						&:focus {
							color: $activecolor;
							background-color: $activebg;
						}
					}
					.divider {
						background-color: $activebg;
					}
				}
			}
		}
		> .active {
			> a,
			> a:hover,
			> a:focus {
				color: $activecolor;
				background-color: $activebg;
			}
		}
	}
	.navbar-toggle {
		border-color: $bdrcolor;
		&:hover,
		&:focus {
			background-color: $activebg;
		}
		.icon-bar {
			background-color: $colordefault;
		}
	}
	.navbar-collapse,
	.navbar-form {
		border-color: $colordefault;
	}
	.navbar-link {
		color: $colordefault;
		&:hover {
			color: $activecolor;
		}
	}
}
@media (max-width: 767px) {
	.navbar-default .navbar-nav .open .dropdown-menu {
		> li > a {
			color: $colordefault;
			&:hover,
			&:focus {
				color: $activecolor;
			}
		}
		> .active {
			> a,
			> a:hover,
			> a:focus {
				color: $activecolor;
				background-color: $activebg;
			}
		}
	}
}
</style>