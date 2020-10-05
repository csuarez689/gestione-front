import DataService from '../../../services/data-service';

export default {
	data() {
		return {
			isBusy: false,
			sortBy: '',
			direction: 'asc',
			search: '',
			pagination: {},
		};
	},
	methods: {
		getData(ctx) {
			if (ctx.sortBy) {
				this.sortBy = ctx.sortBy;
				this.direction = ctx.sortDesc ? 'desc' : 'asc';
			}
			return DataService.getAll(
				`${this.endpoint}?direction=${this.direction}&page=${this.pagination.current_page}&per_page=20&search=${ctx.filter}&sort_by=${this.sortBy}`
			)
				.then((data) => {
					console.log(data);
					this.pagination = data.meta;
					return data.data;
				})
				.catch((error) => {
					console.log(error);
					return [];
				});
		},
	},
};
