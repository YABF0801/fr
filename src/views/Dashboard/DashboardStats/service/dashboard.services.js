import { baseAxios } from '../../../../api/baseAxios';

export const userApiLogout = async () => {
	const userLoggedOut = await baseAxios.get(`/users/logout`);
	return userLoggedOut.data; // ?
};
