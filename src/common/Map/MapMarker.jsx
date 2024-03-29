import { useEffect, useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

function MapMarker({ icon, position, onPositionChange }) {
	const [markerPosition, setMarkerPosition] = useState([]); // posición inicial del marcador

	useEffect(() => {
		if (position) {
			setMarkerPosition(position);
		}
	}, [position]);

	const handleClick = (e) => {
		setMarkerPosition([e.latlng.lat, e.latlng.lng]);
		onPositionChange([e.latlng.lat, e.latlng.lng]);
	};

	useMapEvents({
		click: handleClick,
	});

	return markerPosition.length === 0 ? null : (
		<Marker icon={icon} position={markerPosition}>
			<Popup closeButton={false}> Ubicar aquí </Popup>
		</Marker>
	);
}

export default MapMarker;

