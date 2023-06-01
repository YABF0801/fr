import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useTotalChildrenPerAge } from '../hooks/useTotalChildrenPerAge';


const TotalChildrenPerAge = () => {
	const queryTotalChildrenPerAge = useTotalChildrenPerAge();

	const lineChartData = {
		labels: ['0-1 año', '1-2 años', '2-3 años', '3-4 años', '4-5 años', '5-6 años'],
		datasets: [
			{
				label: '',
				data: queryTotalChildrenPerAge.data ? queryTotalChildrenPerAge.data : [],
				fill: true,
				backgroundColor: 'rgba(75, 162, 180, 0.3)',
				borderColor: 'rgba(75, 162, 180, 1)',
				tension: 0.3,
				pointBorderWidth: 3,
			},
		],
		options: {
			responsive: true,
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: 'Cantidad de niños por edades',
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

	return (
	!queryTotalChildrenPerAge.isLoading ? (
		<Line data={lineChartData} options={lineChartData.options} />
	) : (
		<SmallSpinner className='m-4 mx-auto' color={'#36616c'}/>
	)
	);
					
};

export default TotalChildrenPerAge;
