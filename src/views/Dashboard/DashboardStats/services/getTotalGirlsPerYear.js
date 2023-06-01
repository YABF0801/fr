import { baseAxios } from '../../../../api/baseAxios';

export const getTotalGirlsPerYear = async () => {
	//  TOTAL NIÑAS POR AÑO
	const result = await baseAxios.get('/estadisticas/girls');
	const totalGirlsYear = result.data[0];
	const data = [
		totalGirlsYear.totalGirls2,
		totalGirlsYear.totalGirls3,
		totalGirlsYear.totalGirls4,
		totalGirlsYear.totalGirls5,
		totalGirlsYear.totalGirls6,
	];
	return data;
};
