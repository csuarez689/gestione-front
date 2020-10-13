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
				<b-row
					><b-button
						variant="success"
						size="sm"
						class="ml-auto"
						:to="{ name: 'NewTeacher' }"
					>
						<i class="material-icons">&#xE147;</i> Nuevo
						Docente</b-button
					></b-row
				>
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
							minlength="10"
							maxlength="150"
							v-model="form.teacher_title"
							:disabled="!form.teacher_id"
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
							:disabled="!form.teacher_id"
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
							:disabled="!form.teacher_id"
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
				.update("teachingPlant", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Materia actualizada.", "success");
				})
				.catch(error => {
					console.log(error);
					this.vErrors = error.response.data.errors ?? [];
				});
		},
		create() {
			dataService
				.create(
					`schools/${this.$store.state.auth.user.school_id}/teachingPlant`,
					this.form
				)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Materia creada.", "success");
				})
				.catch(error => {
					console.log(error);
					this.vErrors = error.response.data.errors ?? [];
				});
		},
		loadApiFormData() {
			let promises = [];
			promises.push(dataService.getAll("formData?include=job_states"));
			promises.push(dataService.getAll("teachers?sort_by=last_name"));
			if (this.isEditMode) {
				promises.push(
					dataService.getOne("teachingPlant", this.$route.params.id)
				);
			}

			Promise.all(promises)
				.then(res => {
					this.job_states = res[0].job_states;
					this.teachers = res[1];
					if (this.isEditMode) {
						this.form.id = res[2].id;
						this.form.year = res[2].year;
						this.form.division = res[2].division;
						this.form.subject = res[2].subject;
						this.form.monthly_hours = res[2].monthly_hours;
						this.form.teacher_id = res[2].teacher
							? res[2].teacher.id
							: null;
						this.form.teacher_title = res[2].teacher_title;
						this.form.teacher_category_title =
							res[2].teacher_category_title;
						this.form.job_state_id = res[2].job_state
							? res[2].job_state.id
							: null;
					}
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
	watch: {
		"form.teacher_id"(value) {
			if (!value) {
				this.form.teacher_title = null;
				this.form.teacher_category_title = null;
				this.form.job_state_id = null;
			}
		}
	},
	created() {
		this.loadApiFormData();
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