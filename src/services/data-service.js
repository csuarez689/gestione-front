import axios from 'axios';
import { authHeader } from '../helpers/auth-header';

const API_URL = process.env.VUE_APP_API_URL;

class DataService {
	getAll(endpoint, params = '') {
		return axios
			.get(`${API_URL}/${endpoint}`, {
				params: params,
				headers: authHeader(),
			})
			.then((res) => {
				return res.data;
			});
	}

	getOne(endpoint, id) {
		return axios
			.get(`${API_URL}/${endpoint}/${id}`, { headers: authHeader() })
			.then((res) => {
				return res.data;
			});
	}

	delete(endpoint, id) {
		return axios
			.delete(`${API_URL}/${endpoint}/${id}`, { headers: authHeader() })
			.then((res) => {
				return res.data;
			});
	}

	create(endpoint, data) {
		return axios
			.post(`${API_URL}/${endpoint}`, data, { headers: authHeader() })
			.then((res) => {
				return res.data;
			});
	}

	update(endpoint, data) {
		return axios
			.put(`${API_URL}/${endpoint}/${data.id}`, data, {
				headers: authHeader(),
			})
			.then((res) => {
				return res.data;
			});
	}

	upload(endpoint, data) {
		return axios
			.post(`${API_URL}/${endpoint}`, data, {
				headers: {
					...authHeader(),
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => {
				return res.data;
			});
	}
}

export default new DataService();
