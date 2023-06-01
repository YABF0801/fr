import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useMatriculaPorCpopular } from '../hooks/useMatriculaPorCpopular';

const MatriculaPorCP = () => {
	const queryMatriculaPorCpopular = useMatriculaPorCpopular();

	const doughnutChartData = {
		labels: queryMatriculaPorCpopular.data ? queryMatriculaPorCpopular.data.labels : [],
		datasets: [
			{
				data: queryMatriculaPorCpopular.data ? queryMatriculaPorCpopular.data.cant : [],
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
			maintainAspectRatio: false,
		},
	};

	return !queryMatriculaPorCpopular.isLoading ? (
		<Doughnut data={doughnutChartData} options={doughnutChartData.options} />
	) : (
		<>
			<p>Matrículas por Consejo Popular</p>
			<SmallSpinner className='m-4 mx-auto' color={'#36616c'} />
		</>
	);
};

export default MatriculaPorCP;
