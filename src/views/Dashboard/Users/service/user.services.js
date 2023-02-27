import { baseAxios } from '../../../../api/baseAxios';

export const usersApiGet = async () => {
	const users = await baseAxios.get('/users/find/');
	return users.data;
};

export const usersApiCreate = async (user) => {
	const userCreated = await baseAxios.post('/users/new/', user);
	return userCreated.data;
};

export const usersApiUpdate = async (user) => {
	const userUpdated = await baseAxios.put(`/users/update/${user.id}`, user); 
	return userUpdated.data;
};

export const usersApiFindById = async (id) => {
	const user = await baseAxios.get(`/users/find/${id}`);
	return user.data;
};

export const usersApiDelete = async (id) => {
	// (userId) ?
	await baseAxios.delete(`/users/${id}`);
};

// necesita find by nickname???
