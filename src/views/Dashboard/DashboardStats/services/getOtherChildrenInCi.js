import { baseAxios } from '../../../../api/baseAxios';

export const getOtherChildrenInCi = async () => {
	// CANT fammilias que tienen mas de un niño en el circulo
	const result = await baseAxios.get('/estadisticas/other-children');
	const haveOtherChildren = result.data[0].cant;
	return haveOtherChildren;
};