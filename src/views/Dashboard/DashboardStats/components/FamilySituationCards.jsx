import { Card, Metric } from '@tremor/react';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useOtherChildrenInCi } from '../hooks/useOtherChildrenInCi';
import { useSocialCase } from '../hooks/useSocialCase';

const FamilySituation = () => {
	const querySocialCase = useSocialCase();
	const queryOtherChildrenInCi = useOtherChildrenInCi();

	const socialCases = querySocialCase.data ? querySocialCase.data : 0;
	const OtherChildren = queryOtherChildrenInCi.data ? queryOtherChildrenInCi.data : 0;

	return (
		<>
			<div className='row dash-padding mt-2'>
	
					<Card className='card order-card bg-c-blue max-w-xs mx-auto'>
						<h4 className='text-center '>Casos Sociales</h4>
						{!querySocialCase.isLoading ? (
							<>
								<Metric className='text-center m-3 display-2'>{socialCases}</Metric>
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
								<Metric className='text-center m-3 display-2'>{OtherChildren}</Metric>
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
