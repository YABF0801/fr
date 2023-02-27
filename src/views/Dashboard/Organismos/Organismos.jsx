import OrganismosList from './components/OrganismosList';
import { OrganismoProvider } from './context/OrganismoContext';

const Organismos = () => {
	return (
		<div className='organismos'>
			<OrganismoProvider>
				<OrganismosList />
			</OrganismoProvider>
		</div>
	);
};

export default Organismos;
