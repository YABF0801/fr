import OmAdministration from './components/OmAdministration';
import UsersList from './components/UsersList';
import { UserProvider } from './context/UserContext';

const Users = () => {
	return (
		<div className='organismos'>
			<UserProvider>
				<OmAdministration/>
				<UsersList />
			</UserProvider>
		</div>
	);
};

export default Users;