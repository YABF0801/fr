import { baseAxios } from '../../../../api/baseAxios';

export const getSubmisionsByUser = async () => {
	// CANT planillas creadas por usuario
	const submisionsCreatedByUser = await baseAxios.get('/estadisticas/user-count');
	const submisionsByUser = submisionsCreatedByUser.data;
	return submisionsByUser;
};
