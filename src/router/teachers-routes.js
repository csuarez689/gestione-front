export default [
	{
		path: '/teachers',
		component: () =>
			import(/* webpackChunkName: "teachers"*/ '../views/TeachersPage'),

		children: [
			{
				path: '',
				name: 'Teachers',
				component: () =>
					import(
						/* webpackChunkName: "teachers"*/ '../components/Teachers/TeachersTable'
					),
			},
			{
				path: 'new',
				name: 'NewTeacher',
				component: () =>
					import(
						/* webpackChunkName: "teachers"*/ '../components/Teachers/TeachersForm'
					),
			},
			{
				path: ':id/edit',
				name: 'EditTeacher',
				component: () =>
					import(
						/* webpackChunkName: "teachers"*/ '../components/Teachers/TeachersForm'
					),
			},
		],
	},
];
