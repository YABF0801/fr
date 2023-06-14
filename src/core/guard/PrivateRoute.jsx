import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { HOME } from '../config/routes/paths';
import { useAuthContext } from '../context/authContext';

const PrivateRoute = () => {
	const { isAuthenticated } = useAuthContext();
	const location = useLocation()

	localStorage.setItem('lastPath', location.pathname)


	return isAuthenticated.user?._id ? <Outlet /> : <Navigate to={localStorage.getItem('lastPath') || HOME}  />;
};

export default PrivateRoute;

