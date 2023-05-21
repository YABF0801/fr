import { useEffect, useState } from 'react';
import {circulosPositionGet,
} from '../services/mapCirculosPosition';
import {submisionsPositionGet,
} from '../services/mapSubmisionsPosition';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import L from 'leaflet';

//
// componente 3 separado de MapAndBarChart.jsxs
//

const MapDashboard = () => {
	const [submisionsLocal, setSubmisionsLocal] = useState([]);
	const [circulosLocal, setCirculosLocal] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const submisions = await submisionsPositionGet();
			const circulos = await circulosPositionGet();
			setSubmisionsLocal(submisions);
			setCirculosLocal(circulos);
		};
		fetchData();
	}, []);

	const childIcon = L.icon({
		iconUrl: '/public/kid2.png',
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
		shadowAnchor: [4, 62],
	});

	const ciIcon = L.icon({
		iconUrl: '/public/ci.png',
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
		shadowAnchor: [4, 62],
	});

	return (

								<MapContainer
									className='map-container'
									style={ { width: '100%', height: '400px' } }
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
										url='/public/Tiles/{z}/{x}/{y}.png'
									// https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
									/>

									{ submisionsLocal.map((submision) => (
										<Marker key={ submision._id } position={ submision.child.latlng } icon={ childIcon }>
											<Popup>
												<span className='popup'>
													<h3>{ submision.child.childName + submision.child.childLastname }</h3>
													<p>{ submision.child.childAddress }</p>
													<p>
														Edad: { submision.child.age }, { submision.child.sex }
													</p>
												</span>
											</Popup>
										</Marker>
									)) }

									{ circulosLocal.map((circulo) => (
										<Marker key={ circulo._id } position={ circulo.latlng } icon={ ciIcon }>
											<Popup>
												<div>
													<p>CI { circulo.name }</p>
												</div>
											</Popup>
										</Marker>
									)) }
								</MapContainer>

	);
};

export default MapDashboard;
