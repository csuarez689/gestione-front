import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import UsersRoutes from './users-routes';
import SchoolsRoutes from './schools-routes';
import TeachersRoutes from './teachers-routes';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/Login.vue'),
	},
	...UsersRoutes,
	...SchoolsRoutes,
	...TeachersRoutes,
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.path == '/login' && store.state.auth.status.loggedIn) {
		next(store.getters['auth/redirectUrl']);
	}
	let res = to.matched.map((m) => m.meta.admin);
	if (!store.getters['auth/hasPermission'](res[0])) {
		next(store.getters['auth/redirectUrl']);
	}
	next();
});

export default router;
