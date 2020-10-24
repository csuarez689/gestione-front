<template>
	<div>
		<b-row class="mt-4 mb-4"
			><h5 class="m-auto">Cantidad de Escuelas</h5></b-row
		>
		<b-row class="mb-5" align-h="center">
			<b-col sm="3">
				<select
					class="form-control"
					v-model="sector_id"
					@change="getReport"
				>
					<option value selected>Sector</option>
					<option
						v-for="sector in sectors"
						:key="sector.id"
						:value="sector.id"
						>{{ sector.name }}</option
					>
				</select>
			</b-col>
			<b-col sm="3">
				<select
					class="form-control"
					v-model="type_id"
					@change="getReport"
				>
					<option value selected>Tipo</option>
					<option
						v-for="type in types"
						:key="type.id"
						:value="type.id"
						>{{ type.name }}</option
					>
				</select>
			</b-col>
			<b-col sm="3">
				<select
					class="form-control"
					v-model="level_id"
					@change="getReport"
				>
					<option value selected>Nivel</option>
					<option
						v-for="level in levels"
						:key="level.id"
						:value="level.id"
						>{{ level.name }}</option
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
						{{ item.total }}
						{{ "escuela" | pluralize(item.total) }}.
					</h6></b-card-title
				>
				<b-card
					v-for="(item, index) in item.departments"
					:key="index"
					class="mt-4"
				>
					<b-card-title>
						<h6>
							<b>Departamento de {{ item.department }}:</b>
							{{ item.total }}
							{{ "escuela" | pluralize(item.total) }}.
						</h6></b-card-title
					>
					<hr />
					<p
						v-for="item in item.localities"
						:key="item.locality"
						class="ml-5 mb-0"
					>
						<b>{{ item.locality }}: </b> {{ item.total }}
						{{ "escuela" | pluralize(item.total) }}.
					</p>
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
			type_id: "",
			sector_id: "",
			level_id: "",
			types: [],
			sectors: [],
			levels: []
		};
	},
	methods: {
		getReport() {
			this.$store.commit("setLoader", true);
			return dataService
				.getAll(
					`reports/schoolsCount?level_id=${this.level_id}&sector_id=${this.sector_id}&type_id=${this.type_id}`
				)
				.then(data => {
					this.report = data;
				})
				.finally(() => this.$store.commit("setLoader", false));
		},
		getFiltersValues() {
			return dataService
				.getAll("formData?include=sectors,types,levels")
				.then(data => {
					this.levels = data.levels;
					this.sectors = data.sectors;
					this.types = data.types;
					return Promise.resolve();
				});
		}
	},
	created() {
		this.getFiltersValues().then(() => this.getReport());
	}
};
</script>
<style lang="scss" scoped>
.main-card {
	margin: auto;
	max-width: 40rem;
	min-width: 40rem;
	.card {
		margin: auto;
		width: 35rem;
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