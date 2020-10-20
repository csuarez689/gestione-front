import store from '../store/index';

export default [
	{
		path: '/me',
		component: () =>
			import(
				/* webpackChunkName: "layout" */ '../views/GeneralLayout.vue'
			),
		beforeEnter: (to, from, next) => {
			if (!store.state.auth.loggedIn)
				next(store.getters['auth/redirectUrl']);
			else next();
		},
		children: [
			{
				path: '',
				name: 'Profile',
				component: () =>
					import(
						/* webpackChunkName: "profile" */ '../components/Auh/Profile.vue'
					),
			},
			{
				path: 'changePassword',
				name: 'ChangePassword',
				component: () =>
					import(
						/* webpackChunkName: "profile" */ '../components/Auh/ChangePassword.vue'
					),
			},
			{
				path: 'school',
				name: 'MySchool',
				component: () =>
					import(
						/* webpackChunkName: "school" */ '../components/Auh/MySchool.vue'
					),
				beforeEnter: (to, from, next) => {
					if (!store.state.auth.user.school_id)
						next(store.getters['auth/redirectUrl']);
					else next();
				},
			},
		],
	},
	{
		path: '/login',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/Auth.vue'),
		beforeEnter: (to, from, next) => {
			if (store.state.auth.loggedIn)
				next(store.getters['auth/redirectUrl']);
			else next();
		},
		children: [
			{
				path: '',
				name: 'Login',
				component: () =>
					import(
						/* webpackChunkName: "login" */ '../components/Auh/Login.vue'
					),
			},
			{
				path: 'forgotPassword',
				name: 'ForgotPassword',
				component: () =>
					import(
						/* webpackChunkName: "login" */ '../components/Auh/ForgotPassword.vue'
					),
			},
			{
				path: 'resetPassword/:token',
				name: 'resetPassword',
				component: () =>
					import(
						/* webpackChunkName: "login" */ '../components/Auh/ResetPassword.vue'
					),
			},
		],
	},
];
