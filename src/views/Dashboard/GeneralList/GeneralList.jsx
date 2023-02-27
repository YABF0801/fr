import { PropuestasProvider } from '../Propuestas/context/PopuestasContext';
import { GeneralListTable } from './components';
import { SubmisionProvider } from './context/SumisionContext';

const GeneralList = () => {
	return (
		<div className='submision-list'>
			<SubmisionProvider>
				<PropuestasProvider>
					<GeneralListTable />
				</PropuestasProvider>
			</SubmisionProvider>
		</div>
	);
};

export default GeneralList;
