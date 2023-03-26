import { baseAxios } from '../../../../api/baseAxios';

export const userApiLogout = async () => {
	const userLoggedOut = await baseAxios.get(`/users/logout`);
	return userLoggedOut.data; // ?
};

// CIRCULOS
export const getMatriculaPerYear = async () => {   // TOTAL MATRICULA POR AÑO
	const totalMatriculaYear = await baseAxios.get('/estadisticas/matricula');
	const matriculaYear = totalMatriculaYear.data;
	return matriculaYear;
};

export const getCapacityCperYear = async () => {   // TOTAL CAPACIDADES CALCULADAS POR AÑO
	const capacityCYear = await baseAxios.get('/estadisticas/capacidad-c');
	const capacidadCYear = capacityCYear.data;
	return capacidadCYear;
};

export const getCapacityNperYear = async () => {   // TOTAL CAPACIDADES NORMADAS POR AÑO 
	const capacityNYear = await baseAxios.get('/estadisticas/capacidad-n');
	const capacidadNYear = capacityNYear.data;
	return capacidadNYear;
};

export const getAverageAttendance = async () => {   //  PROMEDIOS DE ASISTENCIA POR AÑO 
	const avgAttendanceYear = await baseAxios.get('/estadisticas/asistencia');
	const asistenciaAvgYear = avgAttendanceYear.data;
	return asistenciaAvgYear;
};

export const getTotalGirlsPerYear = async () => {   //  TOTAL NIÑAS POR AÑO
	const totalGirlsYear = await baseAxios.get('/estadisticas/girls');
	const girlsYear = totalGirlsYear.data;
	return girlsYear;
};

export const getTotalBoysPerYear = async () => {   //  TOTAL NIÑOS POR AÑO
	const totalBoysYear = await baseAxios.get('/estadisticas/boys');
	const boysYear = totalBoysYear.data;
	return boysYear;
};

export const getTotalGirlsAndBoys = async () => {   //  TOTAL NIÑOS POR AÑO
	const totalBoysGirls = await baseAxios.get('/estadisticas/boys-girls');
	const boysAdnGirls = totalBoysGirls.data;
	return boysAdnGirls;
};

export const getCapacityAndMatricula = async () => {   //  TOTALES GENERALES CAPACIDAD NORMADA Y MATRICULA
	const capacityMatricula = await baseAxios.get('/estadisticas/cap-mat');
	const capacidadMatricula = capacityMatricula.data;
	return capacidadMatricula;
};


//  SUBMISIONS
export const getTotalChildrenPerAge = async () => {   // CANT niños por edades
	const totalChildrenPerAge = await baseAxios.get('/estadisticas/childs-age');
	const childrenPerAge = totalChildrenPerAge.data;
	return childrenPerAge;
};

export const getTotalChildrenPerYear = async () => {   // CANT niños por año de vida
	const totalChildrenPerYear = await baseAxios.get('/estadisticas/childs-year');
	const childrenPerYear = totalChildrenPerYear.data;
	return childrenPerYear;
};

export const getMatriculaPorCp = async () => {   // CANT  matricula cpor consejo popular
	const totalMatriculaPerCp = await baseAxios.get('/estadisticas/m-cpopular');
	const matriculaPerCp = totalMatriculaPerCp.data;
	return matriculaPerCp;
};

export const getSocialCase = async () => {   // CANT casos sociales
	const totalSocialCase = await baseAxios.get('/estadisticas/social');
	const socialCase = totalSocialCase.data;
	return socialCase;
};

export const getStatusCount = async () => {   // CANT planillas por status
	const submisionsStatusCount = await baseAxios.get('/estadisticas/status-count');
	const submisionsByStatus = submisionsStatusCount.data;
	return submisionsByStatus;
};

export const getOcupationCount = async () => {   // CANT padres por ocupacion
	const parentsOcupationCount = await baseAxios.get('/estadisticas/ocupation-count');
	const parentsByOcupation = parentsOcupationCount.data;
	return parentsByOcupation;
};

//
export const getOtherChildrenInCi = async () => {   // CANT fammilias que tienen mas de un niño en el circulo 
	const otherChildren = await baseAxios.get('/estadisticas/other-children');
	const haveOtherChildren = otherChildren.data;
	return haveOtherChildren;
};

export const getSubmisionCountByDate = async () => {   // CANT solicitues registradas por año y por mes
	const submisionsCountByDate = await baseAxios.get('/estadisticas/date-count');
	const submisionsByDate = submisionsCountByDate.data;
	return submisionsByDate;
};

export const getSubmisionAprovedByYear = async () => {   // CANT matriculas aprobadas por año
	const submisionAprovedByYear = await baseAxios.get('/estadisticas/aprove-count');
	const aprovedByYear = submisionAprovedByYear.data;
	return aprovedByYear;
};


export const getSubmisionsByUser = async () => {   // CANT planillas creadas por usuario
	const submisionsCreatedByUser = await baseAxios.get('/estadisticas/user-count');
	const submisionsByUser = submisionsCreatedByUser.data;
	return submisionsByUser;
};
