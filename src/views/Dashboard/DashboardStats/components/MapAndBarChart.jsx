import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { getAverageAttendance} from '../services/dashboard.services';


import { PolarArea } from 'react-chartjs-2';

const MapComponent = () => {
	const [asistencia, setAttendance] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const attendances = await getAverageAttendance();
			setAttendance(attendances);
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

	return (
		<section className='estadisticas'>
			<div className='container-main mt-3 '>
				<div className='row mt-5 d-flex justify-content-between'>
					<div className=' col-md-4 '>aqaui iba la barChart</div>

					<div className='col-md-3 '>
						<PolarArea data={polarChartData} options={polarChartData.options} />
					</div>

					<div className=' col-md-4 '>
						<div className='row align-items-center'>
							<div className='col-md-12 '>

							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MapComponent;
