//  import Charts from './components/Charts';
// import Charts2 from './components/Charts2';
// import MapComponent from './components/MapAndBarChart';

import './Dashboard.scss';

import TotalMatricula from './components/TotalMatriculaCards';
import HeaderStats from './components/HeaderStats';

import MapDashboard from './components/MapDashboard';
import AverageAttendance from './components/AvgAttendance.PolarAreaChart';
import DataCiByYearOfLife from './components/DataCiByYearOfLife.BarChart';
import TotalChildrenByYear from './components/TotalChildrenByYear.RadarChart';
import TotalChildrenPerAge from './components/TotalChildrenPerAge.LineChart';
import FamilySituation from './components/FamilySituationCards';

const Dashboard = () => {
	return (
		<>
			<div className='row justify-content-evenly'>
				<HeaderStats />
			</div>

			<div className='row justify-content-evenly'>
				<TotalMatricula />
			</div>

			<div className='row row-dash justify-content-evenly m-2 mb-4'>
				<div className='col-md-5'><TotalChildrenPerAge/></div>
				<div className='col-md-4'>	<MapDashboard />  </div>
				<div className='col-md-3'><FamilySituation/></div>
			</div>

			<div className='row row-dash justify-content-evenly m-2'>
				<div className='col-md-4'><TotalChildrenByYear/></div>
				<div className='col-md-5'>	<DataCiByYearOfLife />  </div>
				<div className=' col-md-3'>	 <AverageAttendance />	</div>
			</div>

			<div className='row justify-content-evenly'>
				<div className='card-dash col-md-3'>grafico 7</div>
				<div className='card-dash col-md-3'>grafico 8</div>
				<div className='card-dash col-md-3'>grafico 9</div>
			</div>

			{/* <MapComponent /> */}
			{/* <Charts /> */}
			{/* <Charts2 /> */}
		</>
	);
};

export default Dashboard;
