import { baseAxios } from '../../../../api/baseAxios';

export const getTotalGirlsPerYear = async () => {
	//  TOTAL NIÑAS POR AÑO
	const result = await baseAxios.get('/estadisticas/girls');
	const totalGirlsYear = result.data[0];
	const data = [
		totalGirlsYear.totalGirls2 || 0,
		totalGirlsYear.totalGirls3 || 0,
		totalGirlsYear.totalGirls4 || 0,
		totalGirlsYear.totalGirls5 || 0,
		totalGirlsYear.totalGirls6 || 0,
	];
	return data;
};
