<template>
	<div>
		<!-- Search box -->
		<search-box @on-search="search = $event"></search-box>

		<!-- Table -->
		<div class="table-wrapper mb-4">
			<div class="table-title">
				<b-row>
					<b-col sm="6">
						<h2>
							<b>Ordenes de Merito</b>
						</h2>
					</b-col>
					<div class="col-sm-6">
						<b-button
							class="btn btn-success"
							@click="$refs.uploadModal.show()"
						>
							<i class="material-icons">publish</i>
							<span>Nueva Carga</span>
						</b-button>
						<b-button
							class="btn btn-danger"
							:to="{ name: 'OrdenesFails' }"
						>
							<i class="material-icons">error</i>
							<span>Ordenes erroneas</span>
						</b-button>
					</div>
				</b-row>
			</div>
			<b-table
				ref="table"
				responsive
				striped
				hover
				show-empty
				no-sort-reset
				sort-icon-left
				:items="getData"
				:fields="fields"
				:busy.sync="isBusy"
				:current-page="pagination.current_page"
				:per-page="pagination.per_page"
				:filter="search"
				@sort-changed="pagination.current_page = 1"
				@row-clicked="
					item => $set(item, '_showDetails', !item._showDetails)
				"
			>
				<!-- Table spinner -->
				<template v-slot:table-busy>
					<div class="text-center my-2 loader">
						<b-spinner class="align-middle"></b-spinner>
					</div>
				</template>

				<!-- Details columns -->
				<template v-slot:row-details="row">
					<b-card class="mb-4">
						<b-row>
							<b-col>
								<b>Localidad:</b>
								<span class="ml-1">{{
									row.item.locality
								}}</span>
							</b-col>
							<b-col>
								<b>Región:</b>
								<span class="ml-1">{{ row.item.region }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col>
								<b>Genero:</b>
								<span class="ml-1">{{ row.item.gender }}</span>
							</b-col>
							<b-col>
								<b>Cargo:</b>
								<span class="ml-1">{{ row.item.charge }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col>
								<b>Título Principal:</b>
								<span class="ml-1">{{ row.item.title1 }}</span>
							</b-col>
							<b-col v-if="row.item.title2">
								<b>Título Secundario:</b>
								<span class="ml-1">{{ row.item.title2 }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col>
								<b>Fecha de carga:</b>
								<span class="ml-1">{{
									row.item.created_at
								}}</span>
							</b-col>
						</b-row>
					</b-card>
				</template>

				<!-- No data for display -->
				<template v-slot:empty>
					<p
						class="font-italic text-center pt-3"
						style="font-size: medium"
					>
						No hay ordenes de merito cargadas!
					</p>
				</template>

				<!-- Filter nothing for show -->
				<template v-slot:emptyfiltered>
					<p
						class="font-italic text-center pt-3"
						style="font-size: medium"
					>
						No se han encontrado resultados!
					</p>
				</template>
			</b-table>

			<!-- Pagination -->
			<b-pagination
				align="right"
				v-if="pagination.last_page > 1 && !isBusy"
				v-model="pagination.current_page"
				:total-rows="pagination.total"
				:per-page="pagination.per_page"
				size="md"
				class="my-0"
			></b-pagination>
		</div>
		<upload-modal
			ref="uploadModal"
			@on-done="$refs.table.refresh()"
		></upload-modal>
	</div>
</template>
<script>
import apiTableMixin from "../shared/mixins/apiTableMixin";
import SearchBox from "../shared/SearchBox";
import UploadModal from "./UploadModal";
export default {
	components: {
		UploadModal,
		SearchBox
	},
	mixins: [apiTableMixin],
	data() {
		return {
			fields: [
				{ key: "name", label: "Nombre", sortable: true },
				{ key: "last_name", label: "Apellido", sortable: true },
				{ key: "cuil", label: "CUIL/CUIT", sortable: true },
				{ key: "level", label: "Nivel", sortable: true },
				{ key: "incumbency", label: "Incumbencia", sortable: true },
				{ key: "year", label: "Año", sortable: true }
			],
			endpoint: "ordenesMerito"
		};
	}
};
</script>
<style lang="scss">
.btn-group-header {
	float: left;
}
</style>

