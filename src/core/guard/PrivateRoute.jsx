import { /* Navigate */ Outlet } from 'react-router-dom';
import DashboardLayout from '../../views/dashboard/layout/DashboardLayout';
/* import { HOME } from '../config/routes/paths';
import { useAuthContext } from '../context/authContext'; */

const PrivateRoute = () => {
	/*   const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) return <Navigate to={HOME} /> */

	return (
		<div>
			<DashboardLayout>
				<Outlet />
			</DashboardLayout>
		</div>
	);
};

export default PrivateRoute;
