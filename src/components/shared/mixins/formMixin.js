export default {
	data() {
		return {
			vErrors: [],
		};
	},
	methods: {
		hasError(key) {
			return this.vErrors[key] ? true : false;
		},
		getError(key) {
			return this.vErrors[key][0];
		},
		sendForm() {
			if (this.$refs.form.checkValidity()) {
				if (this.$route.params.id) this.update();
				else this.create();
			} else this.$refs.form.reportValidity();
		},
	},
	computed: {
		isEditMode() {
			return this.$route.params.id ? true : false;
		},
	},
};
