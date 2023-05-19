import { useEffect, useState } from 'react';
import {
	circulosPositionGet,
	getAverageAttendance,
	getCapacityCperYear,
	getCapacityNperYear,
	getMatriculaPerYear,
	submisionsPositionGet,
} from '../services/dashboard.services';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'chart.js/auto';

import L from 'leaflet';
import { Bar, PolarArea } from 'react-chartjs-2';

const MapComponent = () => {
	const [submisionsLocal, setSubmisionsLocal] = useState([]);
	const [circulosLocal, setCirculosLocal] = useState([]);
	const [asistencia, setAttendance] = useState([]);
	const [matricula, setMatricula] = useState([]);
	const [capacidad, setCapacidad] = useState([]);
	const [capacidadCalc, setCapacidadCalc] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const submisions = await submisionsPositionGet();
			const circulos = await circulosPositionGet();
			setSubmisionsLocal(submisions);
			setCirculosLocal(circulos);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const attendances = await getAverageAttendance();
			const matriculas = await getMatriculaPerYear();
			const capacidades = await getCapacityNperYear();
			const capacidadesCalculadas = await getCapacityCperYear();
			setAttendance(attendances);
			setMatricula(matriculas);
			setCapacidad(capacidades);
			setCapacidadCalc(capacidadesCalculadas);
		};
		fetchData();
	}, []);
	const polarChartData = {
		labels: ['2do', '3ro', '4to', '5to', '6to'],
		datasets: [
			{
				label: 'Porciento de asistencia por año de vida',
				data: asistencia,
				fill: true,
				backgroundColor: [
					'rgba(255, 159, 64, 0.3)',
					'rgba(75, 192, 192, 0.3)',
					'rgba(185, 149, 162, 0.3)',
					'rgba(123, 122, 225, 0.3)',
					'rgba(54, 162, 235, 0.3)',
				],
			},
		],
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'Porcientos de asistencia',
				},
			},
			maintainAspectRatio: false,
		},
		scales: {
			r: {
				suggestedMin: 0,
				suggestedMax: 100,
				stepSize: 20,
			},
		},
	};

	const barChartData = {
		labels: ['2do', '3ro', '4to', '5to', '6to'],
		datasets: [
			{
				label: 'Matricula ',
				data: matricula,
				fill: true,
				backgroundColor: 'rgba(125, 192, 222, 0.5)', // blue
			},
			{
				label: 'Capacidad normada ',
				data: capacidad,
				fill: true,
				backgroundColor: 'rgba(225, 179, 104, 0.5)', // yellow
			},
			{
				label: 'Capacidad calculada en base al % de asistencia',
				data: capacidadCalc,
				fill: true,
				backgroundColor: 'rgba(185, 149, 162, 0.5)', // redish
			},
		],
		options: {
			responsive: true,
			indexAxis: 'y',
			plugins: {
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'Datos de los cículos por año de vida',
				},
			},
			scales: {
				x: {
					/*  stacked: true,  */
				},
				y: {
					/* stacked: true,  */
					ticks: {
						beginAtZero: true,
						stepSize: 1, // ajusta la escala en el eje y a números enteros
						suggestedMin: 0,
						suggestedMax: 30,
					},
				},
			},
			barPercentage: 1,
			categoryPercentage: 0.8,
			maintainAspectRatio: false,
		},
	};

	const childIcon = L.icon({
		iconUrl: '/public/kid2.png',
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
		shadowAnchor: [4, 62],
	});

	const ciIcon = L.icon({
		iconUrl: '/public/ci.png',
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
		shadowAnchor: [4, 62],
	});

	return (
		<section className='estadisticas'>
			<div className='container-main mt-3 '>
				<div className='row mt-5 d-flex justify-content-between'>
					<div className=' col-md-4 '>
						<Bar data={ barChartData } options={ barChartData.options } />
					</div>

					<div className='col-md-3 '>
						<PolarArea data={ polarChartData } options={ polarChartData.options } />
					</div>

					<div className=' col-md-4 '>
						<div className='row align-items-center'>
							<div className='col-md-12 '>
								<MapContainer
									className='map-container'
									style={ { width: '100%', height: '400px' } }
									center={ [21.72761, -82.834167] }
									zoom={ 10 }
									setView={ [21.72761, -82.834167] }
									scrollWheelZoom={ true }
									minZoom={ 9 }
									maxBounds={ [
										[21.410303, -83.26972], // Suroeste
										[21.961168, -82.531547], // Noreste
									] }
								>
									<TileLayer
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
										url='/public/Tiles/{z}/{x}/{y}.png'
									// https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
									/>

									{ submisionsLocal.map((submision) => (
										<Marker key={ submision._id } position={ submision.child.latlng } icon={ childIcon }>
											<Popup>
												<span className='popup'>
													<h3>{ submision.child.childName + submision.child.childLastname }</h3>
													<p>{ submision.child.childAddress }</p>
													<p>
														Edad: { submision.child.age }, { submision.child.sex }
													</p>
												</span>
											</Popup>
										</Marker>
									)) }

									{ circulosLocal.map((circulo) => (
										<Marker key={ circulo._id } position={ circulo.latlng } icon={ ciIcon }>
											<Popup>
												<div>
													<p>CI { circulo.name }</p>
												</div>
											</Popup>
										</Marker>
									)) }
								</MapContainer>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MapComponent;
