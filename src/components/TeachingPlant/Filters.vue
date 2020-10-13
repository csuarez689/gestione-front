<template>
	<div>
		<b-row align-h="center" class="my-4">
			<b-col xs="12" md="8" text-center class="m-0 p-0">
				<b-input-group>
					<b-form-input
						v-model="search"
						type="search"
						ref="searchInput"
						@keypress.enter="onFilter()"
						@blur="onFilter()"
						placeholder="Buscar..."
						class="search"
					></b-form-input>
					<b-form-select
						v-model="year"
						class="filter"
						@change="onFilter()"
					>
						<option value selected>Año</option>
						<option v-for="n in 9" :key="n" :value="n">{{
							n + " º"
						}}</option>
					</b-form-select>
					<b-form-select
						v-model="division"
						class="filter"
						@change="onFilter()"
					>
						<option value selected>División</option>
						<option
							v-for="n in ['A', 'B', 'C', 'D', 'E']"
							:key="n"
							:value="n"
							>{{ n }}</option
						>
					</b-form-select>

					<b-input-group-append>
						<b-button variant="success" @click="onFilter()">
							<i class="material-icons">search</i>
						</b-button>
					</b-input-group-append>
				</b-input-group>
			</b-col>
		</b-row>
	</div>
</template>
<script>
export default {
	data() {
		return { year: "", division: "", search: "" };
	},
	methods: {
		onFilter() {
			this.$emit("on-filter", {
				year: this.year,
				division: this.division,
				search: this.search
			});
		}
	}
};
</script>
<style lang="scss">
.search {
	width: 25vw !important;
}
</style>
