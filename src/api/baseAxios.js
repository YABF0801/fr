import axios from 'axios';

export const baseAxios = axios.create({
	/* baseURL: 'http://localhost:8000/api/v1', */
	baseURL: 'http://localhost:5000/api/v1',
});




baseAxios.interceptors.request.use(config => {
	const { token } = JSON.parse(localStorage.getItem('MY_AUTH_APP_1'));
	if (token) {
		config.headers.authorization = `Bearer ${token}`;
	}
	return config;
});