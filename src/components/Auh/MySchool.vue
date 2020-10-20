<template>
	<b-card class="mt-5">
		<template v-slot:header>
			<h5 class="my-1 text-center">
				Mi Escuela
			</h5>
		</template>
		<b-card-body v-if="school">
			<b-row>
				<b-col> <b>Nombre: </b> {{ school.name }} </b-col>
			</b-row>
			<b-row>
				<b-col> <b>Orientación: </b> {{ school.orientation }} </b-col>
			</b-row>
			<b-row>
				<b-col> <b>CUE: </b> {{ school.cue }} </b-col>
				<b-col>
					<b>Numero de Estudiantes: </b> {{ school.number_students }}
				</b-col>
			</b-row>
			<b-row>
				<b-col> <b>Correo Electronico: </b> {{ school.email }} </b-col>
			</b-row>
			<b-row>
				<b-col> <b>Director: </b> {{ school.director }} </b-col>
			</b-row>
			<b-row>
				<b-col>
					<b>Departamento: </b> {{ school.locality.department.name }}
				</b-col></b-row
			>
			<b-row>
				<b-col> <b>Localidad: </b> {{ school.locality.name }} </b-col>
			</b-row>
			<b-row>
				<b-col> <b>Dirección: </b> {{ school.address }} </b-col>
			</b-row>
			<b-row>
				<b-col> <b>Telefono: </b> {{ school.phone }} </b-col>
				<b-col>
					<b>Telefono interno: </b>
					{{ school.internal_phone }}
				</b-col>
			</b-row>
			<b-row>
				<b-col> <b>Ámbito: </b> {{ school.ambit.name }} </b-col>
				<b-col>
					<b>Categoria: </b>
					{{ school.category.name }}
				</b-col>
			</b-row>
			<b-row>
				<b-col> <b>Nivel: </b> {{ school.level.name }} </b-col>
				<b-col v-if="school.high_school_type">
					<b>Tipo de Secundario: </b>
					{{ school.high_school_type.name }}
				</b-col>
			</b-row>
			<b-row>
				<b-col> <b>Jornada: </b> {{ school.journey_type.name }} </b-col>
				<b-col>
					<b>Bilingue: </b> {{ school.bilingual ? "Si" : "No" }}
				</b-col>
			</b-row>
			<b-row>
				<b-col> <b>Sector: </b> {{ school.sector.name }} </b-col>
				<b-col> <b>Tipo: </b> {{ school.type.name }} </b-col>
			</b-row>
		</b-card-body>
	</b-card>
</template>

<script>
import dataService from "../../services/data-service";
export default {
	data() {
		return { school: "" };
	},
	created() {
		this.$store.commit("setLoader", true);
		dataService
			.getOne("schools", this.$store.state.auth.user.school_id)
			.then(data => {
				this.school = data;
			})
			.finally(() => this.$store.commit("setLoader", false));
	}
};
</script>

<style scoped lang="scss">
.card {
	margin: 0 auto;
	max-width: 40rem;
	min-width: 40rem;
	font-size: 1rem;
	.card-body {
		margin: 0 auto;
		padding-top: 10px;
		padding-top: 15px;

		.row {
			margin-top: 10px;
		}
	}
}
</style>