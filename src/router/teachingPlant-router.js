import store from '../store/index';

export default [
	{
		path: '/teachingPlant',
		component: () =>
			import(
				/* webpackChunkName: "layout"*/ '../views/GeneralLayout.vue'
			),
		beforeEnter: (to, from, next) => {
			if (
				store.state.auth.loggedIn &&
				store.getters['auth/userRole'] == 0
			)
				next();
			else next(store.getters['auth/redirectUrl']);
		},
		children: [
			{
				path: '',
				name: 'TeachingPlant',
				component: () =>
					import(
						/* webpackChunkName: "teachingPlant"*/ '../components/TeachingPlant/TeachingPlantTable.vue'
					),
			},
			{
				path: 'new',
				name: 'NewSubject',
				component: () =>
					import(
						/* webpackChunkName: "teachingPlant"*/ '../components/TeachingPlant/SubjectForm.vue'
					),
			},
			{
				path: ':id/edit',
				name: 'EditSubject',
				component: () =>
					import(
						/* webpackChunkName: "teachingPlant"*/ '../components/TeachingPlant/SubjectForm.vue'
					),
			},
		],
	},
];
