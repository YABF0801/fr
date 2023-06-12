import { baseAxios } from '../../../../api/baseAxios';

export const getFinality = async () => {
	const response = await baseAxios.get('/submisions/enums');
	return response.data.finalityEnum;
};

export const getSubmisiontype = async () => {
	const response = await baseAxios.get('/submisions/enums');
	return response.data.submisiontypeEnum;
};

export const getSubmisionStatus = async () => {
	const response = await baseAxios.get('/submisions/enums');
	return response.data.statusEnum;
};

export const getTypeParent = async () => {
	const response = await baseAxios.get('/submisions/enums');
	return response.data.typeParentEnum;
};

export const getParentsOcupations = async () => {
	const response = await baseAxios.get('/submisions/enums');
	return response.data.occupationEnum;
};

export const getParentsSpecialSituation = async () => {
	const response = await baseAxios.get('/submisions/enums');
	return response.data.specialSituationEnum;
};


