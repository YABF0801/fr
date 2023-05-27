import { baseAxios } from '../../../../api/baseAxios';
import ErrorMsg from '../../../../common/Toasts/ErrorMsg';
import SuccessMsg from '../../../../common/Toasts/SuccessMsg';
import ToastNotification from '../../../../common/Toasts/toasts';

export const submisionsApiGet = async () => {
	const allSubmisions = await baseAxios.get('/submisions');
	const submisions = allSubmisions.data.filter((submision) => submision.status !== 'propuesta');
	return submisions;
};

export const submisionsApiCreate = async (submision) => {
	try {
		const submisionCreated = await baseAxios.post('/submisions', submision);
		ToastNotification('success', `${SuccessMsg('create', `planilla ${submision.child.childName}`)}`);
		return submisionCreated.data;
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('create', 'planilla')} : ${error.message}`);
	}
};

export const submisionsApiUpdate = async (submision) => {
	try {
		await baseAxios.put(`/submisions/${submision.id}`, submision);
		ToastNotification('success', `${SuccessMsg('update', `planilla ${submision.entryNumber}`)}`);
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('update', 'planilla')} : ${error.message}`);
	}
};

export const submisionsApiDelete = async (id) => {
	try {
		await baseAxios.delete(`/submisions/${id}`);
		ToastNotification('success', `${SuccessMsg('delete', `planilla`)}`);
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('delete', 'planilla')} : ${error.message}`);
	}
};

export const submisionsApiFindById = async (id) => {
	const submision = await baseAxios.get(`/submisions/${id}`);
	return submision.data;
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
		ToastNotification('error',  `${ErrorMsg("custom", "número consecutivo", 'resetear')} : ${error.message}`);
	}
};

export const submisionsApiBaja = async (id) => {
	try {
		await baseAxios.put(`/submisions/baja/${id}`);
		ToastNotification('success', `${SuccessMsg('custom', `baja`, 'realizada')}`);
	} catch (error) {
		ToastNotification('error',  `${ErrorMsg("custom", "baja", 'ejecutar')} : ${error.message}`);
	}
};
