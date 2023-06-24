import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import useHistoricTotals from '../hooks/useHistoricTotals';

const HistoricTotalsCirculos = () => {
	const { queryHistoricTotals } = useHistoricTotals();

	const data = queryHistoricTotals.data ? queryHistoricTotals.data : [];

	const filteredData = data.slice(-3);

	const labels = filteredData.map((item) => item.year);

	const datasets = [
		{
			label: 'Niñas',
			backgroundColor: 'rgba(225, 129, 124, 0.1)',
			borderColor: 'rgba(225, 129, 124, 0.8)',
			data: data.map((item) => item.totalGirls),
			fill: true,
			tension: 0.3,
			pointBorderWidth: 5,
		},
		{
			label: 'Niños',
			backgroundColor: 'rgba(125, 192, 202, 0.1)',
			borderColor: 'rgba(125, 192, 202, 0.8)',
			data: data.map((item) => item.totalBoys),
			fill: true,
			tension: 0.3,
			pointBorderWidth: 5,
		},
		{
			label: 'Capacidad',
			backgroundColor: 'rgba(225, 179, 104, 0.1)',
			borderColor: 'rgba(225, 179, 104, 0.8)',
			data: data.map((item) => item.totalNormedCapacity),
			fill: true,
			tension: 0.3,
			pointBorderWidth: 5,
		},
		{
			label: 'Matrícula',
			backgroundColor: 'rgba(123, 122, 225, 0.1)',
			borderColor: 'rgba(123, 122, 225, 0.8)',
			data: data.map((item) => item.totalMatricula),
			fill: true,
			tension: 0.3,
			pointBorderWidth: 5,
		},
	];

	const lineChartData = {
		labels,
		datasets,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'Datos generales de años anteriores',
				},
			},
			maintainAspectRatio: true,
			scales: {
				x: {
					// grid: {
					//   display: false
					// }
				  },
				y: {
					grid: {
						display: false
					  },
					min: 0,
					max: 70,
					ticks: {
						stepSize: 5,
					},
				},
			},
		},
	};

	return !queryHistoricTotals.isLoading ? (
		<Line data={lineChartData} options={lineChartData.options} />
	) : (
		<>
			<p>Datos de años anteriores</p>
			<SmallSpinner className='m-4 mx-auto' color={'#36616c'} />
		</>
	);
};

export default HistoricTotalsCirculos;
