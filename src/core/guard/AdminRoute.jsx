import { Navigate, Outlet } from 'react-router-dom';
import { PRIVATE } from '../config/routes/paths';
import { useAuthContext } from '../context/authContext';

const AdminRoute = () => {
	const { isAuthenticated } = useAuthContext();
	return isAuthenticated.user?.role === 'admin' ? <Outlet /> : <Navigate to={PRIVATE} />;
};

export default AdminRoute;
