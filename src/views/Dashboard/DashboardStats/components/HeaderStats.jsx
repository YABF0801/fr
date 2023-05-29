import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../../core/context/authContext';
import { FechaOmApiGet } from '../../../../utils/utiles.sevices';
import { cursoApiGet } from '../../Circulos/service/circulo.services';

const HeaderStats = () => {
	const [curso, setCurso] = useState();
	const [date, setDate] = useState(false);
	const [existingDate, setExistingDate] = useState(false);
	const { isAuthenticated } = useAuthContext();

	const dateShow = existingDate && new Date(date).toLocaleDateString();

	useEffect(() => {
		const fetchData = async () => {
			const curso = await cursoApiGet();
			setCurso(curso);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const omDate = await FechaOmApiGet();
			if (omDate) {
				setDate(omDate);
				setExistingDate(true);
			}
		};
		fetchData();
	}, []);

	return (
		<div className='row mt-3 justify-content-between'>
			<div className='col-md-5'>
			
				{dateShow ? (
					<h5 className='text-secondary'>Fecha de nuevo otorgamiento masivo {dateShow}</h5>
				) : isAuthenticated.user?.role === 'admin' ? (
					<h5 className='text-secondary'>Establezca fecha de nuevo otorgamiento masivo</h5>
				) : (
					null
				)}
			</div>

			<div className='col-md-2'>
				<h2 className='text-center '>Curso {curso}</h2>
			</div>
		</div>
	);
};
export default HeaderStats;
