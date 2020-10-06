import store from '../store/index';

export default [
	{
		path: '/users',
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
				name: 'Users',
				component: () =>
					import(
						/* webpackChunkName: "users"*/ '../components/Users/UsersTable.vue'
					),
			},
			{
				path: 'new',
				name: 'NewUser',
				component: () =>
					import(
						/* webpackChunkName: "users"*/ '../components/Users/UsersForm.vue'
					),
			},
			{
				path: ':id/edit',
				name: 'EditUser',
				component: () =>
					import(
						/* webpackChunkName: "users"*/ '../components/Users/UsersForm.vue'
					),
			},
		],
	},
];
