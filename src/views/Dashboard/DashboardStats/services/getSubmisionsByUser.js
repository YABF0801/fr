import { baseAxios } from '../../../../api/baseAxios';

export const getSubmisionsByUser = async () => {
	// CANT planillas creadas por usuario
	const submisionsByUser = await baseAxios.get('/estadisticas/user-count');
	return submisionsByUser.data;
};
