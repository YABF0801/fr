// import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useCirculosType } from '../hooks/useCirculosType';

const CirculosType = () => {

	const { queryCirculosType } = useCirculosType();

	const circulos = queryCirculosType.data ? queryCirculosType.data : [];

	const countCirculosType = (circulos) => {
		const countType = circulos.reduce((count, circulo) => {
			const { circulotype } = circulo;
			count[circulotype] = (count[circulotype] || 0) + 1;
			return count;
		}, {});

		return countType;
	};

	const countType = countCirculosType(circulos);

	const userColors = [
		'rgba(54, 162, 205, 0.4)',
		'rgba(255, 159, 104, 0.4)',
		'rgba(185, 149, 162, 0.4)',
		'rgba(123, 122, 225, 0.4)',
		'rgba(75, 192, 192, 0.4)',
	];
	return (
		<div className='row dash-padding'>
				<p className='text-start text-secondary '>Cantidad de circulos rurales y urbanos</p>
						<div className='legend-bar-container '>
							{Object.entries(countType).map(([type, count], index) => (
								<div
									key={type}
									className='legend-bar'
									style={{
										width: `${(count / circulos.length) * 100}%`,
										backgroundColor: userColors[index % userColors.length],
									}}
								>
									<p className='legend-text text-secondary'>
										{type}: {count}
									</p>
								</div>
							))}
						</div>
		</div>
	);
};

export default CirculosType;
