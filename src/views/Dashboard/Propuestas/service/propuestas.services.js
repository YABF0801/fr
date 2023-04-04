import { baseAxios } from '../../../../api/baseAxios';

export const propuestasApiGet = async () => {
	const allPropuestas = await baseAxios.get('/submisions');
	const propuestas = allPropuestas.data.filter(submision => submision.status === 'propuesta')
	return propuestas;
};

export const propuestaApiGenerar = async () => {
    try {
        await baseAxios.post(`/propuestas/generar`);
    } catch (error) {
        throw new Error(`Error al generar las propuestas : ${error.message}`);
    }
};

export const propuestaApiAceptar = async (submision) => { // pasarle un arreglo 
	const propuestas = await baseAxios.put(`/propuestas/aceptar`, submision);
	return propuestas.data;
};

export const propuestaApiRechazar = async (submision) => {
	const propuestas = await baseAxios.put(`/propuestas/rechazar`, submision);
	return propuestas.data;
};
