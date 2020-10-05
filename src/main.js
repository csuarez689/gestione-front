import Vue from 'vue';

import App from './App.vue';

import router from './router';

import store from './store/index';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Vue.filter('capitalize', function(value) {
	if (!value) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
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
			this.$bvToast.toast([vNodeMessage], {
				autoHideDelay: 5000,
				appendToast: true,
				variant: type,
				solid: true,
				noCloseButton: true,
				toaster: 'b-toaster-bottom-right',
			});
		},
	},

	render: (h) => h(App),
}).$mount('#app');

// axiosApi.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		const originalRequest = error.config;
// 		if (error.response.status === 401) {
// 			if (
// 				!originalRequest._retry &&
// 				originalRequest.url != 'auth/refresh' &&
// 				originalRequest.url != 'auth/login'
// 			) {
// 				originalRequest._retry = true;
// 				return vm.$http.post('auth/refresh').then((res) => {
// 					vm.$data.token = res.data.access_token;
// 					originalRequest.headers[
// 						'Authorization'
// 					] = `Bearer ${res.data.access_token}`;
// 					return vm.$http(originalRequest);
// 				});
// 			}
// 			vm.$data.user = '';
// 			vm.$data.token = '';
// 			if (originalRequest.url != 'auth/login') vm.$router.push('/login');
// 		}
// 		return Promise.reject(error);
// 	}
// );
