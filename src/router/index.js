import Vue from 'vue';
import VueRouter from 'vue-router';
import UsersRoutes from './users-routes';
import SchoolsRoutes from './schools-routes';
import TeachersRoutes from './teachers-routes';
Vue.use(VueRouter);

const routes = [
	...UsersRoutes,
	...SchoolsRoutes,
	...TeachersRoutes,
	{
		path: '/login',
		name: 'Login',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/Login.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.auth) {
		if (!router.app.isAuth)
			return next({ path: '/login', query: { returnUrl: to.path } });
		if (to.meta.admin) {
			if (!router.app.isAdmin) return next({ path: '/' });
			return next();
		}
		if (!to.meta.admin) {
			if (!router.app.isAdmin) return next({ path: '/' });
			return next();
		}
	}
	next();
});

export default router;
