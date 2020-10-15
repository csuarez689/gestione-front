import Vue from 'vue';

import App from './App.vue';

import router from './router';

import store from './store/index';

import axios from 'axios';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { authHeader } from './helpers/auth-header';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.filter('capitalize', function(value) {
	if (!value) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
});

const vm = new Vue({
	router,
	store,
	methods: {
		createToast(message, type) {
			const h = this.$createElement;
			const vNodeMessage = h(
				'p',
				{ class: ['text-center', 'mb-0', 'pb-0'] },
				[h('strong', message)]
			);
			const options = {
				autoHideDelay: 7000,
				appendToast: true,
				variant: type,
				solid: true,
				noCloseButton: true,
				toaster: 'b-toaster-bottom-right',
			};
			this.$bvToast.toast([vNodeMessage], options);
		},
	},
	render: (h) => h(App),
}).$mount('#app');

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const originalRequest = error.config;
		if (error.response.status === 401) {
			if (
				!originalRequest._retry &&
				originalRequest.url != 'auth/login'
			) {
				originalRequest._retry = true;
				return store.dispatch('auth/refresh').then(() => {
					originalRequest.headers = authHeader();
					return axios(originalRequest);
				});
			}
			if (originalRequest.url != 'auth/login') vm.$router.push('/login');
		}
		return Promise.reject(error);
	}
);
