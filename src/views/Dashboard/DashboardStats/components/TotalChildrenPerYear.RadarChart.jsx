
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import { useTotalChildrenPerYear } from '../hooks/useTotalChildrenPerYear';
import { useMatriculaPerYear } from '../hooks/useMatriculaPerYear';

const TotalChildrenPerYear = () => {
	const {queryTotalBoysPerYear, queryTotalGirlsPerYear} = useTotalChildrenPerYear();
	const queryMatriculaPerYear = useMatriculaPerYear();

	const radarChartData = {
		labels: ['2do', '3ro', '4to', '5to', '6to'],
		datasets: [
			{
				label: 'Totales',
				data: queryMatriculaPerYear.data,
				fill: true,
				backgroundColor: 'rgba(225, 179, 104, 0.2)',
				borderColor: 'rgba(225, 179, 104, 0.8)',
				tension: 0.1,
				pointBorderWidth: 3,
			},
			{
				label: 'Niñas ',
				data: queryTotalGirlsPerYear.data,
				fill: true,
				backgroundColor: 'rgba(225, 129, 124, 0.2)',
				borderColor: 'rgba(225, 129, 124, 0.8)',
				tension: 0.1,
				pointBorderWidth: 3,
			},
			{
				label: 'Niños',
				data: queryTotalBoysPerYear.data,
				fill: true,
				backgroundColor: 'rgba(125, 192, 202, 0.2)',
				borderColor: 'rgba(125, 192, 202, 0.8)',
				tension: 0.1,
				pointBorderWidth: 3,
			},
		],
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				r: {
					ticks: {
						beginAtZero: true,
						precision: 0,
					},
				},
			},
			plugins: {
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'Datos de los niños por año de vida',
				},
			},
		},
	};

	return <Radar data={radarChartData} options={radarChartData.options} />;
};

export default TotalChildrenPerYear;
