import store from '../store/index';

export default [
	{
		path: '/ordenesMerito',
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
				name: 'OrdenesMerito',
				component: () =>
					import(
						/* webpackChunkName: "orden"*/ '../components/OrdenesMerito/OrdenesTable.vue'
					),
			},
			{
				path: 'fails',
				name: 'OrdenesFails',
				component: () =>
					import(
						/* webpackChunkName: "orden"*/ '../components/OrdenesMerito/FailsTable.vue'
					),
			},
			{
				path: 'fails/:id/repair',
				name: 'RepairOrdenMerito',
				component: () =>
					import(
						/* webpackChunkName: "orden"*/ '../components/OrdenesMerito/RepairOrdenForm.vue'
					),
			},
		],
	},
];
