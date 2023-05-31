import { baseAxios } from '../../../../api/baseAxios';

export const getOtherChildrenInCi = async () => {
	// CANT fammilias que tienen mas de un niño en el circulo
	const result = await baseAxios.get('/estadisticas/other-children');
	let haveOtherChildren = 0;
	if (result.data[0] && result.data[0].cant) {
		haveOtherChildren = result.data[0].cant;
	}
	return haveOtherChildren;
};