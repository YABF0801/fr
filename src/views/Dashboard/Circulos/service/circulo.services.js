import { baseAxios } from '../../../../api/baseAxios';

export const circulosApiGet = async () => {
	const circulos = await baseAxios.get('/circulos/');
	return circulos.data;
};

export const circulosApiCreate = async (circulo) => {
	const circuloCreated = await baseAxios.post('/circulos/', circulo);
	return circuloCreated.data;
};

export const circulosApiUpdate = async (circulo) => {
	const circuloUpdated = await baseAxios.put(`/circulos/${circulo.id}`, circulo);
	return circuloUpdated.data;
};

export const circulosApiFindById = async (id) => {
	const circuloFind = await baseAxios.get(`/circulos/${id}`);
	return circuloFind.data;
};

export const circulosApiDelete = async (id) => {
	await baseAxios.delete(`/circulos/${id}`);
	
};


