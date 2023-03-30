import { baseAxios } from '../../../../api/baseAxios';

export const submisionsPositionGet = async () => {
	const allSubmisions = await baseAxios.get('/submisions');
	const submisions = allSubmisions.data.filter(submision => submision.status === 'matricula')
	return submisions;
};

export const circulosPositionGet = async () => {
		const circulos = await baseAxios.get('/circulos/');
		return circulos.data;
	};
	

export const userApiLogout = async () => {
	const userLoggedOut = await baseAxios.get(`/users/logout`);
	return userLoggedOut.data; // ?
};

// CIRCULOS
export const getMatriculaPerYear = async () => {   // TOTAL MATRICULA POR AÑO
	const result = await baseAxios.get('/estadisticas/matricula');
	const matriculaYear = result.data[0];
	const data = [
		matriculaYear.totalMatricula2, 
		matriculaYear.totalMatricula3,
		matriculaYear.totalMatricula4,
		matriculaYear.totalMatricula5,
		matriculaYear.totalMatricula6]
		console.log(matriculaYear)
		return data;
};

export const getCapacityCperYear = async () => {   // TOTAL CAPACIDADES CALCULADAS POR AÑO
	const capacityCYear = await baseAxios.get('/estadisticas/capacidad-c');
	const capacidadCYear = capacityCYear.data;
	return capacidadCYear;
};

export const getCapacityNperYear = async () => {   // TOTAL CAPACIDADES NORMADAS POR AÑO 
	const result = await baseAxios.get('/estadisticas/capacidad-n');
	const capacityNYear = result.data[0];
	const data = [
		capacityNYear.totalNormedCapacity2, 
		capacityNYear.totalNormedCapacity3,
		capacityNYear.totalNormedCapacity4,
		capacityNYear.totalNormedCapacity5,
		capacityNYear.totalNormedCapacity6]
		console.log(capacityNYear)
		return data;
};

export const getAverageAttendance = async () => {
	  const result = await baseAxios.get('/estadisticas/asistencia');
	  const attendanceData = result.data[0]; 
	  const data = [
			  attendanceData.totalAttendance2 || 50, // remove numbers
			  attendanceData.totalAttendance3 || 25,
			  attendanceData.totalAttendance4 || 80,
			  attendanceData.totalAttendance5 || 10,
			  attendanceData.totalAttendance6 || 100,
			]
	  return data;
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
