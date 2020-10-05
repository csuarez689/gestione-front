import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

class DataService {
	getAll(endpoint) {
		return axios.get(`${API_URL}/${endpoint}`).then((res) => {
			return res.data;
		});
	}

	getOne(endpoint, id) {
		return axios.get(`${API_URL}/${endpoint}/${id}`).then((res) => {
			return res.data;
		});
	}

	delete(endpoint, id) {
		return axios.delete(`${API_URL}/${endpoint}/${id}`).then((res) => {
			return res.data;
		});
	}

	create(endpoint, data) {
		return axios.post(`${API_URL}/${endpoint}`, data).then((res) => {
			return res.data;
		});
	}

	update(endpoint, data) {
		return axios
			.put(`${API_URL}/${endpoint}/${data.id}`, data)
			.then((res) => {
				return res.data;
			});
	}
}

export default new DataService();
