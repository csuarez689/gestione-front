<template>
	<div>
		<b-row class="mt-4 mb-4"
			><h5 class="m-auto">Inscripciones Orden de Merito</h5></b-row
		>
		<b-row class="mb-5" align-h="center">
			<b-col sm="3">
				<select
					class="form-control"
					v-model="year"
					@change="getReport"
				>
					<option value selected>Año</option>
					<option
						v-for="year in years"
						:key="year.year"
						:value="year.year"
						>{{ year.year }}</option
					>
				</select>
			</b-col>
		</b-row>
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
					<b-col sm="4"><b>Personas:</b> {{ item.persons }}</b-col>
					<b-col sm="4"
						><b>Inscripciones:</b> {{ item.inscriptions }}</b-col
					>
					<b-col sm="4">
						<b>Promedio Inscripciones por persona:</b>
						{{ item.avg_inscriptions_per_person }}%
					</b-col>
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
						<b-col sm="4"
							><b>Personas:</b> {{ item.persons }}</b-col
						>
						<b-col sm="4"
							><b>Inscripciones:</b>
							{{ item.inscriptions }}</b-col
						>
						<b-col sm="4">
							<b>Promedio Inscripciones por persona:</b>
							{{ item.avg_inscriptions_per_person }}%
						</b-col>
					</b-card-text>
					<hr class="mb-5" />
					<b-row
						v-for="item in item.localities"
						:key="item.locality"
						class="mb-3"
					>
						<b-col sm="3"
							><b>Localidad:</b> {{ item.locality_name }}</b-col
						>
						<b-col sm="3"
							><b>Personas:</b> {{ item.persons }}</b-col
						>
						<b-col sm="3"
							><b>Inscripciones:</b>
							{{ item.inscriptions }}</b-col
						>
						<b-col sm="3"
							><b>Promedio Inscripciones por persona:</b
							>{{ item.avg_inscriptions_per_person }}%</b-col
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
			report: "",
			year: "",
			years: []
		};
	},
	methods: {
		getReport() {
			this.$store.commit("setLoader", true);
			return dataService
				.getAll(`reports/omInscriptions?year=${this.year}`)
				.then(data => {
					this.report = data;
					return Promise.resolve();
				})
				.finally(() => this.$store.commit("setLoader", false));
		},
		getFiltersValues() {
			return dataService
				.getAll("formData?include=om_years")
				.then(data => {
					this.years = data.om_years;
					return Promise.resolve();
				});
		}
	},
	created() {
		Promise.all([this.getFiltersValues(), this.getReport()]);
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