import { baseAxios } from '../../../../api/baseAxios';

	export const getTotalBoysPerYear = async () => {
		//  TOTAL NIÑOS POR AÑO
		const result = await baseAxios.get('/estadisticas/boys');
		const totalBoysYear = result.data;
		const data = [
			totalBoysYear.totalBoys2,
			totalBoysYear.totalBoys3,
			totalBoysYear.totalBoys4,
			totalBoysYear.totalBoys5,
			totalBoysYear.totalBoys6,
		];
		return data;
	};