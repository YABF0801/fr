import { baseAxios } from '../../../../api/baseAxios';

export const getMatriculaPerYear = async () => {
	// TOTAL MATRICULA POR AÑO
	const result = await baseAxios.get('/estadisticas/matricula');
	const matriculaYear = result.data[0];
	const data = [
		matriculaYear.totalMatricula2,
		matriculaYear.totalMatricula3,
		matriculaYear.totalMatricula4,
		matriculaYear.totalMatricula5,
		matriculaYear.totalMatricula6,
	];
	return data;
};
