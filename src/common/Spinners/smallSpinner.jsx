import './Spinners.scss';
import FadeLoader from 'react-spinners/FadeLoader';

const SmallSpinner = ({ color, className, data }) => {
	return (
		<>
			<FadeLoader
				className={className}
				color={color || 'white'}
				height={5}
				width={5}
				radius={2}
				speedMultiplier={1}
			/>

			{data ? (
				<h6 className='text-center'>Cargando {data}</h6>
			) : (
				<h6 className='text-center'>Cargando datos...</h6>
			)}
		</>
	);
};
export default SmallSpinner;

