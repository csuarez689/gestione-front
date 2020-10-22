import store from '../store/index';

export default [
	{
		path: '/reports',
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
				path: 'schoolsCount',
				name: 'SchoolsCount',
				component: () =>
					import(
						/* webpackChunkName: "reports"*/ '../components/Reports/SchoolsCount.vue'
					),
			},
		],
	},
];
