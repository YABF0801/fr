import { useEffect, useState } from 'react';

import { FechaOmApiGet } from '../../../../utils/utiles.sevices';
import { cursoApiGet } from '../../Circulos/service/circulo.services';
import { getCapacityAndMatricula } from '../services/dashboard.services';
import { getTotalGirlsAndBoys } from '../services/getTotalGirlsAndBoys';

import Charts from './Charts';
import Charts2 from './Charts2';
import MapComponent from './MapAndBarChart';

import './Stats.scss';
import { useFetch } from '../../../../core/hooks/useFetch';

const Cards = () => {
	const [totalMatricula, setTotalMatricula] = useState(0);
	const [totalCapacidad, setTotalCapacidad] = useState(0);
	const [totalBoys, setTotalBoys] = useState(0);
	const [totalGirls, setTotalGirls] = useState(0);
	const [curso, setCurso] = useState();
	const [date, setDate] = useState(false);
	const [existingDate, setExistingDate] = useState(false);

	const dateShow = existingDate ? new Date(date).toLocaleDateString() : '__ / __ / ____';

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

	useEffect(() => {
		const fetchData = async () => {
			const result = await getCapacityAndMatricula();
			setTotalCapacidad(result.NormedCapacity);
			setTotalMatricula(result.Matricula);
		};
		fetchData();
	}, []);

	const { data: childrens, isLoading } = useFetch('/estadisticas/boys-girls');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getTotalGirlsAndBoys();
		setTotalBoys(childrens.totalBoys);
		setTotalGirls(childrens.totalGirls);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	return (
		<section className='estadisticas'>
			<div className='container-main mt-3 p-3'>
				<div className='row'>
					<div className='col-md-4 '>
						<h3 className='text-secondary '>Fecha de nuevo otorgamiento masivo {dateShow}</h3>
					</div>
					<div className='col-md-6 '></div>
					<div className='col-md-2'>
						<h2 className='text-center '>Curso {curso}</h2>
					</div>
				</div>

				<div className='row  justify-content-evenly'>
					<div className='col-md-3 col-xl-3'>
						<div className='card bg-c-yellow order-card'>
							<div className='card-block'>
								<h5 className='m-b-10'>Total de Matriculados</h5>
								<h1 className='text-right display-1'>
									<span>{totalMatricula}</span>
								</h1>
							</div>
						</div>
					</div>

					<div className='col-md-3 col-xl-3'>
						<div className='card bg-c-pink order-card'>
							<div className='card-block'>
								<h5 className='m-b-10'>Total de Capacidades</h5>
								<h1 className='text-right display-1'>
									<span>{totalCapacidad}</span>
								</h1>
							</div>
						</div>
					</div>

					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							<div className='col-md-3 col-xl-3'>
								<div className='card bg-c-green order-card'>
									<div className='card-block'>
										<h5 className='m-b-10'>Total de Niñas</h5>
										<h1 className='text-right display-1'>
											<span>{childrens.totalGirls}</span>
										</h1>
									</div>
								</div>
							</div>

							<div className='col-md-3 col-xl-3'>
								<div className='card bg-c-blue order-card'>
									<div className='card-block'>
										<h5 className='m-b-10'>Total de Niños</h5>
										<h1 className='text-right display-1'>
											<span>{childrens?.totalBoys}</span>
										</h1>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
				<MapComponent />
				<Charts />
				<Charts2 /> 
			</div>
		</section>
	);
};

export default Cards;
