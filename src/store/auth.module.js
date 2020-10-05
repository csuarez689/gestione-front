import AuthService from '../services/auth-service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
	? { status: { loggedIn: true }, user }
	: { status: { loggedIn: false }, user: null };

export const auth = {
	namespaced: true,
	state: initialState,

	actions: {
		login({ commit }, credentials) {
			return AuthService.login(credentials).then(
				(data) => {
					commit('loginSuccess', data.user);
					return Promise.resolve(data);
				},
				(error) => {
					commit('loginFailure');
					let message =
						error.response.status == 401
							? 'Credenciales invalidas.'
							: 'Ha ocurrido un error.';
					return Promise.reject(message);
				}
			);
		},

		logout({ commit }) {
			return AuthService.logout().then(
				(data) => {
					commit('logout');
					return Promise.resolve(data.message);
				},
				(error) => {
					Promise.reject(error.response.data.message);
				}
			);
		},
	},

	mutations: {
		loginSuccess(state, user) {
			state.status.loggedIn = true;
			state.user = user;
		},

		loginFailure(state) {
			state.status.loggedIn = false;
			state.user = null;
		},

		logout(state) {
			state.status.loggedIn = false;
			state.user = null;
		},
	},

	getters: {
		redirectUrl: (state) => {
			if (state.status.loggedIn) {
				return state.user.isAdmin ? '/users' : '/teachingPlant';
			}
			return '/login';
		},
		userFullName: (state) => {
			return `${state.user.name} ${state.user.last_name}`;
		},
	},
};
