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
				<location-select v-model="location"></location-select>
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

<style lang="scss" scoped>
.card {
	margin: auto;
	max-width: 45rem;
	min-width: 20rem;
}
</style>

<script>
import FormMixin from "../shared/mixins/formMixin";
import LocationSelect from "../shared/LocationSelect";

export default {
	mixins: [FormMixin],
	components: { LocationSelect },
	data() {
		return {
			location: { province_id: "", department_id: "", locality_id: "" },
			form: {
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
			this.$http
				.put(`teachers/${this.$route.params.id}`, this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Docente actualizado.", "success");
				})
				.catch(error => {
					console.log(error.response);
					this.vErrors = error.response.data.errors ?? [];
				});
		},
		create() {
			this.$http
				.post("teachers", this.form)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast("Docente creado.", "success");
				})
				.catch(error => {
					console.log(error.response);
					this.vErrors = error.response.data.errors ?? [];
				});
		}
	},
	created() {
		if (this.isEditMode) {
			this.$http
				.get(`teachers/${this.$route.params.id}`)
				.then(res => {
					this.form.name = res.data.name;
					this.form.last_name = res.data.last_name;
					this.form.cuil = res.data.cuil;
					this.form.gender = res.data.gender;
					this.location.province_id =
						res.data.locality.department.province_id;
					this.location.department_id =
						res.data.locality.department.id;
					this.location.locality_id = res.data.locality.id;
					this.selectedUrl = res.data._links.self;
				})
				.catch(error => {
					this.$route.go(-1);
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
