import { baseAxios } from '../../../../api/baseAxios';

// obtener posiciones de los circulos para el mapa
export const circulosPositionGet = async () => {
	const circulos = await baseAxios.get('/circulos/');
	return circulos.data;
};