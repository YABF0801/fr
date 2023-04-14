import  {baseAxios}  from '../../../../api/baseAxios';

export const submisionsApiGet = async () => {
	const allSubmisions = await baseAxios.get('/submisions');
	const submisions = allSubmisions.data.filter(submision => submision.status !== 'propuesta')
	return submisions;
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
		await baseAxios.put(`/submisions/${submision.id}`, submision);
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

export const consecustiveApiGet = async () => {
	const tools = await baseAxios.get(`/submisions/get-tools`);
	return tools.data.consecutive;
};

export const consecustiveApiReset= async () => {
	try {
		await baseAxios.put(`/submisions/reset-consecutive`);
	} catch (error) {
		throw new Error(`Error al resetear consecutivo: ${error.message}`);
	}
};


export const submisionsApiBaja = async (id) => {
	try {
		await baseAxios.put(`/submisions/baja/${id}`);
	} catch (error) {
	  throw new Error(`Error al dar baja : ${error.message}`);
	}
  };
  

