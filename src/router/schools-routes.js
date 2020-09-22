export default [
	{
		path: '/schools',
		component: () =>
			import(/* webpackChunkName: "schools"*/ '../views/SchoolsPage'),
		children: [
			{
				path: '',
				name: 'Schools',
				component: () =>
					import(
						/* webpackChunkName: "schools"*/ '../components/Schools/SchoolsTable'
					),
			},
			{
				path: 'new',
				name: 'NewSchool',
				component: () =>
					import(
						/* webpackChunkName: "schools"*/ '../components/Schools/SchoolsForm'
					),
			},
			{
				path: ':id/edit',
				name: 'EditSchool',
				component: () =>
					import(
						/* webpackChunkName: "schools"*/ '../components/Schools/SchoolsForm'
					),
			},
		],
	},
];
