import { baseAxios } from '../../../api/baseAxios';

export const userApiLogin = async (user) => {
	const userLoggedIn = await baseAxios.post('/auth/signin', user);
	return userLoggedIn.data;
};
