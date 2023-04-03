import { baseAxios } from '../../../../api/baseAxios';

export const circulosApiGet = async () => {
	const circulos = await baseAxios.get('/circulos/');
	return circulos.data;
};

export const circulosApiCreate = async (circulo) => {
	try {
	const circuloCreated = await baseAxios.post('/circulos', circulo);
	return circuloCreated.data;
} catch (error) {
	throw new Error(`Error al crear circulo: ${error.message}`);
  }
};

export const circulosApiUpdate = async (circulo) => {
	try {
		await baseAxios.put(`/circulos/${circulo._id}`, circulo);
	} catch (error) {
	  throw new Error(`Error al actualizar circulo: ${error.message}`);
	}
  };

export const circulosApiFindById = async (id) => {
	const circuloFind = await baseAxios.get(`/circulos/${id}`);
	return circuloFind.data;
};

export const circulosApiDelete = async (id) => {
	await baseAxios.delete(`/circulos/${id}`);
};

export const circulosApiStatus = async (id) => {
	try {
		await baseAxios.put(`/circulos/status/${id}`);
	} catch (error) {
	  throw new Error(`Error al cambiar estado del circulo : ${error.message}`);
	}
  };
  

