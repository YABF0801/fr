import UsersList from './components/UsersList';
import { UserProvider } from './context/UserContext';

const Users = () => {
	return (
		<div className='organismos'>
			<UserProvider>
				<UsersList />
			</UserProvider>
		</div>
	);
};

export default Users;