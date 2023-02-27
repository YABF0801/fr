import { baseAxios } from '../../../api/baseAxios';

export const userApiLogin = async (user) => {
	const userLoggedIn = await baseAxios.post(`/users/login`, user);
	return userLoggedIn.data;
};
