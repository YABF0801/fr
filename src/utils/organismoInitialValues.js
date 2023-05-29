export const organismoInitialValues = (organismo) => {
	const initialValues = {
		name: organismo ? organismo.name : '',
		description: organismo ? organismo.description : '',
		priorizado: organismo ? organismo.priorizado : false,
	};
	return initialValues;
};
