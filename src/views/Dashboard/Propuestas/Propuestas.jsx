import { SubmisionProvider } from '../GeneralList/context/SumisionContext';
import { PropuestasProvider } from './context/PopuestasContext';
import { PropuestasListTable } from './components';


const Propuestas = () => {
	return (
		<div className='propuestas-list'>
			<SubmisionProvider>
				<PropuestasProvider>
					<PropuestasListTable />
				</PropuestasProvider>
			</SubmisionProvider>
		</div>
	);
};

export default Propuestas;
