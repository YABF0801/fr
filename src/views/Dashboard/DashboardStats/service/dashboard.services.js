import { baseAxios } from '../../../../api/baseAxios';

export const userApiLogout = async () => {
	const userLoggedOut = await baseAxios.get(`/users/logout`);
	return userLoggedOut.data; // ?
};

export const submisionsPositionGet = async () => {
	const allSubmisions = await baseAxios.get('/submisions');
	const submisions = allSubmisions.data.filter(submision => submision.status === 'matricula')
	return submisions;
};

export const circulosPositionGet = async () => {
		const circulos = await baseAxios.get('/circulos/');
		return circulos.data;
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
		return data;
};


export const getCapacityCperYear = async () => {   // TOTAL CAPACIDADES CALCULADAS POR AÑO
	const result = await baseAxios.get('/estadisticas/capacidad-c');
	const calculatedCapacity = result.data[0];
	const data = [
		calculatedCapacity.totalCalculatedCapacity2|| 10, // remove numbers
		calculatedCapacity.totalCalculatedCapacity3|| 10,
		calculatedCapacity.totalCalculatedCapacity4|| 10,
		calculatedCapacity.totalCalculatedCapacity5|| 10,
		calculatedCapacity.totalCalculatedCapacity6|| 10]
		return data;
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
	const result = await baseAxios.get('/estadisticas/girls');
	const totalGirlsYear = result.data[0]; 
	const data = [
			totalGirlsYear.totalGirls2 , 
			totalGirlsYear.totalGirls3 ,
			totalGirlsYear.totalGirls4 ,
			totalGirlsYear.totalGirls5 ,
			totalGirlsYear.totalGirls6 ,
		  ]
	return data;
};

export const getTotalBoysPerYear = async () => {   //  TOTAL NIÑOS POR AÑO
	const result = await baseAxios.get('/estadisticas/boys');
	const totalBoysYear = result.data; 
	const data = [
			totalBoysYear.totalBoys2 , 
			totalBoysYear.totalBoys3 ,
			totalBoysYear.totalBoys4 ,
			totalBoysYear.totalBoys5 ,
			totalBoysYear.totalBoys6 ,
		  ]
	return data;
};

export const getCapacityAndMatricula = async () => {   //  TOTALES GENERALES CAPACIDAD NORMADA Y MATRICULA
	const capacityMatricula = await baseAxios.get('/estadisticas/cap-mat');
	const capacidadMatricula = capacityMatricula.data;
	return capacidadMatricula;
};

export const getTotalGirlsAndBoys = async () => {   //  TOTAL NIÑOS POR AÑO
	const totalBoysGirls = await baseAxios.get('/estadisticas/boys-girls');
	const boysAdnGirls = totalBoysGirls.data;
	return boysAdnGirls;
};

export const getTotalChildrenPerAge = async () => {   // CANT niños por edades
	const result = await baseAxios.get('/estadisticas/childs-age');
	const totalChildrenPerAge = result.data; 
	const data = [
			totalChildrenPerAge.childs_age0 || 0, 
			totalChildrenPerAge.childs_age1 || 0,
			totalChildrenPerAge.childs_age2 || 0,
			totalChildrenPerAge.childs_age3 || 0,
			totalChildrenPerAge.childs_age4 || 0,
			totalChildrenPerAge.childs_age5 || 0,
		  ]
	return data;
};

export const getSocialCase = async () => {   // CANT casos sociales
	const result = await baseAxios.get('/estadisticas/social');
	const socialCase = result.data[0].cant || 0;
	return socialCase;
};

export const getOtherChildrenInCi = async () => {   // CANT fammilias que tienen mas de un niño en el circulo 
	const result = await baseAxios.get('/estadisticas/other-children');
	const haveOtherChildren = result.data[0].cant;
	return haveOtherChildren;
	};

export const getStatusCount = async () => {   // CANT planillas por status
	const result = await baseAxios.get('/estadisticas/status-count');
	const submisionsByStatus = result.data; 
	const data = [
			submisionsByStatus.pendiente || 0, 
			submisionsByStatus.matricula || 0,
			submisionsByStatus.baja || 0,
		  ]
	return data;
	};


	export const getSubmisionCountByDate = async () => {   // CANT solicitues registradas por año y por mes
		const result = await baseAxios.get('/estadisticas/date-count');
		const submisionsByDate = result.data;
		return submisionsByDate;
	};

		export const getSubmisionAprovedByYear = async () => {   // CANT matriculas aprobadas por año
		const result = await baseAxios.get('/estadisticas/aprove-count');
		const aprovedByYear = result.data;
		return aprovedByYear;
	};
	
export const getMatriculaPorCp = async () => {   // CANT  matricula cpor consejo popular
	const result = await baseAxios.get('/estadisticas/m-cpopular');
	const matriculaPerCp = result.data;
    const labels = matriculaPerCp.map((d) => d._id);
    const cant = matriculaPerCp.map((d) => d.cant);
	const data = {
		labels, cant
	};
	console.log(data)
	return data;
};




export const getOcupationCount = async () => {   // CANT padres por ocupacion
	const parentsOcupationCount = await baseAxios.get('/estadisticas/ocupation-count');
	const parentsByOcupation = parentsOcupationCount.data;
	return parentsByOcupation;
};

export const getSubmisionsByUser = async () => {   // CANT planillas creadas por usuario
	const submisionsCreatedByUser = await baseAxios.get('/estadisticas/user-count');
	const submisionsByUser = submisionsCreatedByUser.data;
	return submisionsByUser;
};

export const getRandomColor = () => {
    const colors = ['rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)','rgba(185, 149, 162, 0.6)','rgba(123, 122, 225, 0.6)','rgba(54, 162, 235, 0.6)',];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

