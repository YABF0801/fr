import { baseAxios } from '../../../../api/baseAxios';

export const organismosApiGet = async () => {
	const organismos = await baseAxios.get('/organismos/');
	return organismos.data;
};

export const organismosApiCreate = async (organismo) => {
	const organismoCreated = await baseAxios.post('/organismos/', organismo);
	return organismoCreated.data;
};

export const organismosApiUpdate = async (organismo) => {
	const organismoUpdated = await baseAxios.put(`/organismos/${organismo.id}`, organismo); 
	return organismoUpdated.data;
};

export const organismosApiDelete = async (id) => {
	await baseAxios.delete(`/organismos/${id}`);
};

export const organismosApiFindById = async (id) => {
	const organismoFind = await baseAxios.get(`/organismos/${id}`);
	return organismoFind.data;
};