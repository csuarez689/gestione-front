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
							<b>Ordenes de Merito Erroneas</b>
						</h2>
					</b-col>
					<div class="col-sm-6">
						<b-button variant="danger" @click="showDeleteAll()">
							<i class="material-icons">delete_forever</i>
							<span>Vaciar</span>
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
						<b-row class="mt-2">
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
						<b-row class="mt-2 mb-3">
							<b-col>
								<b>Fecha de carga:</b>
								<span class="ml-1">{{
									row.item.created_at
								}}</span>
							</b-col>
						</b-row>
						<b-row
							class="mt-2"
							v-for="(value, key, index) in row.item.errors"
							:key="index"
						>
							<b-col class="error">
								<b-alert show variant="danger">
									{{ value[0] }}</b-alert
								></b-col
							>
						</b-row>
					</b-card>
				</template>

				<!-- Custom actions -->
				<template v-slot:cell(acciones)="row">
					<a class="view" href @click.prevent="row.toggleDetails">
						<i class="material-icons" title="Ver">visibility</i>
					</a>
					<router-link
						:to="{
							name: 'RepairOrdenMerito',
							params: { id: row.item.id }
						}"
						class="edit"
					>
						<i class="material-icons" href title="Editar">create</i>
					</router-link>
					<a
						class="delete"
						href
						@click.prevent="
							$refs.deleteModal.showModal(endpoint, row.item.id)
						"
					>
						<i class="material-icons" title="Borrar">delete</i>
					</a>
				</template>

				<!-- No data for display -->
				<template v-slot:empty>
					<p
						class="font-italic text-center pt-3"
						style="font-size: medium"
					>
						No hay ordenes erroneas!
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

		<delete-modal
			modelName=""
			ref="deleteModal"
			@on-deleted="$refs.table.refresh()"
		></delete-modal>
	</div>
</template>
<script>
import dataService from "../../services/data-service";
import apiTableMixin from "../shared/mixins/apiTableMixin";
import SearchBox from "../shared/SearchBox";
import DeleteModal from "../shared/DeleteModal";

export default {
	components: {
		SearchBox,
		DeleteModal
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
				{ key: "year", label: "Año", sortable: true },
				"acciones"
			],
			endpoint: "failedOrdenesMerito"
		};
	},
	methods: {
		showDeleteAll() {
			const msgVNode = this.$createElement("div", {
				domProps: {
					innerHTML:
						"<p class='text-center'>¿Está seguro que desea realizar esta acción?</p><p class='text-danger text-center'><small>Se eliminaran todos los registros erroneos. Los cambios son permanentes</small></p>"
				}
			});
			this.$bvModal
				.msgBoxConfirm([msgVNode], {
					title: "Vaciar registros",
					hideHeaderClose: true,
					size: "sm",
					buttonSize: "md",
					okVariant: "danger",
					okTitle: "Aceptar",
					cancelTitle: "Cancelar",
					cancelVariant: "outlined",
					footerClass: "p-2",
					centered: true
				})
				.then(value => {
					if (value) {
						return dataService
							.delete("failedOrdenesMerito", false)
							.then(() => {
								this.$refs.table.refresh();
							});
					}
				});
		}
	}
};
</script>

