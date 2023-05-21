import { baseAxios } from '../../../../api/baseAxios';

export const getSubmisionAprovedByYear = async () => {
	// CANT matriculas aprobadas por año
	const result = await baseAxios.get('/estadisticas/aprove-count');
	const aprovedByYear = result.data;
	return aprovedByYear;
};