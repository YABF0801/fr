// ACTUALIZAR REAL
// COMO HACER ESTO PARA JWT AUTHENTICATION

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const MY_AUTH_APP = 'MY_AUTH_APP_1';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState({});

	useEffect(() => {
		const auth = window.localStorage.getItem(MY_AUTH_APP);
		if (auth) {
			setIsAuthenticated(JSON.parse(auth));
		} else {
			setIsAuthenticated({});
		}
	}, []);

	const login = useCallback((user, token) => {
		window.localStorage.setItem(MY_AUTH_APP, JSON.stringify({ user, token }));
		setIsAuthenticated({ user, token });
	}, []);

	const logout = useCallback(
		function () {
			window.localStorage.removeItem(MY_AUTH_APP);
			setIsAuthenticated({});
		},
		[setIsAuthenticated]
	);

	const value = useMemo(
		() => ({
			login,
			logout,
			isAuthenticated,
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
