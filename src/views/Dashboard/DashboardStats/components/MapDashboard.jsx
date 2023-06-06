// mapa para mostrar los circulos y niños
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useAllPositions } from '../hooks/useAllPositions';
import { childIcon, ciIcon } from '../../../../common/MapMarker/MarkerIcons';
const MapDashboard = () => {
	const { queryCirculosPosition, querySubmisionsPosition } = useAllPositions();


	const submisions = querySubmisionsPosition.data ? querySubmisionsPosition.data : [];

	const circulos = queryCirculosPosition.data ? queryCirculosPosition.data : [];

	return (
		<MapContainer
			className='map-container '
			style={ { width: '100%', height: '100%' } }
			center={ [21.72761, -82.834167] }
			zoom={ 10 }
			setView={ [21.72761, -82.834167] }
			scrollWheelZoom={ true }
			minZoom={ 9 }
			maxBounds={ [
				[21.410303, -83.26972], // Suroeste
				[21.961168, -82.531547], // Noreste
			] }
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				// url='/public/Tiles/{z}/{x}/{y}.png'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{ !querySubmisionsPosition.isLoading &&
				submisions.map((submision) => (
					<Marker key={ submision._id } position={ submision.child.latlng } icon={ childIcon }>
						<Popup>
							<span className='popup'>
								<h3>{ submision.child.childName + submision.child.childLastname }</h3>
								<p>{ submision.child.childAddress }</p>
								<p>
									Año: { submision.child.year_of_life }, Círculo: { submision.child.circulo.name }
								</p>
							</span>
						</Popup>
					</Marker>
				)) }

			{ !queryCirculosPosition.isLoading &&
				circulos.map((circulo) => (
					<Marker key={ circulo._id } position={ circulo.latlng } icon={ ciIcon }>
						<Popup>
							<div>
								<p>CI { circulo.name }</p>
								<p>
									Cap: { '' }
									{ circulo.normed_capacity2 +
										circulo.normed_capacity3 +
										circulo.normed_capacity4 +
										circulo.normed_capacity5 +
										circulo.normed_capacity6 }

									, Mat: { circulo.matricula2 +
										circulo.matricula3 +
										circulo.matricula4 +
										circulo.matricula5 +
										circulo.matricula6 }</p>
							</div>
						</Popup>
					</Marker>
				)) }


		</MapContainer>
	);
};

export default MapDashboard;
