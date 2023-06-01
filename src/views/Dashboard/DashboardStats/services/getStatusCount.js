import { baseAxios } from '../../../../api/baseAxios';

export const getStatusCount = async () => {
	// CANT planillas por status
	const result = await baseAxios.get('/estadisticas/status-count');
	const submisionsByStatus = result.data;
	const data = [submisionsByStatus.pendiente || 0, submisionsByStatus.matricula || 0, submisionsByStatus.baja || 0];
	return data;
};
