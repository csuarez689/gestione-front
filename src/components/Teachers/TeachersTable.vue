<template>
	<div>
		<!-- Search box -->
		<search-box @on-search="search = $event"></search-box>

		<!-- Table -->
		<div class="table-wrapper mb-4">
			<div class="table-title">
				<div class="row">
					<div class="col-sm-6">
						<h2>
							<b>Docentes</b>
						</h2>
					</div>
					<div class="col-sm-6">
						<router-link
							:to="{ name: 'NewTeacher' }"
							class="btn btn-success"
						>
							<i class="material-icons">&#xE147;</i>
							<span>Nuevo Docente</span>
						</router-link>
					</div>
				</div>
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
						<b-row>
							<b-col>
								<b>Localidad:</b>
								<span class="ml-1">{{
									row.item.locality.name
								}}</span>
							</b-col>
							<b-col>
								<b>Departamento:</b>
								<span class="ml-1">{{
									row.item.locality.department.name
								}}</span>
							</b-col>
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
							name: 'EditTeacher',
							params: { id: row.item.id }
						}"
						class="edit"
					>
						<i class="material-icons" href title="Editar">create</i>
					</router-link>
					<a
						class="delete"
						href
						@click.prevent="$refs.deleteModal.showModal(row.item)"
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
						No hay docentes registrados!
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
			modelName="docente"
			ref="deleteModal"
			@on-deleted="$refs.table.refresh()"
		></delete-modal>
	</div>
</template>
<script>
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
				{ key: "cuil", label: "CUIT/CUIL", sortable: true },
				{ key: "gender", label: "Sexo", sortable: true },
				{
					key: "updated_at",
					label: "Última Actualización",
					sortable: true
				},
				"acciones"
			],
			endpoint: "teachers"
		};
	}
};
</script>

