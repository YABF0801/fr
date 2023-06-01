import { baseAxios } from '../../../../api/baseAxios';

export const getSubmisionCountByDate = async () => {
	// CANT solicitues registradas por año y por mes
	const submisionsByDate = await baseAxios.get('/estadisticas/date-count');
	return submisionsByDate.data;
};