import Vue from 'vue';

import App from './App.vue';

import router from './router';
import store from './store/index';
import axios from 'axios';
import { authHeader } from './helpers/auth-header';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

Vue.filter('capitalize', function(value) {
	if (!value) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('pluralize', function(value, number) {
	return number > 1 ? value + 's' : value;
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
	watch: {
		online(value) {
			console.log(value);
		},
	},
	render: (h) => h(App),
}).$mount('#app');

//online status
// function refreshApp() {
// 	window.location.reload();
// }

// window.addEventListener('online', refreshApp);
// window.addEventListener('offline', refreshApp);

//interceptors
axios.interceptors.response.use(
	(response) => {
		if (response.data && response.data.message)
			vm.createToast(response.data.message, 'success');
		return response;
	},
	(error) => {
		const originalRequest = error.config;
		if (error.response.status === 401) {
			if (
				!originalRequest._retry &&
				originalRequest.url != 'http://localhost:8000/api/auth/login'
			) {
				originalRequest._retry = true;
				return store
					.dispatch('auth/refresh')
					.then(() => {
						originalRequest.headers = authHeader();
						return axios(originalRequest);
					})
					.catch(() => {
						vm.$router.push('/login');
					});
			}
		} else {
			if (error.status !== 500)
				if (error.response.data && error.response.data.message)
					vm.createToast(error.response.data.message, 'danger');
				else vm.createToast('¡Upps!, ha ocurrido un error.', 'danger');
		}
		return Promise.reject(error);
	}
);
