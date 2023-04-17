import { useState } from 'react';
import { useAuthContext } from '../../../core/context/authContext';
import { userApiLogin } from '../service/home.services';

export const useLogin = async (user) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { login } = useAuthContext();
	const loginUser = async () => {
		try {
			setIsLoading(true);
			const { user, token } = await userApiLogin();
			login(user, token);
		} catch (error) {
			console.log(error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return { loginUser, isLoading, error };
};
