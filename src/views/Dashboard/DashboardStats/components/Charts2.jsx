import { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line, Doughnut } from 'react-chartjs-2';
import {
	getMatriculaPorCp,
	getStatusCount,
	getSubmisionAprovedByYear,
	getSubmisionCountByDate,
} from '../services/dashboard.services';

const Charts2 = () => {
	const [statusCount, setStatusCount] = useState([]);
	const [matriculaPorCP, setMatriculaPorCP] = useState([]);
	const [submisionsAddedByYear, setSubmisionsAddedByYear] = useState([]);
	const [submisionsAprovedByYear, setSubmisionsAprovedByYear] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const status = await getStatusCount();
			const matriculaCP = await getMatriculaPorCp();
			const submisionsAdded = await getSubmisionCountByDate();
			const years = [...new Set(submisionsAdded.map((s) => s.año))];
			const dataAdded = years.map((year) => {
				const submisionsYear = submisionsAdded.filter((s) => s.año === year);
				const submisionsByMonth = new Array(12).fill(0);
				submisionsYear.forEach((s) => {
					submisionsByMonth[s.mes - 1] = s.cant;
				});
				return {
					label: `Recibidas ${year.toString()}`,
					data: submisionsByMonth,
					fill: false,
					borderColor: [
						'rgba(255, 159, 64, 0.6)',
						'rgba(75, 192, 192, 0.6)',
						'rgba(185, 149, 162, 0.6)',
						'rgba(123, 122, 225, 0.6)',
						'rgba(54, 162, 235, 0.6)',
					],
				};
			});
			const submisionsAproved = await getSubmisionAprovedByYear();
			const dataAproved = years.map((year) => {
				const submisionsYear = submisionsAproved.filter((s) => s.año === year);
				const submisionsByMonth = new Array(12).fill(0);
				submisionsYear.forEach((s) => {
					submisionsByMonth[s.mes - 1] = s.cant;
				});
				return {
					label: `Aprobadas ${year.toString()}`,
					data: submisionsByMonth,
					fill: true,
					backgroundColor: [
						'rgba(255, 159, 64, 0.6)',
						'rgba(75, 192, 192, 0.6)',
						'rgba(185, 149, 162, 0.6)',
						'rgba(123, 122, 225, 0.6)',
						'rgba(54, 162, 235, 0.6)',
					],
				};
			});

			setStatusCount(status);
			setMatriculaPorCP(matriculaCP);
			setSubmisionsAddedByYear(dataAdded);
			setSubmisionsAprovedByYear(dataAproved);
		};
		fetchData();
	}, []);

	const lineYearsChartData = {
		labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		datasets: submisionsAddedByYear.concat(submisionsAprovedByYear),
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: true,
				},
				title: {
					display: true,
					text: 'Solicitudes recibidas y aprobadas por año',
				},
			},
			maintainAspectRatio: true,
			scales: {
				y: {
					min: 0,
					max: 20,
					ticks: {
						stepSize: 3,
					},
				},
			},
		},
	};

	const doughnutChartData = {
		labels: matriculaPorCP.labels,
		datasets: [
			{
				data: matriculaPorCP.cant,
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
					text: 'Matrículas por Consejo Popular',
				},
			},
		},
	};

	return (
		<section className='estadisticas2'>
			<div className='container-main mt-3 '>
				<div className='row mt-5 justify-content-evenly'>
					<div className='col-md-2 col-xl-2'>
						<div className='card bg-c-yellow order-card '>
							<div className='order-card  '>
								<div className='card-block'>
									<p className='m-b-10'>Pendientes</p>
									<h4 className='text-right display-5'>
										<span>{ statusCount[0] }</span>
									</h4>
								</div>
							</div>
							<hr />
							<div className='order-card  '>
								<div className='card-block'>
									<p className='m-b-10'>Matrículas</p>
									<h4 className='text-right display-5'>
										<span>{ statusCount[1] }</span>
									</h4>
								</div>
							</div>
							<hr />

							<div className='order-card '>
								<div className='card-block'>
									<p className='m-b-10'>Bajas</p>
									<h4 className='text-right display-5'>
										<span>{ statusCount[2] }</span>
									</h4>
								</div>
							</div>
						</div>
					</div>

					<div className='col-md-7 col-xl-7'>
						<div className='row align-items-center'>
							<Line data={ lineYearsChartData } options={ lineYearsChartData.options } />
						</div>
					</div>

					<div className='col-md-3 col-xl-3'>
						<div className='row align-items-center'>
							<Doughnut data={ doughnutChartData } options={ doughnutChartData.options } />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Charts2;
