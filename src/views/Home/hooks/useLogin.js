import { useAuthContext } from '../../../core/context/authContext';
import { handleToastyError } from '../../../utils/handleError';
import { userApiLogin } from '../service/home.services';

export const useLogin = () => {

	const { login } = useAuthContext();
	const loginUser = async (userData) => {
		try {
			const { user, token } = await userApiLogin(userData);
			login(user, token);
		} catch (error) {
			handleToastyError(error);
		}
	};

	return { loginUser };
};
