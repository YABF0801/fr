import { baseAxios } from '../../../../api/baseAxios';

export const getMatriculaPorCp = async () => {
	// CANT  matricula cpor consejo popular
	const result = await baseAxios.get('/estadisticas/m-cpopular');
	const matriculaPerCp = result.data;
	const labels = matriculaPerCp.map((d) => d._id);
	const cant = matriculaPerCp.map((d) => d.cant);
	const data = {
		labels,
		cant,
	};
	console.log(data);
	return data;
};