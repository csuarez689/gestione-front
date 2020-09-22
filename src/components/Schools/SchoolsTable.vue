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
							<b>Escuelas</b>
						</h2>
					</div>
					<div class="col-sm-6">
						<router-link :to="{name:'NewSchool'}" class="btn btn-success">
							<i class="material-icons">&#xE147;</i>
							<span>Nueva Escuela</span>
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
				:busy.sync="isBusy"
				:items="getData"
				:fields="fields"
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
								<b>Localidad:</b>
								<span class="ml-1">{{ row.item.locality.name }}</span>
							</b-col>
							<b-col>
								<b>Dirección:</b>
								<span class="ml-1">{{ row.item.address }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col>
								<b>Director:</b>
								<span class="ml-1">{{ row.item.director }}</span>
							</b-col>
							<b-col>
								<b>Correo Electrónico:</b>
								<span class="ml-1">{{ row.item.email }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col>
								<b>Teléfono:</b>
								<span class="ml-1">{{ row.item.phone }}</span>
							</b-col>
							<b-col>
								<b>Teléfono Interno:</b>
								<span class="ml-1">{{ row.item.internal_phone }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col>
								<b>Sector:</b>
								<span class="ml-1">{{ row.item.sector.name }}</span>
							</b-col>
							<b-col>
								<b>Tipo:</b>
								<span class="ml-1">{{ row.item.type.name }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col>
								<b>Ámbito:</b>
								<span class="ml-1">{{ row.item.ambit.name }}</span>
							</b-col>
							<b-col>
								<b>Jornada:</b>
								<span class="ml-1">{{ row.item.journey_type.name }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col>
								<b>Categoría:</b>
								<span class="ml-1">{{ row.item.category.name }}</span>
							</b-col>
							<b-col>
								<b>Bilingue:</b>
								<span class="ml-1">{{ row.item.bilingual ? 'Si' : 'No' }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col v-if="row.item.high_school_type">
								<b>Tipo de Secundario:</b>
								<span class="ml-1">{{ row.item.high_school_type.name }}</span>
							</b-col>
							<b-col>
								<b>Orientación:</b>
								<span class="ml-1">{{ row.item.orientation }}</span>
							</b-col>
						</b-row>
						<b-row class="mt-2">
							<b-col>
								<b>Cantidad de alumnos:</b>
								<span class="ml-1">{{ row.item.number_students }}</span>
							</b-col>
						</b-row>
						<hr />
						<b>Encargado web:</b>
						<div v-if="row.item.user">
							<b-row class="mt-2">
								<b-col>
									<b>Nombre:</b>
									<span class="ml-1">{{ row.item.user.name+' '+row.item.user.last_name }}</span>
								</b-col>
								<b-col>
									<b>DNI:</b>
									<span class="ml-1">{{ row.item.user.dni }}</span>
								</b-col>
							</b-row>
							<b-row class="mt-2">
								<b-col>
									<b>Correo Electrónico:</b>
									<span class="ml-1">{{ row.item.user.email }}</span>
								</b-col>
								<b-col>
									<b>Teléfono:</b>
									<span class="ml-1">{{ row.item.user.phone }}</span>
								</b-col>
							</b-row>
						</div>
						<span v-else class="pl-2">Sin asignar</span>
					</b-card>
				</template>

				<!-- Estado -->
				<template v-slot:cell(estado)="row">{{row.item.user ? 'Activa' : 'Inactiva'}}</template>

				<!-- Custom actions -->
				<template v-slot:cell(acciones)="row">
					<a class="view" href @click.prevent="row.toggleDetails">
						<i class="material-icons" title="Ver">visibility</i>
					</a>
					<router-link :to="{name:'EditSchool', params:{id:row.item.id}}" class="edit">
						<i class="material-icons" title="Editar">create</i>
					</router-link>
					<a class="delete" href @click.prevent="$refs.deleteModal.showModal(row.item)">
						<i class="material-icons" title="Borrar">delete</i>
					</a>
				</template>

				<!-- No data for display -->
				<template v-slot:empty>
					<p class="font-italic text-center pt-3" style="font-size: medium">No hay registros de escuelas!</p>
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
		<!-- Delete Modal -->
		<delete-modal modelName="escuela" ref="deleteModal" @on-deleted="$refs.table.refresh()"></delete-modal>
	</div>
</template>
<script>
import apiTableMixin from "../shared/mixins/apiTableMixin";
import DeleteModal from "../shared/DeleteModal";
import SearchBox from "../shared/SearchBox";

export default {
	components: {
		DeleteModal,
		SearchBox
	},
	mixins: [apiTableMixin],
	data() {
		return {
			fields: [
				{ key: "name", label: "Nombre", sortable: true },
				{ key: "cue", label: "CUE", sortable: true },
				{ key: "level.name", label: "Nivel" },
				{ key: "locality.department.name", label: "Departamento" },
				"estado",
				"acciones"
			],
			endpoint: "schools"
		};
	}
};
</script>
