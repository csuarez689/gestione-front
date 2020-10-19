import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

const API_URL = 'http://localhost:8000/api/auth';

class AuthService {
	login(credentials) {
		return axios.post(`${API_URL}/login`, credentials).then((res) => {
			return res.data;
		});
	}

	refresh() {
		return axios
			.post(`${API_URL}/refresh`, null, { headers: authHeader() })
			.then((res) => {
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

	forgotPassword(email) {
		return axios.post(`${API_URL}/forgot_password`, email).then((res) => {
			return res;
		});
	}

	resetPassword(data) {
		return axios.post(`${API_URL}/reset_password`, data).then((res) => {
			return res;
		});
	}
}

export default new AuthService();
