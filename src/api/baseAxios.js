import axios from 'axios';

export const baseAxios = axios.create({
	/* baseURL: 'http://localhost:8000/api/v1', */
	baseURL: 'http://localhost:5000/api/v1',
});




baseAxios.interceptors.request.use(config => {
	const auth = localStorage.getItem('MY_AUTH_APP_1');

	if (auth) {
		const { token } = JSON.parse(auth)
		config.headers.authorization = `Bearer ${token}`;
		return config;
	}
	return config;
});