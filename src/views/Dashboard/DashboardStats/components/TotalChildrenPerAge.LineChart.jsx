import { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { getTotalChildrenPerAge  } from '../services';


const TotalChildrenPerAge = () => {
	const [childrenPerAge, setChildrenPerAge] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const childrenAge = await getTotalChildrenPerAge();
			setChildrenPerAge(childrenAge);
		};
		fetchData();
	}, []);


	const lineChartData = {
		labels: ['0-1 año', '1-2 años', '2-3 años', '3-4 años', '4-5 años', '5-6 años'],
		datasets: [
			{
				label: '',
				data: childrenPerAge,
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

	return <Line data={ lineChartData } options={ lineChartData.options } />
						
};

export default TotalChildrenPerAge;
