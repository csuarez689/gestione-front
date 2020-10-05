<template>
	<b-row>
		<b-col sm="12" md="4" class="form-group">
			<label>Provincia</label>
			<select
				required
				class="form-control"
				v-model="value.province_id"
				@change="resetSelects()"
			>
				<option value hidden></option>
				<option
					v-for="province in provinces"
					:key="province.id"
					:value="province.id"
					>{{ province.name }}</option
				>
			</select>
		</b-col>
		<b-col sm="12" md="4" class="form-group">
			<label>Departamento</label>
			<select
				required
				class="form-control"
				v-model="value.department_id"
				:disabled="!value.province_id"
			>
				<option hidden></option>
				<option
					v-for="department in departments"
					:key="department.id"
					:value="department.id"
					>{{ department.name }}</option
				>
			</select>
		</b-col>
		<b-col sm="12" md="4" class="form-group">
			<label>Localidad</label>
			<select
				required
				class="form-control"
				v-model="value.locality_id"
				:disabled="!value.department_id"
				@change="$emit('input', value)"
			>
				<option hidden></option>
				<option
					v-for="locality in localities"
					:key="locality.id"
					:value="locality.id"
					>{{ locality.name }}</option
				>
			</select>
		</b-col>
	</b-row>
</template>
<script>
import dataService from "../../services/data-service";
export default {
	props: ["value"],
	data() {
		return {
			provinces: [],
			departments: [],
			localities: []
		};
	},
	methods: {
		resetSelects() {
			this.$emit("input", {
				province_id: this.value.province_id,
				department_id: "",
				locality_id: ""
			});
		},
		getProvinces() {
			dataService
				.getAll("provinces")
				.then(data => {
					this.provinces = data;
				})
				.catch(error => console.log(error));
		},
		getDepartments() {
			dataService
				.getAll(`provinces/${this.value.province_id}/departments`)
				.then(data => (this.departments = data))
				.catch(error => console.log(error));
		},
		getLocalities() {
			dataService
				.getAll(`departments/${this.value.department_id}/localities`)
				.then(data => (this.localities = data))
				.catch(error => console.log(error));
		}
	},
	watch: {
		"value.province_id"() {
			this.getDepartments();
		},
		"value.department_id"(value) {
			if (value) this.getLocalities();
		}
	},
	created() {
		this.getProvinces();
	}
};
</script>
