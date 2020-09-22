import Vue from 'vue';
import VueRouter from 'vue-router';
import UsersRoutes from './users-routes';
import SchoolsRoutes from './schools-routes';

Vue.use(VueRouter);

const routes = [
	...UsersRoutes,
	...SchoolsRoutes,
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

export default router;
