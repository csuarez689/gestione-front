<template>
	<b-modal
		size="sm"
		centered
		no-close-on-backdrop
		no-close-on-esc
		ref="modal"
	>
		<template v-slot:modal-header>
			<h5 class>Eliminar {{ modelName | capitalize }}</h5>
		</template>
		<template v-slot:default>
			<p class="text-center">
				¿Está seguro que desea borrar el registro?
			</p>
			<p class="text-danger text-center">
				<small>Los cambios son permanentes</small>
			</p>
		</template>
		<template v-slot:modal-footer="{ cancel }">
			<b-button size="md" variant="outline" @click="cancel()"
				>Cancelar</b-button
			>
			<b-button
				size="md"
				variant="danger"
				@click="deleteItem()"
				:disabled="loader"
			>
				<b-spinner small class="mb-1 mr-1" v-show="loader"></b-spinner>
				Eliminar
			</b-button>
		</template>
	</b-modal>
</template>
<script>
import dataService from "../../services/data-service";

export default {
	props: ["modelName"],

	data() {
		return {
			url: null,
			loader: false
		};
	},
	methods: {
		showModal(item) {
			this.url = item._links.self;
			if (this.url) this.$refs.modal.show();
		},
		deleteItem() {
			this.loader = true;
			dataService
				.delete(this.url)
				.then(() => {
					this.$root.createToast("Registro eliminado.", "success");
					this.$emit("on-deleted");
				})
				.catch()
				.finally(() => {
					this.$refs.modal.hide();
					this.loader = false;
				});
		}
	}
};
</script>

