import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import UsersRoutes from './users-routes';
import SchoolsRoutes from './schools-routes';
import TeachersRoutes from './teachers-routes';
import TeachingPlantRoutes from './teachingPlant-router';
import OrdenesMeritoRoutes from './ordenes-merito';
import AuthRoutes from './auth-routes';

Vue.use(VueRouter);

const routes = [
	...AuthRoutes,
	...UsersRoutes,
	...SchoolsRoutes,
	...TeachersRoutes,
	...TeachingPlantRoutes,
	...OrdenesMeritoRoutes,
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
