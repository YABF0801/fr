
import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

const LocationMaker = () => {
	const [latLng, setLatLng] = useState([]);
	const map = useMapEvents({
			click(e) {
				map.locate()
				setLatLng(e.latlng )
			},
			
		})

		return latLng === null ? null : (
			<Marker  position={latLng}>
				<Popup>{JSON.stringify(latLng)}</Popup>
			</Marker>
		)
};

export default LocationMaker;
