import Vue from 'vue';
import VueRouter from 'vue-router';
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
		meta: { auth: false },
	},
	...UsersRoutes,
	...SchoolsRoutes,
	...TeachersRoutes,
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
