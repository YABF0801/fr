import AverageAttendance from './components/AvgAttendance.PolarAreaChart';
import CirculosType from './components/CirculosTypeBar';
import DataCiByYearOfLife from './components/DataCiByYearOfLife.BarChart';
import FamilySituation from './components/FamilySituationCards';
import HeaderStats from './components/HeaderStats';
import MapDashboard from './components/MapDashboard';
import MatriculaPorCP from './components/MatriculaPerCPopular.DoughnutChart';
import SubmisionsRecievedAproved from './components/SubmisionsRecievedAproved.LineChart';
import SubmisionStatusCount from './components/SubmisionStatusCountCards';
import TotalChildrenPerAge from './components/TotalChildrenPerAge.LineChart';
import TotalChildrenPerYear from './components/TotalChildrenPerYear.RadarChart';
import TotalMatricula from './components/TotalMatriculaCards';
import './Dashboard.scss';

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
				<div className='col-md-3'><FamilySituation/></div>
				<div className='col-md-5'><TotalChildrenPerAge/></div>
				<div className='col-md-4'><MapDashboard /> </div>
			</div>

			<div className='row row-dash justify-content-evenly m-2 mb-4'>
				<div className='col-md-5'><DataCiByYearOfLife /></div>
				<div className=' col-md-3'><AverageAttendance /></div>
				<div className='col-md-4'><TotalChildrenPerYear/></div>
			</div>

			<div className='row row-dash justify-content-evenly m-2 mb-4'>
				<CirculosType/>
			</div>

			<div className='row row-dash justify-content-evenly m-2 mb-4'>
				<div className='col-md-3'><SubmisionStatusCount/></div>
	{/* 			<div className='col-md-6'><SubmisionsRecievedAproved /></div> */}
				<div className='col-md-3'><MatriculaPorCP /></div>
			</div>

			
			
			
		</>
	);
};

export default Dashboard;
