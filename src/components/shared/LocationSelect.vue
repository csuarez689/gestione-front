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
			this.$http
				.get("provinces")
				.then(res => {
					this.provinces = res.data;
				})
				.catch(error => console.log(error));
		},
		getDepartments() {
			this.$http
				.get(`provinces/${this.value.province_id}/departments`)
				.then(res => (this.departments = res.data))
				.catch(error => console.log(error));
		},
		getLocalities() {
			this.$http
				.get(`departments/${this.value.department_id}/localities`)
				.then(res => (this.localities = res.data))
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
