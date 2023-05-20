import { baseAxios } from '../../../../api/baseAxios';

export const getMatriculaPerYear = async () => {
	// TOTAL MATRICULA POR AÑO
	const result = await baseAxios.get('/estadisticas/matricula');
	const matriculaYear = result.data[0];
	const data = [
		matriculaYear.totalMatricula2 || 0,
		matriculaYear.totalMatricula3 || 0,
		matriculaYear.totalMatricula4 || 0,
		matriculaYear.totalMatricula5 || 0,
		matriculaYear.totalMatricula6 || 0,
	];
	return data;
};
