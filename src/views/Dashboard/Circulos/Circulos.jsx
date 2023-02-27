import { CirculosList } from './components';
import { CirculoProvider } from './context/CirculoContext';

const Circulos = () => {
	return (
		<div className='circulos'>
			<CirculoProvider>
				<CirculosList />
			</CirculoProvider>
		</div>
	);
};

export default Circulos;
