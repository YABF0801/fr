
import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

const LocationMaker = () => {
	const [latLng, setLatLng] = useState({lat: null, lon: null});
	const map = useMapEvents({
			click(e) {
				map.locate()
				setLatLng({ 
					lat: e.latlng.lat, 
					lng: e.latlng.lng })
			},
			
		})

		return latLng === null ? null : (
			<Marker  position={latLng}>
				<Popup>{JSON.stringify(latLng)}</Popup>
			</Marker>
		)
};

export default LocationMaker;
