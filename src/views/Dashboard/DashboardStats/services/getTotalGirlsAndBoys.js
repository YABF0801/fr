import { baseAxios } from '../../../../api/baseAxios';

export const getTotalGirlsAndBoys = async () => {
	//  TOTAL NIÑOS
	const totalBoysGirls = await baseAxios.get('/estadisticas/boys-girls');
	return totalBoysGirls.data;
};
