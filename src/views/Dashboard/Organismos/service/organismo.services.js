import { baseAxios } from '../../../../api/baseAxios';
import ErrorMsg from '../../../../common/Toasts/ErrorMsg';
import SuccessMsg from '../../../../common/Toasts/SuccessMsg';
import ToastNotification from '../../../../common/Toasts/toasts';

export const organismosApiGet = async () => {
	const organismos = await baseAxios.get('/organismos/');
	return organismos.data;
};

export const organismosApiCreate = async (organismo) => {
	try {
		const organismoCreated = await baseAxios.post('/organismos', organismo);
		ToastNotification('success', `${SuccessMsg('create', `organismo ${organismo.name}`)}`);
		return organismoCreated.data;
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('create', 'organismo')} : ${error.message}`);
	}
};

export const organismosApiUpdate = async (organismo) => {
	try {
		await baseAxios.put(`/organismos/${organismo._id}`, organismo);
		ToastNotification('success', `${SuccessMsg('update', `organismo ${organismo.name}`)}`);
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('update', 'organismo')} : ${error.message}`);
	}
};

export const organismosApiDelete = async (id) => {
	try {
		await baseAxios.delete(`/organismos/${id}`);
		ToastNotification('success', `${SuccessMsg('delete', `organismo`)}`);
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('delete', 'organismo')} : ${error.message}`);
	}
};

export const organismosApiFindById = async (id) => {
	const organismoFind = await baseAxios.get(`/organismos/${id}`);
	return organismoFind.data;
};
