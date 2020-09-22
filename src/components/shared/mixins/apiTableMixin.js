export default {
	data() {
		return {
			isBusy: false,
			sortBy: '',
			direction: 'asc',
			search: '',
			pagination: {
				current_page: 1,
				total: 0,
				per_page: 20,
				last_page: 1,
			},
		};
	},
	methods: {
		getData(ctx) {
			if (ctx.sortBy) {
				this.sortBy = ctx.sortBy;
				this.direction = ctx.sortDesc ? 'desc' : 'asc';
			}
			return this.$http
				.get(
					`${this.endpoint}?direction=${this.direction}&page=${this.pagination.current_page}&per_page=20&search=${ctx.filter}&sort_by=${this.sortBy}`
				)
				.then((res) => {
					console.log(res);
					this.pagination = res.data.meta;
					return res.data.data;
				})
				.catch((error) => {
					console.log(error);
					return [];
				});
		},
	},
};
