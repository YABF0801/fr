import { baseAxios } from '../../../../api/baseAxios';

export const submisionsApiGet = async () => {
	const submisions = await baseAxios.get('/submisions/');
	return submisions.data;
};

export const submisionsApiCreate = async (submision) => {
	try {
	const submisionCreated = await baseAxios.post('/submisions/', submision);
	return submisionCreated.data;
} catch (error) {
	throw new Error(`Error al crear submision: ${error.message}`);
  }
};

export const submisionsApiUpdate = async (submision) => {
	try {
		await baseAxios.put(`/organismos/${submision.id}`, submision);
	} catch (error) {
		throw new Error(`Error al actualizar submision: ${error.message}`);
	}
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
