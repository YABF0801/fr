import { baseAxios } from '../../../../api/baseAxios';

export const getSubmisionCountByDate = async () => {
	// CANT solicitues registradas por año y por mes
	const result = await baseAxios.get('/estadisticas/date-count');
	const submisionsByDate = result.data;
	return submisionsByDate;
};