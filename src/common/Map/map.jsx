import { MapContainer, TileLayer } from 'react-leaflet';
import MapMarker from './MapMarker';

const MapToLocation =  ({ markerIcon, position, handleLatlngChange }) => {

    return (
		<MapContainer
			className='map-container '
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
			<MapMarker position={position} icon={markerIcon} onPositionChange={handleLatlngChange} />


		</MapContainer>
	);
};

export default MapToLocation;

