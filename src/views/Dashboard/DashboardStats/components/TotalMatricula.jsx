import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import useTotalMatricula from '../hooks/useTotalMatricula';

import { Card, Metric, Text } from '@tremor/react';

const TotalMatricula = () => {
	const { queryCapacityAndMatricula, queryTotalBoysAndGirls } = useTotalMatricula();

	const porcientoGirls = queryTotalBoysAndGirls.data && Math.round(
		(queryTotalBoysAndGirls.data.totalGirls / queryCapacityAndMatricula.data.Matricula) * 100
	);

	const porcientoBoys = queryTotalBoysAndGirls.data && Math.round(
		(queryTotalBoysAndGirls.data.totalBoys / queryCapacityAndMatricula.data.Matricula) * 100
	);

	const porcientoMatricula = queryCapacityAndMatricula.data && Math.round(
		(queryCapacityAndMatricula.data.Matricula / queryCapacityAndMatricula.data.NormedCapacity) * 100
	);

	return (
		<div className='row '>
			<div className='col-md-3'>
				<Card className='card order-card bg-c-yellow max-w-xs mx-auto'>
					<h3 className='text-center '>Total de Capacidades</h3>
					<Metric className='text-center display-1'>
						{!queryCapacityAndMatricula.isLoading ? (
							queryCapacityAndMatricula.data.NormedCapacity
						) : (
							<SmallSpinner color={'#34848f'} />
						)}
					</Metric>
					<Text>Capacidades normadas</Text>
				</Card>
			</div>

			<div className='col-md-3'>
				<Card className='card order-card bg-c-pink max-w-xs mx-auto'>
					<h3 className='text-center '>Total de Matriculados</h3>
					<Metric className='text-center display-1'>
						{!queryCapacityAndMatricula.isLoading ? (
							queryCapacityAndMatricula.data.Matricula
						) : (
							<SmallSpinner color={'#34848f'} />
						)}
					</Metric>
					<Text >{porcientoMatricula}% de la capacidad total</Text>
{/* 
					{porcientoMatricula && (
				<ProgressBar placeholder='llll' percentageValue={porcientoMatricula} className="mt-2" />)}
 */}
				</Card>
			</div>

			<div className='col-md-3'>
				<Card className='card order-card bg-c-green max-w-xs mx-auto'>
					<h3 className='text-center '>Total de Niñas</h3>
					<Metric className='text-center display-1'>
						{queryTotalBoysAndGirls.isLoading ? (
							<SmallSpinner color={'#34848f'} />
						) : (
							queryTotalBoysAndGirls.data.totalGirls
						)}
					</Metric>
					<Text>{porcientoGirls}% de la matrícula total</Text>

				</Card>
			</div>

			<div className='col-md-3'>
				<Card className='card order-card bg-c-blue max-w-xs mx-auto'>
					<h3 className='text-center '>Total de Niños</h3>
					<Metric className='text-center display-1'>
						{queryTotalBoysAndGirls.isLoading ? (
							<SmallSpinner color={'#34848f'} />
						) : (
							queryTotalBoysAndGirls.data.totalBoys
						)}
					</Metric>
					<Text>{porcientoBoys}% de la matrícula total</Text>
				</Card>
			</div>
		</div>
	);
};

export default TotalMatricula;
