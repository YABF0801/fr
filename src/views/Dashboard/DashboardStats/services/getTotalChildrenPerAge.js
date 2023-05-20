import { baseAxios } from '../../../../api/baseAxios';

export const getTotalChildrenPerAge = async () => {
	// CANT niños por edades
	const result = await baseAxios.get('/estadisticas/childs-age');
	const totalChildrenPerAge = result.data;
	const data = [
		totalChildrenPerAge.childs_age0 || 0,
		totalChildrenPerAge.childs_age1 || 0,
		totalChildrenPerAge.childs_age2 || 0,
		totalChildrenPerAge.childs_age3 || 0,
		totalChildrenPerAge.childs_age4 || 0,
		totalChildrenPerAge.childs_age5 || 0,
	];
	return data;
};