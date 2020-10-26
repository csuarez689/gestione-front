<template>
	<div>
		<div
			v-if="
				$store.state.auth.loggedIn && $store.state.auth.user.school_id
			"
		>
			<!-- Search box -->

			<teaching-plant-filter
				@on-filter="search = $event"
			></teaching-plant-filter>

			<!-- Table -->
			<div class="table-wrapper mb-4">
				<div class="table-title">
					<div class="row">
						<div class="col-sm-6">
							<h2>
								<b>Planta Docente</b>
							</h2>
						</div>
						<div class="col-sm-6">
							<router-link
								:to="{ name: 'NewSubject' }"
								class="btn btn-success"
							>
								<i class="material-icons">&#xE147;</i>
								<span>Nueva Materia</span>
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
					:filter="search"
					:busy.sync="isBusy"
					:current-page="pagination.current_page"
					:per-page="pagination.per_page"
					@sort-changed="pagination.current_page = 1"
				>
					<!-- Table spinner -->
					<template v-slot:table-busy>
						<div class="text-center my-2 loader">
							<b-spinner class="align-middle"></b-spinner>
						</div>
					</template>

					<!-- A virtual composite column -->
					<template v-slot:cell(name)="data">
						<span v-if="data.item.teacher">
							{{ data.item.teacher.last_name }}
							{{ data.item.teacher.name }}
						</span>
						<span v-else>Sin Asignar</span>
					</template>

					<!-- Details columns -->
					<template v-slot:row-details="row">
						<b-card class="mb-4" v-if="row.item.teacher">
							<b-row class="mb-2"
								><b-col><b>Datos Docente:</b></b-col></b-row
							>
							<b-row class="mb-1">
								<b-col>
									<b>CUIL/CUIT:</b>
									<span class="ml-1">{{
										row.item.teacher.cuil
									}}</span>
								</b-col>
								<b-col>
									<b>Sexo:</b>
									<span class="ml-1">{{
										row.item.teacher.gender
									}}</span>
								</b-col>
							</b-row>
							<b-row class="mb-1">
								<b-col>
									<b>Titulo:</b>
									<span class="ml-1">{{
										row.item.teacher_title
									}}</span>
								</b-col>
								<b-col>
									<b>Categoria del Titulo:</b>
									<span class="ml-1">{{
										row.item.teacher_category_title
									}}</span>
								</b-col>
							</b-row>
							<b-row class="mb-1">
								<b-col>
									<b>Situación de Revista:</b>
									<span class="ml-1">{{
										row.item.job_state.name
									}}</span>
								</b-col>
							</b-row>
							<b-row class="mb-1">
								<b-col>
									<b>Departamento:</b>
									<span class="ml-1">{{
										row.item.teacher.locality.department
											.name
									}}</span>
								</b-col>
								<b-col>
									<b>Localidad:</b>
									<span class="ml-1">{{
										row.item.teacher.locality.name
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
								name: 'EditSubject',
								params: { id: row.item.id }
							}"
							class="edit"
						>
							<i class="material-icons" href title="Editar"
								>create</i
							>
						</router-link>
						<a
							class="delete"
							href
							@click.prevent="
								$refs.deleteModal.showModal(
									baseEndpoint,
									row.item.id
								)
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
							No hay materias registradas!
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
				modelName="materia"
				ref="deleteModal"
				@on-deleted="$refs.table.refresh()"
			></delete-modal>
		</div>
		<div v-else>
			<b-jumbotron class="mt-5">
				<template v-slot:lead>
					Parace que aún no tienes una escuela asignada. Espera que te
					asignen una o contacta al administrador.
				</template>
			</b-jumbotron>
		</div>
	</div>
</template>
<script>
import apiTableMixin from "../shared/mixins/apiTableMixin";
import DeleteModal from "../shared/DeleteModal";
import TeachingPlantFilter from "./Filters";

export default {
	components: {
		DeleteModal,
		TeachingPlantFilter
	},
	mixins: [apiTableMixin],
	data() {
		return {
			fields: [
				{ key: "year", label: "Año", sortable: true },
				{ key: "division", label: "División", sortable: true },
				{ key: "subject", label: "Materia", sortable: true },
				{ key: "name", label: "Docente" },
				{
					key: "monthly_hours",
					label: "Horas Mensuales",
					sortable: true
				},
				{
					key: "updated_at",
					label: "Última Actualización",
					sortable: true
				},
				"acciones"
			],
			baseEndpoint: "teachingPlant",
			endpoint: `schools/${this.$store.state.auth.user.school_id}/${this.baseEndpoint}`
		};
	}
};
</script>

<style lang="scss" scoped>
.jumbotron {
	background-color: #cdd3db !important;
	opacity: 0.7;
	padding-top: 30px;
	padding-bottom: 20px;
	text-align: center;
	font-style: italic;
}
</style>