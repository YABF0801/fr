//  import Charts from './components/Charts';

import './Dashboard.scss';

import TotalMatricula from './components/TotalMatriculaCards';
import HeaderStats from './components/HeaderStats';

import MapDashboard from './components/MapDashboard';
import AverageAttendance from './components/AvgAttendance.PolarAreaChart';
import DataCiByYearOfLife from './components/DataCiByYearOfLife.BarChart';

import TotalChildrenPerAge from './components/TotalChildrenPerAge.LineChart';
import FamilySituation from './components/FamilySituationCards';
import TotalChildrenPerYear from './components/TotalChildrenPerYear.RadarChart';
import SubmisionsRecievedAproved from './components/SubmisionsRecievedAproved.LineChart';
import MatriculaPorCP from './components/MatriculaPerCPopular.DoughnutChart';

const Dashboard = () => {
	return (
		<>
			<div className='row justify-content-evenly'>
				<HeaderStats />
			</div>

			<div className='row row-dash justify-content-evenly mb-2'>
				<TotalMatricula />
			</div>

			<div className='row row-dash justify-content-evenly m-2 mb-4'>
				<div className='col-md-5'><TotalChildrenPerAge/></div>
				<div className='col-md-4'>	<MapDashboard />  </div>
				<div className='col-md-3'><FamilySituation/></div>
			</div>

			<div className='row row-dash justify-content-evenly m-2 mb-4'>
				<div className='col-md-4'><TotalChildrenPerYear/></div>
				<div className='col-md-5'>	<DataCiByYearOfLife />  </div>
				<div className=' col-md-3'>	 <AverageAttendance />	</div>
			</div>

			<div className='row row-dash justify-content-evenly m-2 mb-4'>
				<div className='col-md-5'><SubmisionsRecievedAproved /></div>
				<div className='col-md-3'><MatriculaPorCP /></div>
				<div className='card-dash col-md-3'>grafico 9</div>
			</div>


			
			
		</>
	);
};

export default Dashboard;
