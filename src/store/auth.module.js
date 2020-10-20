import AuthService from '../services//auth-service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
	? { loggedIn: true, user }
	: { loggedIn: false, user: null };

export const auth = {
	namespaced: true,
	state: initialState,

	actions: {
		login({ commit }, credentials) {
			return AuthService.login(credentials).then(
				(data) => {
					commit('loginSuccess', data);
					return Promise.resolve(data);
				},
				(error) => {
					commit('logout');
					return Promise.reject(error.response.data);
				}
			);
		},

		profile({ commit }) {
			return AuthService.getProfile().then(
				(res) => {
					commit('setUser', res.data);
					return Promise.resolve(res.data);
				},
				(error) => {
					return Promise.reject(error.response.data);
				}
			);
		},

		updateProfile({ commit }, data) {
			return AuthService.updateProfile(data).then(
				(res) => {
					commit('setUser', res.data);
					return Promise.resolve(res.data);
				},
				(error) => {
					return Promise.reject(error.response.data);
				}
			);
		},

		refresh({ commit }) {
			return AuthService.refresh().then(
				(data) => {
					commit('refresh', data.access_token);
					return Promise.resolve(data);
				},
				(error) => {
					commit('logout');
					return Promise.reject(error);
				}
			);
		},

		changePassword({ commit }, data) {
			return AuthService.changePassword(data).then(
				() => {
					commit('logout');
					return Promise.resolve();
				},
				(error) => {
					return Promise.reject(error.response.data);
				}
			);
		},
	},

	mutations: {
		loginSuccess(state, data) {
			state.loggedIn = true;
			state.user = data.user;
			localStorage.setItem('user', JSON.stringify(data.user));
			localStorage.setItem('token', data.access_token);
		},

		logout(state) {
			state.loggedIn = false;
			state.user = null;
			localStorage.removeItem('user');
			localStorage.removeItem('token');
		},

		refresh(state, token) {
			localStorage.setItem('token', token);
		},

		setUser(state, user) {
			state.user = user;
			localStorage.setItem('user', JSON.stringify(user));
		},
	},

	getters: {
		redirectUrl: (state) => {
			if (state.loggedIn) {
				return state.user.isAdmin ? '/users' : '/teachingPlant';
			}
			return '/login';
		},
		userFullName: (state) => {
			return `${state.user.name} ${state.user.last_name}`;
		},
		userRole: (state) => {
			return state.user.isAdmin;
		},
	},
};
