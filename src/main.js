import Vue from 'vue';

import App from './App.vue';

import router from './router';

import axiosApi from './axios-api';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.prototype.$http = axiosApi;

Vue.filter('capitalize', function(value) {
	if (!value) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
});

const vm = new Vue({
	data: {
		user: '',
		token: '',
	},
	router,
	computed: {
		isAuth() {
			return this.user && this.token ? true : false;
		},
		isAdmin() {
			return this.user.isAdmin;
		},
	},
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
	mounted() {
		if (localStorage.user) this.user = JSON.parse(localStorage.user);
		if (localStorage.token) {
			this.token = JSON.parse(localStorage.token);
			this.$http.defaults.headers.common[
				'Authorization'
			] = `Bearer ${this.token}`;
		}
	},
	watch: {
		user(value) {
			localStorage.user = JSON.stringify(value);
		},
		token(value) {
			localStorage.token = JSON.stringify(value);
			if (value)
				this.$http.defaults.headers.common[
					'Authorization'
				] = `Bearer ${value}`;
			else delete this.$http.defaults.headers.common['Authorization'];
		},
	},
	render: (h) => h(App),
}).$mount('#app');

axiosApi.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const originalRequest = error.config;
		if (error.response.status === 401) {
			if (
				!originalRequest._retry &&
				originalRequest.url != 'auth/refresh' &&
				originalRequest.url != 'auth/login'
			) {
				originalRequest._retry = true;
				return vm.$http.post('auth/refresh').then((res) => {
					vm.$data.token = res.data.access_token;
					originalRequest.headers[
						'Authorization'
					] = `Bearer ${res.data.access_token}`;
					return vm.$http(originalRequest);
				});
			}
			vm.$data.user = '';
			vm.$data.token = '';
			if (originalRequest.url != 'auth/login') vm.$router.push('/login');
		}
		return Promise.reject(error);
	}
);
