import { baseAxios } from '../../../../api/baseAxios';

	export const getTotalBoysPerYear = async () => {
		//  TOTAL NIÑOS POR AÑO
		const result = await baseAxios.get('/estadisticas/boys');
		const totalBoysYear = result.data;
		const data = [
			totalBoysYear.totalBoys2 || 0,
			totalBoysYear.totalBoys3 || 0,
			totalBoysYear.totalBoys4 || 0,
			totalBoysYear.totalBoys5 || 0,
			totalBoysYear.totalBoys6 || 0,
		];
		return data;
	};