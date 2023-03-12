import { baseAxios } from '../../../../api/baseAxios';

export const usersApiGet = async () => {
	const users = await baseAxios.get('/users/');
	return users.data;
};

export const usersApiCreate = async (user) => {
	try {
		const userCreated = await baseAxios.post('/users/', user);
		return userCreated.data;
	} catch (error) {
	throw new Error(`Error al crear user: ${error.message}`);
  }
};

export const usersApiUpdate = async (user) => {
	try {
		await baseAxios.put(`/users/${user.id}`, user); 
	} catch (error) {
	  throw new Error(`Error al actualizar user: ${error.message}`);
	}
  };

export const usersApiFindById = async (id) => {
	const user = await baseAxios.get(`/users/${id}`);
	return user.data;
};

export const usersApiDelete = async (id) => {
	await baseAxios.delete(`/users/${id}`);
};

