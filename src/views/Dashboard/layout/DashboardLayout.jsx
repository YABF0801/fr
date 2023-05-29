import { Outlet } from 'react-router-dom';
import Navbar from '../../../common/Navbar/Navbar';
import PropTypes from 'prop-types';

function DashboardLayout() {
	return (
		<>
				<Navbar />
			<div className='container-main'>
				<Outlet />
			</div>
		</>
	);
}

DashboardLayout.propTypes = {
	children: PropTypes.object,
};

export default DashboardLayout;
