<template>
	<div>
		<b-card class="mt-5">
			<template v-slot:header>
				<h5 class="my-1">
					{{ isEditMode ? "Editar Escuela" : "Nueva Escuela" }}
				</h5>
			</template>

			<b-card-body>
				<form ref="form">
					<b-row>
						<b-col sm="12" md="7" class="form-group">
							<label>Nombre</label>
							<input
								type="text"
								name="name"
								class="form-control"
								:class="{ 'is-invalid': hasError('name') }"
								required
								maxlength="150"
								minlength="10"
								v-model="form.name"
							/>
							<div
								class="invalid-feedback"
								v-if="hasError('name')"
							>
								{{ getError("name") }}
							</div>
						</b-col>
						<b-col sm="12" md="5" class="form-group">
							<label>Director</label>
							<input
								type="text"
								name="director"
								class="form-control"
								:class="{
									'is-invalid': hasError('director')
								}"
								required
								maxlength="150"
								minlength="5"
								v-model="form.director"
							/>
							<div
								class="invalid-feedback"
								v-if="hasError('director')"
							>
								{{ getError("director") }}
							</div>
						</b-col>
					</b-row>
					<b-row>
						<b-col sm="6" md="3" class="form-group">
							<label>CUE</label>
							<input
								type="text"
								name="cue"
								class="form-control"
								:class="{ 'is-invalid': hasError('cue') }"
								required
								maxlength="9"
								minlength="9"
								v-model="form.cue"
							/>
							<div
								class="invalid-feedback"
								v-if="hasError('cue')"
							>
								{{ getError("cue") }}
							</div>
						</b-col>
						<b-col sm="6" md="3" class="form-group">
							<label>Estudiantes</label>
							<input
								type="number"
								name="number_students"
								class="form-control"
								:class="{
									'is-invalid': hasError('number_students')
								}"
								min="20"
								max="2000"
								v-model="form.number_students"
							/>
							<div
								class="invalid-feedback"
								v-if="hasError('number_students')"
							>
								{{ getError("number_students") }}
							</div>
						</b-col>
						<b-col sm="6" md="3" class="form-group">
							<label>Ámbito</label>
							<select
								required
								class="form-control"
								:class="{
									'is-invalid': hasError('ambit_id')
								}"
								v-model="form.ambit_id"
							>
								<option value hidden></option>
								<option
									v-for="ambit in ambits"
									:key="ambit.id"
									:value="ambit.id"
									>{{ ambit.name }}</option
								>
							</select>
							<div
								class="invalid-feedback"
								v-if="hasError('ambit_id')"
							>
								{{ getError("ambit_id") }}
							</div>
						</b-col>
						<b-col sm="6" md="3" class="form-group">
							<label>Sector</label>
							<select
								required
								class="form-control"
								name="sector_id"
								:class="{
									'is-invalid': hasError('sector_id')
								}"
								v-model="form.sector_id"
							>
								<option value hidden></option>
								<option
									v-for="sector in sectors"
									:key="sector.id"
									:value="sector.id"
									>{{ sector.name }}</option
								>
							</select>
							<div
								class="invalid-feedback"
								v-if="hasError('sector_id')"
							>
								{{ getError("sector_id") }}
							</div>
						</b-col>
					</b-row>
					<b-row>
						<b-col sm="6" md="3" class="form-group">
							<label>Nivel</label>
							<select
								required
								class="form-control"
								name="level_id"
								:class="{
									'is-invalid': hasError('level_id')
								}"
								v-model="form.level_id"
								@change="resetHighSchool"
							>
								<option value hidden></option>
								<option
									v-for="level in levels"
									:key="level.id"
									:value="level.id"
									>{{ level.name }}</option
								>
							</select>
							<div
								class="invalid-feedback"
								v-if="hasError('level_id')"
							>
								{{ getError("level_id") }}
							</div>
						</b-col>
						<b-col sm="6" md="3" class="form-group">
							<label>Tipo Secundario</label>
							<select
								:required="form.level_id == 3"
								:disabled="form.level_id != 3"
								class="form-control"
								name="high_school_type_id"
								:class="{
									'is-invalid': hasError(
										'high_school_type_id'
									)
								}"
								v-model="form.high_school_type_id"
							>
								<option hidden></option>
								<option
									v-for="highSchoolType in highSchoolTypes"
									:key="highSchoolType.id"
									:value="highSchoolType.id"
									>{{ highSchoolType.name }}</option
								>
							</select>
							<div
								class="invalid-feedback"
								v-if="hasError('high_school_type_id')"
							>
								{{ getError("high_school_type_id") }}
							</div>
						</b-col>
						<b-col sm="6" md="4" class="form-group">
							<label>Tipo</label>
							<select
								required
								class="form-control"
								name="type_id"
								:class="{
									'is-invalid': hasError('type_id')
								}"
								v-model="form.type_id"
							>
								<option value hidden></option>
								<option
									v-for="type in types"
									:key="type.id"
									:value="type.id"
									>{{ type.name }}</option
								>
							</select>
							<div
								class="invalid-feedback"
								v-if="hasError('type_id')"
							>
								{{ getError("type_id") }}
							</div>
						</b-col>
						<b-col sm="6" md="2" class="form-group">
							<label>Categoría</label>
							<select
								required
								class="form-control"
								name="category_id"
								:class="{
									'is-invalid': hasError('category_id')
								}"
								v-model="form.category_id"
							>
								<option value hidden></option>
								<option
									v-for="category in categories"
									:key="category.id"
									:value="category.id"
									>{{ category.name }}</option
								>
							</select>
							<div
								class="invalid-feedback"
								v-if="hasError('category_id')"
							>
								{{ getError("category_id") }}
							</div>
						</b-col>
					</b-row>
					<b-row>
						<b-col sm="6" md="2" class="pr-0">
							<b-form-group label="Bilingue">
								<b-form-radio-group v-model="form.bilingual">
									<b-form-radio value="true">Si</b-form-radio>
									<b-form-radio value="false"
										>No</b-form-radio
									>
								</b-form-radio-group>
							</b-form-group>
						</b-col>
						<b-col sm="6" md="3" class="form-group">
							<label>Jornada</label>
							<select
								required
								class="form-control"
								:class="{
									'is-invalid': hasError('journey_type_id')
								}"
								v-model="form.journey_type_id"
							>
								<option hidden></option>
								<option
									v-for="journeyType in journeyTypes"
									:key="journeyType.id"
									:value="journeyType.id"
									>{{ journeyType.name }}</option
								>
							</select>
							<div
								class="invalid-feedback"
								v-if="hasError('journey_type_id')"
							>
								{{ getError("journey_type_id") }}
							</div>
						</b-col>

						<b-col sm="12" md="7" class="form-group">
							<label>Orientación</label>
							<input
								type="text"
								name="orientation"
								class="form-control"
								:class="{
									'is-invalid': hasError('orientation')
								}"
								list="school_orientations"
								required
								minlength="10"
								maxlength="150"
								v-model="form.orientation"
							/>
							<datalist id="school_orientations">
								<option
									v-for="school_orientation in school_orientations"
									:key="school_orientation.name"
									>{{ school_orientation.name }}</option
								>
							</datalist>
							<div
								class="invalid-feedback"
								v-if="hasError('orientation')"
							>
								{{ getError("orientation") }}
							</div>
						</b-col>
					</b-row>
					<b-row>
						<b-col sm="12" md="6" class="form-group">
							<label>Teléfono</label>
							<input
								type="tel"
								name="phone"
								class="form-control"
								:class="{ 'is-invalid': hasError('phone') }"
								minlength="10"
								maxlength="15"
								v-model="form.phone"
							/>
							<div
								class="invalid-feedback"
								v-if="hasError('phone')"
							>
								{{ getError("phone") }}
							</div>
						</b-col>
						<b-col sm="12" md="6" class="form-group">
							<label>Teléfono interno</label>
							<input
								type="tel"
								name="internal_phone"
								class="form-control"
								:class="{
									'is-invalid': hasError('internal_phone')
								}"
								minlength="10"
								maxlength="15"
								v-model="form.internal_phone"
							/>
							<div
								class="invalid-feedback"
								v-if="hasError('internal_phone')"
							>
								{{ getError("internal_phone") }}
							</div>
						</b-col>
					</b-row>
					<b-row>
						<b-col sm="12" md="6" class="form-group">
							<label>Correo electrónico</label>
							<input
								type="email"
								name="email"
								class="form-control"
								:class="{ 'is-invalid': hasError('email') }"
								required
								minlength="15"
								maxlength="100"
								v-model="form.email"
							/>
							<div
								class="invalid-feedback"
								v-if="hasError('email')"
							>
								{{ getError("email") }}
							</div>
						</b-col>
						<b-col sm="12" md="6" class="form-group">
							<label>Dirección</label>
							<input
								type="text"
								name="address"
								class="form-control"
								:class="{
									'is-invalid': hasError('address')
								}"
								required
								minlength="10"
								maxlength="150"
								v-model="form.address"
							/>
							<div
								class="invalid-feedback"
								v-if="hasError('address')"
							>
								{{ getError("address") }}
							</div>
						</b-col>
					</b-row>

					<location-select v-model="location"></location-select>

					<hr />

					<b-row>
						<b-col sm="12" md="8" class="form-group">
							<label>Nombre Encargado</label>
							<select
								class="form-control"
								name="user_id"
								:class="{
									'is-invalid': hasError('user_id')
								}"
								v-model="form.user_id"
							>
								<option value></option>
								<option
									v-for="user in users"
									:key="user.id"
									:value="user.id"
									>{{
										user.last_name + " " + user.name
									}}</option
								>
							</select>
							<div
								class="invalid-feedback"
								v-if="hasError('user_id')"
							>
								{{ getError("user_id") }}
							</div>
						</b-col>
						<b-col sm="12" md="4" class="form-group">
							<label>DNI Encargado</label>
							<select
								class="form-control"
								:class="{
									'is-invalid': hasError('user_id')
								}"
								v-model="form.user_id"
							>
								<option value></option>
								<option
									v-for="user in sortedUsersByDNI"
									:key="user.id"
									:value="user.id"
									>{{ user.dni }}</option
								>
							</select>
							<div
								class="invalid-feedback"
								v-if="hasError('user_id')"
							>
								{{ getError("user_id") }}
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
					class="mr-4"
					>Cancelar</b-button
				>
				<b-button
					type="submit"
					size="md"
					@click="sendForm"
					:class="{
						'btn-success': !isEditMode,
						'btn-info': isEditMode
					}"
					class="text-light"
					>{{ isEditMode ? "Actualizar" : "Guardar" }}</b-button
				>
			</template>
		</b-card>
	</div>
