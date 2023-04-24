import { Navigate, Outlet } from 'react-router-dom';
import { HOME } from '../config/routes/paths';
import { useAuthContext } from '../context/authContext';

const PrivateRoute = () => {
	const { isAuthenticated } = useAuthContext();
	return isAuthenticated.user?._id ? <Outlet /> : <Navigate to={HOME} />;
};

export default PrivateRoute;
