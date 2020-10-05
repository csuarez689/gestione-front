import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

const API_URL = 'http://localhost:8000/api/auth';

class AuthService {
	login(credentials) {
		return axios.post(`${API_URL}/login`, credentials).then((res) => {
			localStorage.setItem('user', JSON.stringify(res.data.user));
			localStorage.setItem('token', res.data.access_token);
			return res.data;
		});
	}

	logout() {
		return axios
			.post(`${API_URL}/logout`, null, { headers: authHeader() })
			.then((res) => {
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				return res.data;
			});
	}

	refresh() {
		return axios
			.post(`${API_URL}/refresh`, null, { headers: authHeader() })
			.then((res) => {
				localStorage.setItem('token', res.data.access_token);
				axios.defaults.headers.common[
					'Authorization'
				] = `Bearer ${res.data.access_token}`;
				return res.data;
			});
	}

	getProfile() {
		return axios
			.get(`${API_URL}/profile`, { headers: authHeader() })
			.then((res) => {
				return res.data;
			});
	}
}

export default new AuthService();
