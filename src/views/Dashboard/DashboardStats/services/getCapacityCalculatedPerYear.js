import { baseAxios } from '../../../../api/baseAxios';

export const getCapacityCperYear = async () => {
	// TOTAL CAPACIDADES CALCULADAS POR AÑO
	const result = await baseAxios.get('/estadisticas/capacidad-c');
	const calculatedCapacity = result.data[0];
	const data = [
		calculatedCapacity.totalCalculatedCapacity2 , 
		calculatedCapacity.totalCalculatedCapacity3 ,
		calculatedCapacity.totalCalculatedCapacity4 ,
		calculatedCapacity.totalCalculatedCapacity5 ,
		calculatedCapacity.totalCalculatedCapacity6 ,
	];
	return data;
};

