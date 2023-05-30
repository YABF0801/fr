import 'chart.js/auto';
import { PolarArea } from 'react-chartjs-2';
import { useAverageAttendance } from '../hooks/useAverageAttendance';

const AverageAttendance = () => {

	const queryAverageAttendance = useAverageAttendance()

	const polarChartData = {
		labels: ['2do', '3ro', '4to', '5to', '6to'],
		datasets: [
			{
				label: 'Porciento de asistencia por año de vida',
				data: queryAverageAttendance.data,
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
					text: 'Porcientos de asistencia por año de vida',
				},
			},
			maintainAspectRatio: true,
		},
		scales: {
			r: {
				suggestedMin: 0,
				suggestedMax: 100,
				stepSize: 20,
			},
		},
	};

	return <PolarArea data={polarChartData} options={polarChartData.options} />
};

export default AverageAttendance;
