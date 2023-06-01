import { baseAxios } from '../../../../api/baseAxios';

export const getOcupationCount = async () => {
	// CANT padres por ocupacion
	const parentsOcupationCount = await baseAxios.get('/estadisticas/ocupation-count');
	return parentsOcupationCount.data;
};
