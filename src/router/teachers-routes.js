import store from '../store/index';

export default [
	{
		path: '/teachers',
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
				name: 'Teachers',
				component: () =>
					import(
						/* webpackChunkName: "teachers"*/ '../components/Teachers/TeachersTable.vue'
					),
			},
			{
				path: 'new',
				name: 'NewTeacher',
				component: () =>
					import(
						/* webpackChunkName: "teachers"*/ '../components/Teachers/TeachersForm.vue'
					),
			},
			{
				path: ':id/edit',
				name: 'EditTeacher',
				component: () =>
					import(
						/* webpackChunkName: "teachers"*/ '../components/Teachers/TeachersForm.vue'
					),
			},
		],
	},
];
