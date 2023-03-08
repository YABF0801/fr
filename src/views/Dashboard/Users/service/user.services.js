import { baseAxios } from '../../../../api/baseAxios';

export const usersApiGet = async () => {
	const users = await baseAxios.get('/users/');
	return users.data;
};

export const usersApiCreate = async (user) => {
	const userCreated = await baseAxios.post('/users/', user);
	return userCreated.data;
};

export const usersApiUpdate = async (user) => {
	const userUpdated = await baseAxios.put(`/users/${user.id}`, user); 
	return userUpdated.data;
};

export const usersApiFindById = async (id) => {
	const user = await baseAxios.get(`/users/${id}`);
	return user.data;
};

export const usersApiDelete = async (id) => {
	await baseAxios.delete(`/users/${id}`);
};

