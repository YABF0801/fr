import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { useCapacityCalculatedPerYear } from '../hooks/useCapacityCalculatedPerYear';
import { useMatriculaPerYear } from '../hooks/useMatriculaPeryear';
import { useCapacityNperYear } from '../hooks/useCapacityNperYear';

const DataCiByYearOfLife = () => {
	const queryCapacityCalculatedPerYear = useCapacityCalculatedPerYear();
	const queryMatriculaPerYear = useMatriculaPerYear();
	const queryCapacityNperYear = useCapacityNperYear();

	const barChartData = {
		labels: ['2do', '3ro', '4to', '5to', '6to'],
		datasets: [
			{
				label: 'Matricula ',
				data: queryMatriculaPerYear.data,
				fill: true,
				backgroundColor: 'rgba(125, 192, 222, 0.5)', // blue
			},
			{
				label: 'Capacidad normada ',
				data: queryCapacityNperYear.data,
				fill: true,
				backgroundColor: 'rgba(225, 179, 104, 0.5)', // yellow
			},
			{
				label: 'Capacidad calculada en base al % de asistencia',
				data: queryCapacityCalculatedPerYear.data,
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

	return <Bar data={barChartData} options={barChartData.options} />;
};

export default DataCiByYearOfLife;
