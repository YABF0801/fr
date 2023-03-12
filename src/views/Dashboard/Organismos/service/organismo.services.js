import { baseAxios } from '../../../../api/baseAxios';

export const organismosApiGet = async () => {
	const organismos = await baseAxios.get('/organismos/');
	return organismos.data;
};

export const organismosApiCreate = async (organismo) => {
	try {
	const organismoCreated = await baseAxios.post('/organismos', organismo);
	return organismoCreated.data;
} catch (error) {
	throw new Error(`Error al crear organismo: ${error.message}`);
  }
};

export const organismosApiUpdate = async (organismo) => {
	try {
	  await baseAxios.put(`/organismos/${organismo._id}`, organismo);
	} catch (error) {
	  throw new Error(`Error al actualizar organismo: ${error.message}`);
	}
  };


export const organismosApiDelete = async (id) => {
	await baseAxios.delete(`/organismos/${id}`);
};

export const organismosApiFindById = async (id) => {
	const organismoFind = await baseAxios.get(`/organismos/${id}`);
	return organismoFind.data;
};