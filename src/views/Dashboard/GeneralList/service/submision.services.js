import { baseAxios } from '../../../../api/baseAxios';

export const submisionsApiGet = async () => {
	const submisions = await baseAxios.get('/submisions/');
	return submisions.data;
};

export const submisionsApiCreate = async (submision) => {
	const submisionCreated = await baseAxios.post('/submisions/', submision);
	return submisionCreated.data;
};

export const submisionsApiUpdate = async (submision) => {
	const submisionUpdated = await baseAxios.put(`/submisions/${submision.id}`, submision);
	return submisionUpdated.data;
};

export const submisionsApiDelete = async (id) => {
	await baseAxios.delete(`/submisions/${id}`);
};

export const submisionsApiFindById = async (id) => {
	const submision = await baseAxios.get(`/submisions/${id}`);
	return submision.data;
};

export const submisionsApiBaja = async (submision) => {
	const response = await baseAxios.put(`/submisions/${submision.id}`, submision);
	return response.data;
};
