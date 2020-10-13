import DataService from '../../../services/data-service';

export default {
	data() {
		return {
			isBusy: false,
			sortBy: '',
			direction: 'asc',
			search: '',
			pagination: { current_page: 1 },
		};
	},
	methods: {
		getData(ctx) {
			if (ctx.sortBy) {
				this.sortBy = ctx.sortBy;
				this.direction = ctx.sortDesc ? 'desc' : 'asc';
			}
			let params = {
				direction: this.direction,
				page: this.pagination.current_page,
				per_page: 20,
				sortBy: this.sortBy,
				...ctx.filter,
			};
			return DataService.getAll(this.endpoint, params)
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
