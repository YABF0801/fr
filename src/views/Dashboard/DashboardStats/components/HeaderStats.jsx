import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../../core/context/authContext';
import { useHeaderData } from '../hooks/useHeaderData';

const HeaderStats = () => {
	const { queryCurso, queryFechaOm } = useHeaderData();

	const [date, setDate] = useState(null);
	const [existingDate, setExistingDate] = useState(false);
	const { isAuthenticated } = useAuthContext();

	useEffect(() => {
		if (queryFechaOm.data) {
			setExistingDate(true);
			const omDate = queryFechaOm.data ? new Date(queryFechaOm.data).toLocaleDateString() : null;
			setDate(omDate)
		} else {
			setExistingDate(false);
			setDate(null)
		}
	}, [queryFechaOm.data]);
	
	return (
		<div className='row mt-4 justify-content-evenly'>
			<div className='col-md-5'>
				{existingDate ? (
					<h5 className='text-start text-secondary'>Próximo otorgamiento masivo {date}</h5>
				) : isAuthenticated.user?.role === 'admin' ? (
					<h5 className='text-start text-secondary'>Establezca fecha de próximo otorgamiento masivo</h5>
				) : null}
			</div>

			<div className='col-md-6'>
				{queryCurso.data && <h2 className='text-end '>Curso {queryCurso.data}</h2>}
			</div>
		</div>
	);
};
export default HeaderStats;
