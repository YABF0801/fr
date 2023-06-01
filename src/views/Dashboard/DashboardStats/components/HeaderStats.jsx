import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../../core/context/authContext';
import { useHeaderData } from '../hooks/useHeaderData';

const HeaderStats = () => {
	const { queryCurso, queryFechaOm } = useHeaderData();

	const [existingDate, setExistingDate] = useState(false);
	const { isAuthenticated } = useAuthContext();

	const dateShow = existingDate && new Date(queryFechaOm.data).toLocaleDateString();

	useEffect(() => {
		if (queryFechaOm.data) {
			setExistingDate(true);
		}
	}, []);

	return (
		<div className='row mt-4 justify-content-evenly'>
			<div className='col-md-5'>
				{dateShow ? (
					<h5 className='text-start text-secondary'>Fecha de nuevo otorgamiento masivo {dateShow}</h5>
				) : isAuthenticated.user?.role === 'admin' ? (
					<h5 className='text-start text-secondary'>Establezca fecha de nuevo otorgamiento masivo</h5>
				) : null}
			</div>

			<div className='col-md-6'>
				{queryCurso.data && <h2 className='text-end '>Curso {queryCurso.data}</h2>}
			</div>
		</div>
	);
};
export default HeaderStats;
