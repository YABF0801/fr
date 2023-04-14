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

  export const proyeccionApiGet = async () => {
	try {
		await baseAxios.get('/circulos/proyectar', );
		const tools = await baseAxios.get('/submisions/get-tools')
		return tools.data.proyeccionParaGP
		
	} catch (error) {
		throw new Error(`Error ejecutar la proyeccion de matriculas: ${error.message}`);
 }
};

export const cursoApiGet = async () => {
	const tools = await baseAxios.get(`/submisions/get-tools`);
	return tools.data.curso;
};

 export const nuevoCursoApiGet = async () => {
	try {
		await baseAxios.post('/circulos/nuevo-curso', );
	} catch (error) {
		throw new Error(`Error ejecutar el cambio de curso: ${error.message}`);
 }
 };
