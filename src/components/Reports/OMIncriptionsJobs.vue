<template>
	<div>
		<b-row class="mt-4 mb-5"
			><h5 class="m-auto">
				Cargos Frente Alumnos Segun Inscripciones Orden de Merito
			</h5></b-row
		>
		<b-row align-h="center">
			<b-card
				v-for="(item, index) in report"
				:key="index"
				class="main-card"
			>
				<b-card-title>
					<h6>
						<b>Provincia de {{ item.province }}: </b>
					</h6>
				</b-card-title>
				<b-card-text class="ml-4 row">
					<b-col sm="6"
						><b>Sin cargo frente a alumnos:</b>
						{{ item.without_charge }}</b-col
					>
					<b-col sm="6"
						><b>Con cargo frente a alumnos:</b>
						{{ item.total_persons - item.without_charge }}</b-col
					>
				</b-card-text>
				<b-card
					v-for="(item, index) in item.departments"
					:key="index"
					class="mt-4"
				>
					<b-card-title>
						<h6>
							<b>Departamento de {{ item.department }}:</b>
						</h6></b-card-title
					>
					<b-card-text class="ml-4 row">
						<b-col sm="6"
							><b>Sin cargo frente a alumnos:</b>
							{{ item.without_charge }}</b-col
						>
						<b-col sm="6"
							><b>Con cargo frente a alumnos:</b>
							{{
								item.total_persons - item.without_charge
							}}</b-col
						>
					</b-card-text>
					<hr class="mb-5" />
					<b-row
						v-for="item in item.localities"
						:key="item.locality"
						class="mb-3"
					>
						<b-col sm="4"
							><b>Localidad:</b> {{ item.locality }}</b-col
						>
						<b-col sm="4"
							><b>Sin cargo frente a alumnos:</b>
							{{ item.without_charge }}</b-col
						>
						<b-col sm="4"
							><b>Con cargo frente a alumnos:</b>
							{{
								item.total_persons - item.without_charge
							}}</b-col
						>
					</b-row>
				</b-card>
			</b-card>
			<b-card v-if="!report.length" class="no-results"
				>No se encontraron resultados!</b-card
			>
		</b-row>
	</div>
</template>
<script>
import dataService from "../../services/data-service";
export default {
	data() {
		return {
			report: ""
		};
	},
	methods: {
		getReport() {
			this.$store.commit("setLoader", true);
			return dataService
				.getAll(`reports/omInscriptionsJobs`)
				.then(data => {
					this.report = data;
				})
				.finally(() => this.$store.commit("setLoader", false));
		}
	},
	created() {
		this.getReport();
	}
};
</script>
<style lang="scss" scoped>
.main-card {
	margin: auto;
	max-width: 60rem;
	min-width: 60rem;
	.card {
		margin: auto;
		width: 55rem;
		background: #ebebeb;
	}
}

.no-results {
	min-width: 30rem;
	text-align: center;
	color: gray;
	font-size: 1.1rem;
	font-style: italic;
}
</style>