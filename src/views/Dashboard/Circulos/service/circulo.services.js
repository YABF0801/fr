import { baseAxios } from '../../../../api/baseAxios';

export const circulosApiGet = async () => {
	const circulos = await baseAxios.get('/circulos/find/');
	return circulos.data;
};

export const circulosApiCreate = async (circulo) => {
	const circuloCreated = await baseAxios.post('/circulos/new/', circulo);
	return circuloCreated.data;
};

export const circulosApiUpdate = async (circulo) => {
	await baseAxios.put(`/circulos/update/${circulo.id}`, {
		...circulo
	})
};

// esto es necesario ?
export const circulosApiFindById = async (id) => {
	const circuloFind = await baseAxios.get(`/circulos/find/${id}`);
	return circuloFind.data;
};

export const circulosApiDelete = async (id) => {
	await baseAxios.delete(`/circulos/${id}`);

	
};


