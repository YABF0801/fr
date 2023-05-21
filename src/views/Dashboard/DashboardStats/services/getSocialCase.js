import { baseAxios } from '../../../../api/baseAxios';

export const getSocialCase = async () => {
	// CANT casos sociales
	const result = await baseAxios.get('/estadisticas/social');
	const socialCase = result.data[0].cant;
	return socialCase;
};
