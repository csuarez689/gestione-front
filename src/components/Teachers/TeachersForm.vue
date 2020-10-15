<template>
	<b-card class="mt-5">
		<template v-slot:header>
			<h5 class="my-1">
				{{ isEditMode ? "Editar Docente" : "Nuevo Docente" }}
			</h5>
		</template>
		<b-card-body>
			<form ref="form">
				<div class="form-group">
					<label>Apellido</label>
					<input
						type="text"
						name="last_name"
						class="form-control"
						:class="{ 'is-invalid': hasError('last_name') }"
						required
						maxlength="100"
						minlength="3"
						v-model="form.last_name"
					/>
					<div class="invalid-feedback" v-if="hasError('last_name')">
						{{ getError("last_name") }}
					</div>
				</div>
				<div class="form-group">
					<label>Nombre</label>
					<input
						type="text"
						name="name"
						class="form-control"
						:class="{ 'is-invalid': hasError('name') }"
						required
						maxlength="100"
						minlength="3"
						v-model="form.name"
					/>
					<div class="invalid-feedback" v-if="hasError('name')">
						{{ getError("name") }}
					</div>
				</div>
				<b-row>
					<b-col sm="12" md="6" class="form-group">
						<label>CUIT/CUIL</label>
						<input
							type="text"
							name="cuil"
							class="form-control"
							:class="{ 'is-invalid': hasError('cuil') }"
							required
							minlength="13"
							maxlength="13"
							v-model="form.cuil"
						/>
						<div class="invalid-feedback" v-if="hasError('cuil')">
							{{ getError("cuil") }}
						</div>
					</b-col>
					<b-col sm="12" md="6" class="form-group">
						<b-form-group label="Sexo">
							<b-form-radio-group
								name="bilingual"
								v-model="form.gender"
							>
								<b-form-radio value="Masculino"
									>Masculino</b-form-radio
								>
								<b-form-radio value="Femenino"
									>Femenino</b-form-radio
								>
							</b-form-radio-group>
						</b-form-group>
						<div class="invalid-feedback" v-if="hasError('gender')">
							{{ getError("gender") }}
						</div>
					</b-col>
				</b-row>
				<location-select
					v-model="location"
					:mdSize="12"
				></location-select>
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
import LocationSelect from "../shared/LocationSelect";
import dataService from "../../services/data-service";

export default {
	mixins: [FormMixin],
	components: { LocationSelect },
	data() {
		return {
			location: { province_id: "", department_id: "", locality_id: "" },
			form: {
				id: "",
				name: "",
				last_name: "",
				cuil: "",
				gender: "Masculino",
				locality_id: ""
			}
		};
	},
	methods: {
		update() {
			dataService
				.update("teachers", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Docente actualizado.", "success");
				})
				.catch(error => {
					console.log(error);
					this.vErrors = error.response.data.errors ?? [];
				});
		},
		create() {
			dataService
				.create("teachers", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Docente creado.", "success");
				})
				.catch(error => {
					console.log(error);
					this.vErrors = error.response.data.errors ?? [];
				});
		}
	},
	created() {
		if (this.isEditMode) {
			dataService
				.getOne("teachers", this.$route.params.id)
				.then(data => {
					this.form.id = data.id;
					this.form.name = data.name;
					this.form.last_name = data.last_name;
					this.form.cuil = data.cuil;
					this.form.gender = data.gender;
					this.location.province_id =
						data.locality.department.province_id;
					this.location.department_id = data.locality.department.id;
					this.location.locality_id = data.locality.id;
					this.selectedUrl = data._links.self;
				})
				.catch(error => {
					this.$router.go(-1);
					console.log(error);
				});
		}
	},
	watch: {
		"location.locality_id"(value) {
			this.form.locality_id = value;
		}
	}
};
</script>
<style lang="scss" scoped>
.card {
	margin: auto;
	max-width: 30rem;
	min-width: 34rem;
}
</style>