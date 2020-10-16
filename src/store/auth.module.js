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
					let message =
						error.response.status == 401
							? 'Credenciales invalidas.'
							: error.response.data;
					return Promise.reject(message);
				}
			);
		},

		profile({ commit }) {
			return (
				AuthService.getProfile().then((data) => {
					commit('loginSuccess', data);
					Promise.resolve(data);
				}),
				(error) => {
					commit('logout');
					return Promise.reject(error.response.data.message);
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
