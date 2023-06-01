
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import { useTotalChildrenPerYear } from '../hooks/useTotalChildrenPerYear';
import { useMatriculaPerYear } from '../hooks/useMatriculaPerYear';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';

const TotalChildrenPerYear = () => {
	const {queryTotalBoysPerYear, queryTotalGirlsPerYear} = useTotalChildrenPerYear();
	const queryMatriculaPerYear = useMatriculaPerYear();

	const radarChartData = {
		labels: ['2do', '3ro', '4to', '5to', '6to'],
		datasets: [
			{
				label: 'Totales',
				data: queryMatriculaPerYear.data ? queryMatriculaPerYear.data : [],
				fill: true,
				backgroundColor: 'rgba(225, 179, 104, 0.2)',
				borderColor: 'rgba(225, 179, 104, 0.8)',
				tension: 0.1,
				pointBorderWidth: 3,
			},
			{
				label: 'Niñas ',
				data: queryTotalGirlsPerYear.data ? queryTotalGirlsPerYear.data : [],
				fill: true,
				backgroundColor: 'rgba(225, 129, 124, 0.2)',
				borderColor: 'rgba(225, 129, 124, 0.8)',
				tension: 0.1,
				pointBorderWidth: 3,
			},
			{
				label: 'Niños',
				data: queryTotalBoysPerYear.data ? queryTotalBoysPerYear.data : [],
				fill: true,
				backgroundColor: 'rgba(125, 192, 202, 0.2)',
				borderColor: 'rgba(125, 192, 202, 0.8)',
				tension: 0.1,
				pointBorderWidth: 3,
			},
		],
		options: {
			responsive: true,
			maintainAspectRatio: true,
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

	return (
		!queryTotalBoysPerYear.isLoading && !queryTotalGirlsPerYear.isLoading && !queryMatriculaPerYear.isLoading ? (
			<Radar data={radarChartData} options={radarChartData.options} />
		) : (
			<>
			<p>Datos de los niños por año de vida</p>
			<SmallSpinner className='m-4 mx-auto' color={'#36616c'}/>
			</>
		)
		);
						
	};

	export default TotalChildrenPerYear;
