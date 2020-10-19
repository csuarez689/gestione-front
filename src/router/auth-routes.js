import store from '../store/index';

export default [
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
