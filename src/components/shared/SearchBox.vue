<template>
	<div>
		<b-row align-h="center" class="my-4">
			<b-col md="6" text-center>
				<b-input-group>
					<b-form-input
						v-model="text"
						type="search"
						ref="searchInput"
						@keypress.enter="onSearch()"
						@blur="onSearch()"
						placeholder="Buscar..."
					></b-form-input>
					<b-input-group-append>
						<b-button variant="success" @click="onSearch()">
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
		return { text: "" };
	},
	methods: {
		onSearch() {
			this.$emit("on-search", this.text);
		}
	}
};
</script>
