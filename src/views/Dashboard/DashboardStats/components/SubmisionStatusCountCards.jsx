
import { Card, Metric } from '@tremor/react';
import 'chart.js/auto';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useStatusCount } from '../hooks/useStatusCount';

const SubmisionStatusCount = () => {
	const queryStatusCount = useStatusCount();

	const pendiente = (queryStatusCount.data && queryStatusCount.data.pendiente) ? queryStatusCount.data.pendiente : 0;
	const matricula = (queryStatusCount.data &&  queryStatusCount.data?.matricula) ? queryStatusCount.data?.matricula : 0;
	const baja = (queryStatusCount.data &&  queryStatusCount.data?.baja) ? queryStatusCount.data?.baja : 0;

	return (
		<>
		<div className='row dash-padding mt-2'>

		<Card className='card order-card bg-c-blue max-w-xs mx-auto'>
						<h4 className='text-center '>Pendientes</h4>
						{!queryStatusCount.isLoading ? (
							<>
								<Metric className='text-center display-2'>{pendiente}</Metric>
							</>
						) : (
							<SmallSpinner className='m-4 mx-auto' />
						)}

						<hr />

						<h4 className='text-center '>Matrículas</h4>
						{!queryStatusCount.isLoading ? (
							<>
								<Metric className='text-center display-2'>{matricula}</Metric>
							</>
						) : (
							<SmallSpinner className='m-4 mx-auto' />
						)}

						<hr />

						<h4 className='text-center '>Bajas</h4>
						{!queryStatusCount.isLoading ? (
							<>
								<Metric className='text-center display-2'>{baja}</Metric>
							</>
						) : (
							<SmallSpinner className='m-4 mx-auto' />
						)}

					</Card>

			</div>
		</>
	);
};

export default SubmisionStatusCount;
