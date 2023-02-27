import { baseAxios } from '../../../../api/baseAxios';

export const organismosApiGet = async () => {
	const organismos = await baseAxios.get('/organismos/find/');
	return organismos.data;
};

export const organismosApiCreate = async (organismo) => {
	const organismoCreated = await baseAxios.post('/organismos/new/', organismo);
	return organismoCreated.data;
};

export const organismosApiUpdate = async (organismo) => {
	const organismoUpdated = await baseAxios.put(`/organismos/update/${organismo.id}`, organismo); // ${organismo.id} ?
	return organismoUpdated.data;
};

export const organismosApiDelete = async (id) => {

	await baseAxios.delete(`/organismos/${id}`);
};
