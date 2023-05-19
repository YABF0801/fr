import { toast } from 'react-toastify';

import { useAuthContext } from '../../../core/context/authContext';
import { userApiLogin } from '../service/home.services';

export const useLogin = () => {
	const notifyError = () =>
		toast.error('Error de credenciales!', {
			position: 'bottom-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'colored',
		});

	const { login } = useAuthContext();
	const loginUser = async (userData) => {
		try {
			const { user, token } = await userApiLogin(userData);
			login(user, token);
		} catch (error) {

			notifyError();
		}
	};

	return { loginUser };
};
