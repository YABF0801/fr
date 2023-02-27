import { baseAxios } from '../../../../api/baseAxios';

export const propuestaApiGenerar = async (submision) => {
	const propuestasGeneradas = await baseAxios.post(`/submisions/propuestas`, submision);
	return propuestasGeneradas.data;
};

export const propuestaApiAceptar = async (id, submision) => {
	const propuestas = await baseAxios.put(`/submisions/propuestas/${id}`, submision);
	return propuestas.data;
};

export const propuestaApiRechazar = async (id, submision) => {
	const propuestas = await baseAxios.put(`/submisions/propuestas/${id}`, submision);
	return propuestas.data;
};
