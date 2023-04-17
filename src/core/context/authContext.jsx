// ACTUALIZAR REAL
// COMO HACER ESTO PARA JWT AUTHENTICATION

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const MY_AUTH_APP = 'MY_AUTH_APP_1';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem(MY_AUTH_APP) ?? false);

	const login = useCallback(function (user, token) {
		window.localStorage.setItem(MY_AUTH_APP, { user, token });
		setIsAuthenticated(true);
	}, []);

	const logout = useCallback(function () {
		window.localStorage.removeItem(MY_AUTH_APP);
		setIsAuthenticated(false);
	}, []);

	const value = useMemo(
		() => ({
			login,
			logout,
			isAuthenticated,
			setIsAuthenticated,
		}),
		[login, logout, isAuthenticated]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
	children: PropTypes.object,
};

export function useAuthContext() {
	return useContext(AuthContext);
}
