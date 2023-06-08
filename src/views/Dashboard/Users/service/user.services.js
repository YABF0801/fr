import { baseAxios } from '../../../../api/baseAxios';
import SuccessMsg from '../../../../common/Toasts/SuccessMsg';
import ToastNotification from '../../../../common/Toasts/toasts';
import { handleToastyError } from '../../../../utils/handleError';

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
		handleToastyError(error);
	}
};

export const usersApiUpdate = async (user) => {
	try {
		await baseAxios.put(`/users/${user._id}`, user);
		ToastNotification('success', `${SuccessMsg('update', `usuario ${user.nickname}`)}`);
	} catch (error) {
		handleToastyError(error);
	}
};

export const usersApiFindById = async (id) => {
	try {
		const user = await baseAxios.get(`/users/${id}`);
		return user.data;
	} catch (error) {
		handleToastyError(error);
	}
};

export const usersApiDelete = async (id) => {
	try {
		await baseAxios.delete(`/users/${id}`);
		ToastNotification('success', `${SuccessMsg('delete', `usuario`)}`);
	} catch (error) {
		handleToastyError(error);
	}
};
