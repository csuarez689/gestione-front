import Vue from 'vue';

import App from './App.vue';

import router from './router';

import store from './store';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import axiosApi from './axios-api';

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
		createSuccessToast(message) {
			const h = this.$createElement;
			const vNodeMessage = h(
				'p',
				{ class: ['text-center', 'mb-0', 'pb-0'] },
				[h('strong', message)]
			);
			this.$bvToast.toast([vNodeMessage], {
				autoHideDelay: 4000,
				appendToast: true,
				variant: 'success',
				solid: true,
				noCloseButton: true,
				toaster: 'b-toaster-bottom-right',
			});
		},
	},
	render: (h) => h(App),
}).$mount('#app');

Vue.prototype.$http = axiosApi;
