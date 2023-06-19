// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MY_AUTH_APP = 'MY_AUTH_APP_1';


export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState({});

	const navigate = useNavigate()

	useEffect(() => {
		const auth = window.localStorage.getItem(MY_AUTH_APP);
		if (auth) {
			setIsAuthenticated(JSON.parse(auth));
		} else {
			setIsAuthenticated({});
		}
	}, []);

	useEffect(() => {
		const auth = window.localStorage.getItem(MY_AUTH_APP);
		if (auth) {
			const token = JSON.parse(auth).token;
			const decodedToken = jwt_decode(token);
			const expirationDate = new Date(decodedToken.exp * 1000);
			const currentDate = new Date();
			(currentDate > expirationDate) && logout();
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
		  navigate('/');
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
