import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import useTotalMatricula from '../hooks/useTotalMatricula';

import { Card, Metric, Text } from '@tremor/react';

const TotalMatricula = () => {
	const { queryCapacityAndMatricula, queryTotalBoysAndGirls } = useTotalMatricula();

	const porcientoGirls =
		queryTotalBoysAndGirls.data &&
		Math.round((queryTotalBoysAndGirls.data.totalGirls / queryCapacityAndMatricula.data.Matricula) * 100);
	const porcientoBoys =
		queryTotalBoysAndGirls.data &&
		Math.round((queryTotalBoysAndGirls.data.totalBoys / queryCapacityAndMatricula.data.Matricula) * 100);
	const porcientoMatricula =
		queryCapacityAndMatricula.data &&
		Math.round((queryCapacityAndMatricula.data.Matricula / queryCapacityAndMatricula.data.NormedCapacity) * 100);

	return (
		<div className='row dash-padding'>
			<div className='col-md-3'>
				<Card className='card order-card bg-c-yellow max-w-xs mx-auto'>
					<h4 className='text-center '>Total de Capacidades</h4>
					<Metric className='text-center mb-1 display-2'>
						{!queryCapacityAndMatricula.isLoading ? (
							queryCapacityAndMatricula.data.NormedCapacity
						) : (
							<SmallSpinner color={'white'} />
						)}
					</Metric>
					<Text className ='text-secondary'>Capacidades normadas</Text>
				</Card>
			</div>

			<div className='col-md-3'>
				<Card className='card order-card bg-c-pink max-w-xs mx-auto'>
					<h4 className='text-center '>Total de Matriculados</h4>
					<Metric className='text-center mb-1 display-2'>
						{!queryCapacityAndMatricula.isLoading ? (
							queryCapacityAndMatricula.data.Matricula
						) : (
							<SmallSpinner color={'white'} />
						)}
					</Metric>

					{/* 
					{porcientoMatricula && (
				<ProgressBar placeholder='llll' percentageValue={porcientoMatricula} className="mt-2" />)}
 */}
				<Text className ='text-secondary'>{porcientoMatricula}% de la capacidad total</Text>
				</Card>
			</div>

			<div className='col-md-3'>
				<Card className='card order-card bg-c-green max-w-xs mx-auto'>
					<h4 className='text-center '>Total de Niñas</h4>
					<Metric className='text-center mb-1 display-2'>
						{queryTotalBoysAndGirls.isLoading ? (
							<SmallSpinner color={'white'} />
						) : (
							queryTotalBoysAndGirls.data.totalGirls
						)}
					</Metric>
				<Text className ='text-secondary'>{porcientoGirls}% de la matrícula total</Text>

				</Card>
			</div>

			<div className='col-md-3'>
				<Card className='card order-card bg-c-blue max-w-xs mx-auto'>
					<h4 className='text-center '>Total de Niños</h4>
					<Metric className='text-center mb-1 display-2'>
						{queryTotalBoysAndGirls.isLoading ? (
							<SmallSpinner color={'white'} />
						) : (
							queryTotalBoysAndGirls.data.totalBoys
						)}
					</Metric>
					<Text className ='text-secondary'>{porcientoBoys}% de la matrícula total</Text>
				</Card>
			</div>
		</div>
	);
};

export default TotalMatricula;
