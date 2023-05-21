import { baseAxios } from '../../../../api/baseAxios';

// obtener posiciones de los niños para el mapa
export const submisionsPositionGet = async () => {
	const allSubmisions = await baseAxios.get('/submisions');
	const submisions = allSubmisions.data.filter((submision) => submision.status === 'matricula');
	return submisions;
};

