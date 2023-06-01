import { baseAxios } from '../../../../api/baseAxios';

export const getStatusCount = async () => {
	// CANT planillas por status
	const result = await baseAxios.get('/estadisticas/status-count');
	return result.data;
};
