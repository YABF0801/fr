import { baseAxios } from '../../../../api/baseAxios';

export const propuestasApiGet = async () => {
	const allPropuestas = await baseAxios.get('/submisions');
	const propuestas = allPropuestas.data.filter(submision => submision.status === 'propuesta')
	return propuestas;
};

export const propuestaApiGenerar = async (submision) => {
	const propuestasGeneradas = await baseAxios.post(`/submisions/propuestas`, submision);
	return propuestasGeneradas.data;
};

export const propuestaApiAceptar = async (submision) => {
	const propuestas = await baseAxios.put(`/submisions/propuestas/${submision.id}`, submision);
	return propuestas.data;
};

export const propuestaApiRechazar = async (submision) => {
	const propuestas = await baseAxios.put(`/submisions/propuestas/${submision.id}`, submision);
	return propuestas.data;
};
