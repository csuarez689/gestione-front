export default [
	{
		path: '/users',
		component: () =>
			import(/* webpackChunkName: "users"*/ '../views/UsersPage'),
		meta: { admin: true },
		children: [
			{
				path: '',
				name: 'Users',
				component: () =>
					import(
						/* webpackChunkName: "users"*/ '../components/Users/UsersTable'
					),
			},
			{
				path: 'new',
				name: 'NewUser',
				component: () =>
					import(
						/* webpackChunkName: "users"*/ '../components/Users/UsersForm'
					),
			},
			{
				path: ':id/edit',
				name: 'EditUser',
				component: () =>
					import(
						/* webpackChunkName: "users"*/ '../components/Users/UsersForm'
					),
			},
		],
	},
];
