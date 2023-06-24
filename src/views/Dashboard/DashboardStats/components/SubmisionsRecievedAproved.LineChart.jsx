import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useSubmisionTotals } from '../hooks/useSubmisionTotals';

const SubmisionsRecievedAproved = () => {
	const { querySubmisionAprovedByYear, querySubmisionCountByDate } = useSubmisionTotals();

	const submisionsAdded = querySubmisionCountByDate.data ? querySubmisionCountByDate.data : [];
	const submisionsAproved = querySubmisionAprovedByYear.data ? querySubmisionAprovedByYear.data : [];
	const years = [...new Set(submisionsAdded.map((s) => s.año))].slice(-3);

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

	const lineYearsChartData = {
		labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		datasets: dataAdded.concat(dataAproved),
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'Solicitudes recibidas y aprobadas por año',
				},
			},
			maintainAspectRatio: false,
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

	return !querySubmisionAprovedByYear.isLoading && !querySubmisionCountByDate.isLoading ? (
		<Line data={lineYearsChartData} options={lineYearsChartData.options} />
	) : (
		<>
			<p>Solicitudes recibidas y aprobadas por año</p>
			<SmallSpinner className='m-4 mx-auto' color={'#36616c'} />
		</>
	);
};

export default SubmisionsRecievedAproved;
