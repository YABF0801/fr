import { baseAxios } from '../../../../api/baseAxios';
import ErrorMsg from '../../../../common/Toasts/ErrorMsg';
import SuccessMsg from '../../../../common/Toasts/SuccessMsg';
import ToastNotification from '../../../../common/Toasts/toasts';

export const usersApiGet = async () => {
	const users = await baseAxios.get('/users/');
	return users.data;
};

export const usersApiCreate = async (user) => {
	try {
		const userCreated = await baseAxios.post('/users/', user);
		ToastNotification('success', `${SuccessMsg('create', `usuario ${user.nickname}`)}`);
		return userCreated.data;
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('create', 'usuario')} : ${error.message}`);
	}
};

export const usersApiUpdate = async (user) => {
	try {
		await baseAxios.put(`/users/${user._id}`, user)
		ToastNotification('success', `${SuccessMsg('update', `usuario ${user.nickname}`)}`);
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('update', 'usuario')} : ${error.message}`);
	}
};

export const usersApiFindById = async (id) => {
	const user = await baseAxios.get(`/users/${id}`);
	return user.data;
};

export const usersApiDelete = async (id) => {
	try {
		await baseAxios.delete(`/users/${id}`);
		ToastNotification('success', `${SuccessMsg('delete', `usuario`)}`);
	} catch (error) {
		ToastNotification('error', `${ErrorMsg('delete', 'usuario')} : ${error.message}`);
	}

};
