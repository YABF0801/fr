
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
  

  // export const validateInputPhone = (value) => {
// 	if (value === undefined) return false;
// 	return /\(\d{2}\) (\d{4,5})-\d{4}/.test(value);
// };

// export const validateNumber = (value) => {
// 	if (value === undefined) return false;
  
// 	// lógica de validación para el número

// 	// número debe ser mayor que 10
// 	return parseInt(value, 10) > 10;
//   }


// {form.errors.description && form.touched.description ? (
// 	<p className='text-danger'>{form.errors.description}</p>
// ) : null}

// {form.errors.name && form.touched.name ? <p className='text-danger'>{form.errors.name}</p> : null}
								