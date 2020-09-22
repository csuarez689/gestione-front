<template>
	<div>
		<!-- Search box -->
		<search-box @on-search="search=$event"></search-box>

		<!-- Table -->
		<div class="table-wrapper mb-4">
			<div class="table-title">
				<div class="row">
					<div class="col-sm-6">
						<h2>
							<b>Usuarios</b>
						</h2>
					</div>
					<div class="col-sm-6">
						<router-link :to="{name:'NewUser'}" class="btn btn-success">
							<i class="material-icons">&#xE147;</i>
							<span>Nuevo Usuario</span>
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
				@filtered="pagination.current_page = 1"
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
								<b>Telefono:</b>
								<span class="ml-1">{{ row.item.phone }}</span>
							</b-col>
							<b-col>
								<b>Última actualización:</b>
								<span class="ml-1">{{ row.item.updated_at }}</span>
							</b-col>
						</b-row>
						<b-row v-if="row.item.school" class="mt-2">
							<b-col>
								<b>Escuela:</b>
								<span class="ml-1">{{ row.item.school.name }}</span>
							</b-col>
							<b-col>
								<b>CUE Escuela:</b>
								<span class="ml-1">{{ row.item.school.cue }}</span>
							</b-col>
						</b-row>
						<b-row v-else class="mt-2">
							<b-col>
								<b>Escuela:</b>
								<span class="ml-1">Sin asignar</span>
							</b-col>
						</b-row>
					</b-card>
				</template>

				<!-- Estado -->
				<template v-slot:cell(estado)="row">{{row.item.school ? 'Activo' : 'Inactivo'}}</template>

				<!-- Custom actions -->
				<template v-slot:cell(acciones)="row">
					<a class="view" href @click.prevent="row.toggleDetails">
						<i class="material-icons" title="Ver">visibility</i>
					</a>
					<router-link :to="{name:'EditUser', params:{id:row.item.id}}" class="edit">
						<i class="material-icons" href title="Editar">create</i>
					</router-link>
					<a class="delete" href @click.prevent="$refs.deleteModal.showModal(row.item)">
						<i class="material-icons" title="Borrar">delete</i>
					</a>
				</template>

				<!-- No data for display -->
				<template v-slot:empty>
					<p class="font-italic text-center pt-3" style="font-size: medium">No hay usuarios registrados!</p>
				</template>

				<!-- Filter nothing for show -->
				<template v-slot:emptyfiltered>
					<p
						class="font-italic text-center pt-3"
						style="font-size: medium"
					>No se han encontrado resultados!</p>
				</template>
			</b-table>

			<!-- Pagination -->
			<b-pagination
				align="right"
				v-if="pagination.last_page > 1"
				v-model="pagination.current_page"
				:total-rows="pagination.total"
				:per-page="pagination.per_page"
				size="md"
				class="my-0"
			></b-pagination>
		</div>
		<delete-modal modelName="usuario" ref="deleteModal" @on-deleted="$refs.table.refresh()"></delete-modal>
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
				{ key: "dni", label: "DNI", sortable: true },
				{ key: "email", label: "Correo Electrónico", sortable: true },
				"estado",
				"acciones"
			],
			endpoint: "users"
		};
	}
};
</script>

