import  ToastNotification  from '../../../common/Toasts/toasts';

import { useAuthContext } from '../../../core/context/authContext';
import { userApiLogin } from '../service/home.services';

export const useLogin = () => {

	const { login } = useAuthContext();
	const loginUser = async (userData) => {
		try {
			const { user, token } = await userApiLogin(userData);
			login(user, token);
		} catch (error) {
			ToastNotification('error', 'Credenciales incorrectas');  
		}
	};

	return { loginUser };
};
