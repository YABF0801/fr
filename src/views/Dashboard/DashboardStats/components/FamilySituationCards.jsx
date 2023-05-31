import { Card, Metric, Text } from '@tremor/react';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useOtherChildrenInCi } from '../hooks/useOtherChildrenInCi';
import { useSocialCase } from '../hooks/useSocialCase';

const FamilySituation = () => {
	const querySocialCase = useSocialCase();
	const queryOtherChildrenInCi = useOtherChildrenInCi();

	return (
		<>
			<div className='row dash-padding'>
	
					<Card className='card order-card bg-c-blue max-w-xs mx-auto'>
						<h4 className='text-center '>Casos Sociales</h4>
						{!querySocialCase.isLoading ? (
							<>
								<Metric className='text-center mb-1 display-2'>{querySocialCase.data}</Metric>
							</>
						) : (
							<SmallSpinner className='m-4 mx-auto' />
						)}
				
					</Card>
			
			</div>

			<div className='row dash-padding'>
			
					<Card className='card order-card bg-c-blue max-w-xs mx-auto'>
						<h4 className='text-center '>Familias con más de un niño en el CI</h4>
						{!queryOtherChildrenInCi.isLoading ? (
							<>
								<Metric className='text-center mb-1 display-2'>{queryOtherChildrenInCi.data}</Metric>
							</>
						) : (
							<SmallSpinner className='m-4 mx-auto' />
						)}
					</Card>
			
			</div>
		</>
	);
};

export default FamilySituation;
