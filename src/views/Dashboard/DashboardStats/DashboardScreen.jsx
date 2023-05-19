
// import { FechaOmApiGet } from '../../../utils/utiles.sevices';
// import { cursoApiGet } from '../Circulos/service/circulo.services';

// import Charts from './components/Charts';
// import Charts2 from './components/Charts2';
// import MapComponent from './components/MapAndBarChart';

import './Dashboard.scss';
// import { ESTADISTICAS_CHILDREN } from '../../../../core/config/routes/api';
import TotalMatricula from './components/TotalMatricula';

const Dashboard = () => {
	// const [curso, setCurso] = useState();
	// const [date, setDate] = useState(false);
	// const [existingDate, setExistingDate] = useState(false);



	// const dateShow = existingDate ? new Date(date).toLocaleDateString() : '__ / __ / ____';

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const curso = await cursoApiGet();
	// 		setCurso(curso);
	// 	};
	// 	fetchData();
	// }, []);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const omDate = await FechaOmApiGet();
	// 		if (omDate) {
	// 			setDate(omDate);
	// 			setExistingDate(true);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);



	return (
		<section className='estadisticas'>
			<div className='container-main mt-3 p-3'>


				<TotalMatricula />
				{/* <MapComponent /> */ }
				{/* <Charts /> */ }
				{/* <Charts2 /> */ }
			</div>
		</section >
	);
};

export default Dashboard;


