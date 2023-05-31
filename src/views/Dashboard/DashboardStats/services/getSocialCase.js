import { baseAxios } from '../../../../api/baseAxios';

export const getSocialCase = async () => {
	// CANT casos sociales
	const result = await baseAxios.get('/estadisticas/social');
	let socialCase = 0;
	if (result.data[0] && result.data[0].cant) {
		socialCase = result.data[0].cant;
	}
	return socialCase;
};


