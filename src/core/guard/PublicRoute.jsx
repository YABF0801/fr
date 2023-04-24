import { Navigate, Outlet } from 'react-router-dom';
import { DASHBOARD } from '../config/routes/paths';
import { useAuthContext } from '../context/authContext';

const PublicRoute = () => {
	const { isAuthenticated } = useAuthContext();

	if (isAuthenticated.user?._id) return <Navigate to={DASHBOARD} />;

	return (
		<div>
			<Outlet />
		</div>
	);
};

export default PublicRoute;
