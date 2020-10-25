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
			{
				path: 'teachingPlantCharges',
				name: 'TeachingPlantCharges',
				component: () =>
					import(
						/* webpackChunkName: "reports"*/ '../components/Reports/TeachingPlantCharges.vue'
					),
			},
			{
				path: 'omInscriptions',
				name: 'OmInscriptions',
				component: () =>
					import(
						/* webpackChunkName: "reports"*/ '../components/Reports/OMInscriptions.vue'
					),
			},
			{
				path: 'omInscriptionsJobs',
				name: 'OmInscriptionsJobs',
				component: () =>
					import(
						/* webpackChunkName: "reports"*/ '../components/Reports/OMIncriptionsJobs.vue'
					),
			},
		],
	},
];
