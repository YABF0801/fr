import { baseAxios } from '../../../../api/baseAxios';

export const getCapacityCperYear = async () => {
	// TOTAL CAPACIDADES CALCULADAS POR AÑO
	const result = await baseAxios.get('/estadisticas/capacidad-c');
	const calculatedCapacity = result.data[0];
	const data = [
		calculatedCapacity.totalCalculatedCapacity2 || 10, // remove numbers
		calculatedCapacity.totalCalculatedCapacity3 || 10,
		calculatedCapacity.totalCalculatedCapacity4 || 10,
		calculatedCapacity.totalCalculatedCapacity5 || 10,
		calculatedCapacity.totalCalculatedCapacity6 || 10,
	];
	return data;
};

