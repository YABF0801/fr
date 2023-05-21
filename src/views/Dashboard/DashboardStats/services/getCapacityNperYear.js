import { baseAxios } from '../../../../api/baseAxios';

export const getCapacityNperYear = async () => {
	// TOTAL CAPACIDADES NORMADAS POR AÑO
	const result = await baseAxios.get('/estadisticas/capacidad-n');
	const capacityNYear = result.data[0];
	const data = [
		capacityNYear.totalNormedCapacity2,
		capacityNYear.totalNormedCapacity3,
		capacityNYear.totalNormedCapacity4,
		capacityNYear.totalNormedCapacity5,
		capacityNYear.totalNormedCapacity6,
	];
	return data;
};