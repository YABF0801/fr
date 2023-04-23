import axios from 'axios';

export const baseAxios = axios.create({
	/* baseURL: 'http://localhost:8000/api/v1', */
	baseURL: 'http://127.0.0.1:5000/api/v1',
});
