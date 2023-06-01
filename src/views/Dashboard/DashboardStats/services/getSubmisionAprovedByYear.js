import { baseAxios } from '../../../../api/baseAxios';

export const getSubmisionAprovedByYear = async () => {
	// CANT matriculas aprobadas por año
	const aprovedByYear = await baseAxios.get('/estadisticas/aprove-count');
	return aprovedByYear.data;
};