import { baseAxios } from '../../../../api/baseAxios';
import SuccessMsg from '../../../../common/Toasts/SuccessMsg';
import ToastNotification from '../../../../common/Toasts/toasts';
import { handleToastyError } from '../../../../utils/handleError';

export const submisionsApiGet = async () => {
	const allSubmisions = await baseAxios.get('/submisions');
	const submisions = allSubmisions.data.filter((submision) => submision.status !== 'propuesta');
	return submisions;
};

export const yearNullExist = async () => {
	const allSubmisions = await baseAxios.get('/submisions');
	const submisions = allSubmisions.data.filter((submision) => submision.child.year_of_life === null);
	return submisions;
};



export const submisionsApiCreate = async (submision) => {
	try {
		const submisionCreated = await baseAxios.post('/submisions', submision);
		ToastNotification('success', `${SuccessMsg('create', `planilla ${submision.child.childName}`)}`);
		return submisionCreated.data;
	} catch (error) {
		handleToastyError(error)
	}
};

export const submisionsApiUpdate = async (submision) => {
	try {
		await baseAxios.put(`/submisions/${submision._id}`, submision);
		ToastNotification('success', `${SuccessMsg('update', `planilla ${submision.entryNumber}`)}`);
	} catch (error) {
		handleToastyError(error)
	}
};

export const submisionsApiDelete = async (id) => {
	try {
		await baseAxios.delete(`/submisions/${id}`);
		ToastNotification('success', `${SuccessMsg('delete', `planilla`)}`);
	} catch (error) {
		handleToastyError(error)
	}
};

export const submisionsApiFindById = async (id) => {
	try {
		const submision = await baseAxios.get(`/submisions/${id}`);
		return submision.data;
	} catch (error) {
		handleToastyError(error)
	}
};

export const consecustiveApiGet = async () => {
	const tools = await baseAxios.get(`/submisions/get-tools`);
	return tools.data.consecutive;
};

export const consecustiveApiReset = async () => {
	try {
		await baseAxios.put(`/submisions/reset-consecutive`);
		ToastNotification('success', `${SuccessMsg('custom', `número consecutivo`, 'reseteado')}`);
	} catch (error) {
		handleToastyError(error)
	}
};

export const submisionsApiBaja = async (id) => {
	try {
		await baseAxios.put(`/submisions/baja/${id}`);
		ToastNotification('success', `${SuccessMsg('custom', `baja`, 'realizada')}`);
	} catch (error) {
		handleToastyError(error)
	}
};

export const submisionsApiMatriculaManual = async (submision) => {
	try {
		await baseAxios.put(`/submisions/matricular/${submision._id}`, submision);
		ToastNotification('success', `${SuccessMsg('custom', `matricula`, 'realizada con éxito')}`);
	} catch (error) {
		handleToastyError(error)
	}
};