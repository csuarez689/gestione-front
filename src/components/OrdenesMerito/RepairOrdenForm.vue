<template>
	<b-card class="mt-5">
		<template v-slot:header>
			<h5 class="my-1">
				Reparar Orden de Merito
			</h5>
		</template>
		<b-card-body>
			<form ref="form">
				<b-row>
					<b-col sm="12" md="6" class="form-group">
						<label>Apellido</label>
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': hasError('last_name') }"
							required
							maxlength="50"
							minlength="3"
							v-model="form.last_name"
						/>
						<div
							class="invalid-feedback"
							v-if="hasError('last_name')"
						>
							{{ getError("last_name") }}
						</div>
					</b-col>
					<b-col sm="12" md="6" class="form-group">
						<label>Nombre</label>
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': hasError('name') }"
							required
							maxlength="50"
							minlength="3"
							v-model="form.name"
						/>
						<div class="invalid-feedback" v-if="hasError('name')">
							{{ getError("name") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" md="6" class="form-group">
						<label>CUIT/CUIL</label>
						<input
							type="text"
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
								<b-form-radio value="MASCULINO"
									>Masculino</b-form-radio
								>
								<b-form-radio value="FEMENINO"
									>Femenino</b-form-radio
								>
							</b-form-radio-group>
						</b-form-group>
						<div class="invalid-feedback" v-if="hasError('gender')">
							{{ getError("gender") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="3" md="3" class="form-group">
						<label>Región</label>
						<select
							required
							class="form-control"
							:class="{ 'is-invalid': hasError('region') }"
							v-model="form.region"
						>
							<option value hidden></option>
							<option v-for="n in 6" :key="n" :value="n">{{
								n
							}}</option>
						</select>
						<div class="invalid-feedback" v-if="hasError('region')">
							{{ getError("region") }}
						</div>
					</b-col>
					<b-col sm="9" md="9" class="form-group">
						<label>Localidad</label>
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': hasError('locality') }"
							required
							minlength="6"
							maxlength="50"
							v-model="form.locality"
						/>
						<div
							class="invalid-feedback"
							v-if="hasError('locality')"
						>
							{{ getError("locality") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" md="6" class="form-group">
						<label>Incumbencia</label>
						<select
							class="form-control"
							:class="{ 'is-invalid': hasError('incumbency') }"
							v-model="form.incumbency"
						>
							<option value="" selected>SIN DEFINIR</option>
							<option
								v-for="incumbency in incumbencies"
								:key="incumbency"
								:value="incumbency"
								>{{ incumbency }}</option
							>
						</select>
						<div
							class="invalid-feedback"
							v-if="hasError('incumbency')"
						>
							{{ getError("incumbency") }}
						</div>
					</b-col>
					<b-col sm="12" md="6" class="form-group">
						<label>Nivel</label>
						<select
							required
							class="form-control"
							:class="{ 'is-invalid': hasError('incumbency') }"
							v-model="form.level"
						>
							<option value="" hidden></option>
							<option
								v-for="level in levels"
								:key="level"
								:value="level"
								>{{ level }}</option
							>
						</select>
						<div class="invalid-feedback" v-if="hasError('level')">
							{{ getError("level") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" md="12" class="form-group">
						<label>Cargo</label>
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': hasError('charge') }"
							required
							minlength="6"
							maxlength="100"
							v-model="form.charge"
						/>
						<div class="invalid-feedback" v-if="hasError('charge')">
							{{ getError("charge") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" md="12" class="form-group">
						<label>Título principal</label>
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': hasError('title1') }"
							required
							minlength="6"
							maxlength="100"
							v-model="form.title1"
						/>
						<div class="invalid-feedback" v-if="hasError('title1')">
							{{ getError("title1") }}
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col sm="12" md="12" class="form-group">
						<label>Título Secundario</label>
						<input
							type="text"
							class="form-control"
							:class="{ 'is-invalid': hasError('title2') }"
							minlength="6"
							maxlength="100"
							v-model="form.title2"
						/>
						<div class="invalid-feedback" v-if="hasError('title2')">
							{{ getError("title2") }}
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
				class="text-light"
				variant="success"
				>Reparar</b-button
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
			incumbencies: [
				"DOCENTE A1",
				"DOCENTE A2",
				"DOCENTE A3",
				"HABILITANTE B1",
				"HABILITANTE B2",
				"HABILITANTE B3",
				"HABILITANTE B4",
				"HABILITANTE B5",
				"SUPLETORIO C1",
				"SUPLETORIO C2",
				"SUPLETORIO C3",
				"SUPLETORIO C4",
				"SUPLETORIO C5"
			],
			levels: ["INICIAL", "PRIMARIO", "SECUNDARIO"],
			form: {
				name: "",
				last_name: "",
				cuil: "",
				gender: "",
				region: "",
				locality: "",
				incumbency: "",
				level: "",
				charge: "",
				title1: "",
				title2: "",
				year: ""
			}
		};
	},
	methods: {
		update() {
			dataService
				.create(
					`failedOrdenesMerito/${this.$route.params.id}/repair`,
					this.form
				)
				.then(() => {
					this.$router.go(-1);
					this.$root.createToast(
						"Orden de merito reparada.",
						"success"
					);
				})
				.catch(error => {
					console.log(error);
					this.vErrors = error.response.data.errors ?? [];
				});
		}
	},
	created() {
		dataService
			.getOne("failedOrdenesMerito", this.$route.params.id)
			.then(data => {
				this.form.name = data.name;
				this.form.last_name = data.last_name;
				this.form.cuil = data.cuil;
				this.form.gender = data.gender;
				this.form.region = data.region;
				this.form.locality = data.locality;
				this.form.incumbency = data.incumbency;
				this.form.level = data.level;
				this.form.charge = data.charge;
				this.form.title1 = data.title1;
				this.form.title2 = data.title2;
				this.form.year = data.year;
				this.vErrors = data.errors;
			})
			.catch(error => {
				this.$router.go(-1);
				console.log(error);
			});
	}
};
</script>
<style lang="scss" scoped>
.card {
	margin: auto;
	max-width: 35rem;
	min-width: 35rem;
}
</style>