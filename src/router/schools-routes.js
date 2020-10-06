import store from '../store/index';

export default [
	{
		path: '/schools',
		component: () =>
			import(
				/* webpackChunkName: "layout"*/ '../views/GeneralLayout.vue'
			),
		beforeEnter: (to, from, next) => {
			if (
				store.state.auth.loggedIn &&
				store.getters['auth/userRole'] == 1
			)
				next();
			else next(store.getters['auth/redirectUrl']);
		},
		children: [
			{
				path: '',
				name: 'Schools',
				component: () =>
					import(
						/* webpackChunkName: "schools"*/ '../components/Schools/SchoolsTable.vue'
					),
			},
			{
				path: 'new',
				name: 'NewSchool',
				component: () =>
					import(
						/* webpackChunkName: "schools"*/ '../components/Schools/SchoolsForm.vue'
					),
			},
			{
				path: ':id/edit',
				name: 'EditSchool',
				component: () =>
					import(
						/* webpackChunkName: "schools"*/ '../components/Schools/SchoolsForm.vue'
					),
			},
		],
	},
];
