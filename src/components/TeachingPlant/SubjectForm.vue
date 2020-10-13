<template>
	<b-card class="mt-5">
		<template v-slot:header>
			<h5 class="my-1">
				{{ isEditMode ? "Editar Materia" : "Nueva Materia" }}
			</h5>
		</template>

		<b-card-body>
			<form ref="form">
				<b-row>
					<b-col xs="4" class="form-group">
						<label>Año</label>
						<select
							required
							class="form-control"
							:class="{ 'is-invalid': hasError('year') }"
							v-model="form.year"
						>
							<option value hidden></option>
							<option v-for="n in 9" :key="n" :value="n">{{
								n + " º"
							}}</option>
						</select>
						<div class="invalid-feedback" v-if="hasError('year')">
							{{ getError("year") }}
						</div>
					</b-col>

					<b-col xs="4" class="form-group">
						<label>División</label>
						<select
							required
							class="form-control"
							:class="{ 'is-invalid': hasError('division') }"
							v-model="form.division"
						>
							<option value hidden></option>
							<option
								v-for="n in ['A', 'B', 'C', 'D', 'E']"
								:key="n"
								:value="n"
								>{{ n }}</option
							>
						</select>
						<div
							class="invalid-feedback"
							v-if="hasError('division')"
						>
							{{ getError("division") }}
						</div>
					</b-col>

					<b-col xs="4" class="form-group">
						<label>Horas Mensuales</label>
						<input
							type="number"
							class="form-control"
							:class="{ 'is-invalid': hasError('monthly_hours') }"
							required
							min="10"
							max="200"
							v-model="form.monthly_hours"
						/>
						<div
							class="invalid-feedback"
							v-if="hasError('monthly_hours')"
						>
							{{ getError("monthly_hours") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" class="form-group">
						<label>Materia</label>
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': hasError('subject') }"
							required
							minlength="5"
							maxlength="100"
							v-model="form.subject"
						/>
						<div
							class="invalid-feedback"
							v-if="hasError('subject')"
						>
							{{ getError("subject") }}
						</div>
					</b-col>
				</b-row>

				<hr />
				<b-row>
					<b-col sm="12" class="form-group">
						<label>Nombre Docente</label>
						<select
							class="form-control"
							:class="{ 'is-invalid': hasError('teacher_id') }"
							v-model="form.teacher_id"
						>
							<option value></option>
							<option
								v-for="teacher in teachers"
								:key="teacher.id"
								:value="teacher.id"
								>{{
									teacher.last_name + " " + teacher.name
								}}</option
							>
						</select>
						<div
							class="invalid-feedback"
							v-if="hasError('teacher_id')"
						>
							{{ getError("teacher_id") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" class="form-group">
						<label>CUIL/CUIT Docente</label>
						<select
							class="form-control"
							:class="{ 'is-invalid': hasError('teacher_id') }"
							v-model="form.teacher_id"
						>
							<option value></option>
							<option
								v-for="teacher in sortedTeachersByCUIL"
								:key="teacher.id"
								:value="teacher.id"
								>{{ teacher.cuil }}</option
							>
						</select>
						<div
							class="invalid-feedback"
							v-if="hasError('teacher_id')"
						>
							{{ getError("teacher_id") }}
						</div>
					</b-col>
				</b-row>

				<b-row>
					<b-col sm="12" md="12" class="form-group">
						<label>Titulo Docente</label>
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': hasError('teacher_title') }"
							required
							minlength="10"
							maxlength="150"
							v-model="form.teacher_title"
						/>
						<div
							class="invalid-feedback"
							v-if="hasError('teacher_title')"
						>
							{{ getError("teacher_title") }}
						</div>
					</b-col>
				</b-row>

				<b-row>
					<b-col sm="6" class="form-group">
						<label>Categoría del Título</label>
						<select
							class="form-control"
							:class="{
								'is-invalid': hasError('teacher_category_title')
							}"
							v-model="form.teacher_category_title"
						>
							<option value hidden></option>
							<option value="DOCENTE">DOCENTE</option>
							<option value="NO DOCENTE">NO DOCENTE</option>
						</select>
						<div
							class="invalid-feedback"
							v-if="hasError('teacher_category_title')"
						>
							{{ getError("teacher_category_title") }}
						</div>
					</b-col>
					<b-col sm="6" class="form-group">
						<label>Situación de Revista</label>
						<select
							class="form-control"
							:class="{ 'is-invalid': hasError('job_state_id') }"
							v-model="form.job_state_id"
						>
							<option value hidden></option>
							<option
								v-for="job_state in job_states"
								:key="job_state.id"
								:value="job_state.id"
								>{{ job_state.name }}</option
							>
						</select>
						<div
							class="invalid-feedback"
							v-if="hasError('job_state_id')"
						>
							{{ getError("job_state_id") }}
						</div>
					</b-col>
				</b-row>
			</form>
		</b-card-body>
		<template v-slot:footer>
			<b-button
				type="reset"
				size="md"
				variant="outline"
				@click="$router.go(-1)"
				class="mr-3"
				>Cancelar</b-button
			>
			<b-button
				type="submit"
				size="md"
				@click="sendForm"
				:class="{ 'btn-success': !isEditMode, 'btn-info': isEditMode }"
				class="text-light"
				>{{ isEditMode ? "Actualizar" : "Guardar" }}</b-button
			>
		</template>
	</b-card>
</template>
<script>
import FormMixin from "../shared/mixins/formMixin";
import dataService from "../../services/data-service";

export default {
	mixins: [FormMixin],
	data() {
		return {
			teachers: [],
			job_states: [],
			form: {
				id: "",
				year: "",
				division: "",
				subject: "",
				monthly_hours: "",
				teacher_id: "",
				teacher_title: "",
				teacher_category_title: "",
				job_state_id: ""
			}
		};
	},
	methods: {
		update() {
			dataService
				.update("schools", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Escuela actualizada.", "success");
				})
				.catch(error => {
					console.log(error);
					this.vErrors = error.response.data.errors ?? [];
				});
		},
		create() {
			dataService
				.create("schools", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Escuela creada.", "success");
				})
				.catch(error => {
					console.log(error);
					this.vErrors = error.response.data.errors ?? [];
				});
		},
		loadApiFormData() {
			const getSelects = dataService.getAll(
				"formData?include=job_states"
			);
			const getTeachers = dataService.getAll(
				"teachers?sort_by=last_name"
			);
			Promise.all([getTeachers, getSelects])
				.then(([teachers, selects]) => {
					this.teachers = teachers;
					this.job_states = selects.job_states;
					// this.sectors = selects.sectors;
					// this.types = selects.types;
					// this.levels = selects.levels;
					// this.categories = selects.categories;
					// this.journeyTypes = selects.journey_types;
					// this.highSchoolTypes = selects.high_school_types;
					// this.users = users;
				})
				.catch(error => {
					this.$router.go(-1);
					console.log(error);
				});
		}
	},
	computed: {
		sortedTeachersByCUIL() {
			let aux = [...this.teachers];
			return aux.sort((a, b) => {
				if (a.cuil > b.cuil) {
					return 1;
				}
				if (a.cuil < b.cuil) {
					return -1;
				}
				return 0;
			});
		}
	},
	created() {
		this.loadApiFormData();
		if (this.isEditMode) {
			dataService
				.getOne("schools", this.$route.params.id)
				.then(() => {
					// this.form.id = data.id;
					// this.form.bilingual = data.bilingual;
					// this.form.name = data.name;
					// this.form.director = data.director;
					// this.form.cue = data.cue;
					// this.form.number_students = data.number_students;
					// this.form.ambit_id = data.ambit.id;
					// this.form.sector_id = data.sector.id;
					// this.form.level_id = data.level.id;
					// this.form.high_school_type_id = data.high_school_type
					// 	? data.high_school_type.id
					// 	: "";
					// this.form.type_id = data.type.id;
					// this.form.category_id = data.category.id;
					// this.form.journey_type_id = data.journey_type.id;
					// this.form.orientation = data.orientation;
					// this.form.phone = data.phone;
					// this.form.internal_phone = data.internal_phone;
					// this.form.email = data.email;
					// this.form.address = data.address;
					// this.form.user_id = data.user ? data.user.id : "";
					// this.location.province_id =
					// 	data.locality.department.province_id;
					// this.location.department_id = data.locality.department.id;
					// this.location.locality_id = data.locality.id;
					// this.selectedUrl = data._links.self;
				})
				.catch(error => {
					this.$router.go(-1);
					console.log(error);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.card {
	margin: auto;
	max-width: 30rem;
	min-width: 30rem;
}
</style>