</template>
<script>
import FormMixin from "../shared/mixins/formMixin";
import LocationSelect from "../shared/LocationSelect";
import dataService from "../../services/data-service";

export default {
	components: { LocationSelect },
	mixins: [FormMixin],
	data() {
		return {
			location: { province_id: "", department_id: "", locality_id: "" },
			ambits: [],
			sectors: [],
			types: [],
			levels: [],
			categories: [],
			journeyTypes: [],
			highSchoolTypes: [],
			school_orientations: [],
			users: [],
			form: {
				id: "",
				bilingual: false,
				name: "",
				director: "",
				cue: "",
				number_students: "",
				ambit_id: "",
				sector_id: "",
				level_id: "",
				high_school_type_id: "",
				type_id: "",
				category_id: "",
				journey_type_id: "",
				orientation: "",
				phone: "",
				internal_phone: "",
				email: "",
				address: "",
				locality_id: "",
				user_id: ""
			}
		};
	},
	methods: {
		resetHighSchool() {
			if (this.form.level_id != 3) this.form.high_school_type_id = "";
		},
		update() {
			this.$store.commit("setLoader", true);

			dataService
				.update("schools", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Escuela actualizada.", "success");
				})
				.catch(error => {
					this.vErrors = error.response.data.errors ?? [];
				})
				.finally(() => this.$store.commit("setLoader", false));
		},
		create() {
			this.$store.commit("setLoader", true);
			dataService
				.create("schools", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Escuela creada.", "success");
				})
				.catch(error => {
					this.vErrors = error.response.data.errors ?? [];
				})
				.finally(() => this.$store.commit("setLoader", false));
		},
		loadApiFormData() {
			this.$store.commit("setLoader", true);
			let promises = [];
			promises.push(
				dataService.getAll(
					"formData?include=ambits,sectors,types,levels,categories,journey_types,high_school_types,school_orientations"
				)
			);
			promises.push(dataService.getAll("users?sort_by=last_name"));
			if (this.isEditMode) {
				promises.push(
					dataService.getOne("schools", this.$route.params.id)
				);
			}
			Promise.all(promises)
				.then(res => {
					this.school_orientations = res[0].school_orientations;
					this.ambits = res[0].ambits;
					this.sectors = res[0].sectors;
					this.types = res[0].types;
					this.levels = res[0].levels;
					this.categories = res[0].categories;
					this.journeyTypes = res[0].journey_types;
					this.highSchoolTypes = res[0].high_school_types;
					this.users = res[1];
					if (this.isEditMode) {
						this.form.id = res[2].id;
						this.form.bilingual = res[2].bilingual;
						this.form.name = res[2].name;
						this.form.director = res[2].director;
						this.form.cue = res[2].cue;
						this.form.number_students = res[2].number_students;
						this.form.ambit_id = res[2].ambit.id;
						this.form.sector_id = res[2].sector.id;
						this.form.level_id = res[2].level.id;
						this.form.high_school_type_id = res[2].high_school_type
							? res[2].high_school_type.id
							: "";
						this.form.type_id = res[2].type.id;
						this.form.category_id = res[2].category.id;
						this.form.journey_type_id = res[2].journey_type.id;
						this.form.orientation = res[2].orientation;
						this.form.phone = res[2].phone;
						this.form.internal_phone = res[2].internal_phone;
						this.form.email = res[2].email;
						this.form.address = res[2].address;
						this.form.user_id = res[2].user ? res[2].user.id : "";
						this.location.province_id =
							res[2].locality.department.province_id;
						this.location.department_id =
							res[2].locality.department.id;
						this.location.locality_id = res[2].locality.id;
						this.selectedUrl = res[2]._links.self;
					}
				})
				.catch(() => {
					this.$router.go(-1);
				})
				.finally(() => this.$store.commit("setLoader", false));
		}
	},
	computed: {
		sortedUsersByDNI() {
			let aux = [...this.users];
			return aux.sort((a, b) => {
				return a.dni - b.dni;
			});
		}
	},
	watch: {
		"location.locality_id"(value) {
			this.form.locality_id = value;
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
	max-width: 50rem;
	min-width: 40rem;
	.card-footer {
		text-align: end;
	}
}
</style>