
export const validateStringMin2 = (value) => {
	if (value === undefined) return false;
	return /[a-zA-Z\d]{2,}/.test(value);
};
 
export const validateStringMin5 = (value) => {
	if (value === undefined) return false;
	return /[a-zA-Z\d]{5,}/.test(value);
};

export const validateRole = (value) => {
    if (value === undefined) return false;
      return /^(admin|guest)$/.test(value);
  };

  export const validateCirculoType = (value) => {
    if (value === undefined) return false;
      return /^(urbano|rural)$/.test(value);
  };
  
  export const validatePassword = (value) => {
	if (value === undefined) return false;
	return  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value); 
};

export const validateAttendance = (value) => {
	if (value === undefined) return false;
	const parsedValue = parseInt(value, 10);
	return !isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100;
  }

  export const naturalNumber = (value) => {
	if (value === undefined) return false;
	const parsedValue = parseInt(value, 10);
	return !isNaN(parsedValue) && parsedValue > 0;
  }
  
  export const validateSubmisionType = (value) => {
    if (value === undefined) return false;
      return /^(new|traslado)$/.test(value);
  };

  export const validateSubmisionFinality = (value) => {
    if (value === undefined) return false;
      return /^(om|os)$/.test(value);
  };

  export const validateSubmisionStatus = (value) => {
    if (value === undefined) return false;
      return /^(pendiente|matricula|baja|propuesta)$/.test(value);
  };

  export const validateCarnet = (value) => {
	if (value === undefined) return false;
	return /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{5}$/.test(value);
  };

 
  export const validateYearOfLife = (value) => {
	if (value === undefined ) return false;
	const parsedValue = parseInt(value, 10);
	return !isNaN(parsedValue) && parsedValue >= 2 && parsedValue <= 6;
  };

  export const validateParentType = (value) => {
    if (value === undefined) return false;
      return /^(madre|padre|tutor)$/.test(value);
  };

  export const validateParentOcupation = (value) => {
    if (value === undefined) return false;
      return /^(trabajador|jubilado|asistenciado|estudiante)$/.test(value);
  };

  
