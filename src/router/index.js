import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import UsersRoutes from './users-routes';
import SchoolsRoutes from './schools-routes';
import TeachersRoutes from './teachers-routes';
import TeachingPlantRoutes from './teachingPlant-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/Login.vue'),
		beforeEnter: (to, from, next) => {
			if (store.state.auth.loggedIn)
				next(store.getters['auth/redirectUrl']);
			else next();
		},
	},
	...UsersRoutes,
	...SchoolsRoutes,
	...TeachersRoutes,
	...TeachingPlantRoutes,
	{
		path: '*',
		redirect: store.getters['auth/redirectUrl'],
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;
