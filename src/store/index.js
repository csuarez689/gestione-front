import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
	state: { loader: false },
	mutations: {
		setLoader(state, value) {
			state.loader = value;
		},
	},
	modules: {
		auth,
	},
});
