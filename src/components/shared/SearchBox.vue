<template>
	<div>
		<b-row align-h="center" class="my-4">
			<b-col md="6" text-center>
				<b-input-group>
					<b-form-input
						v-model="search"
						type="search"
						ref="searchInput"
						@keypress.enter="onSearch()"
						@blur="onSearch()"
						placeholder="Buscar..."
					></b-form-input>
					<template v-slot:append>
						<b-button variant="success" @click="onSearch()">
							<i class="material-icons">search</i>
						</b-button>
					</template>
				</b-input-group>
			</b-col>
		</b-row>
	</div>
</template>
<script>
export default {
	data() {
		return { search: "" };
	},
	methods: {
		onSearch() {
			this.$emit("on-search", { search: this.search });
		}
	}
};
</script>
<style lang="scss" scoped>
i {
	float: left;
	font-size: 21px;
}
</style>