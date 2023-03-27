import { useEffect, useState } from 'react';
import { submisionsApiGet } from '../../GeneralList/service/submision.services';
import { circulosApiGet } from '../../Circulos/service/circulo.services';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from 'leaflet';
import './Stats.scss';


const Map = () => {
    const [submisionsLocal, setSubmisionsLocal] = useState([]);
    const [circulosLocal, setCirculosLocal] = useState([]);
  

    useEffect(() => {
		const fetchData = async () => {
            const submisions = await submisionsApiGet();
            setSubmisionsLocal(submisions);
          };
          fetchData();
	}, []); 

    useEffect(() => {
		const fetchData = async () => {
            const circulos = await circulosApiGet();
            setCirculosLocal(circulos);
          };
          fetchData();
	}, []); 


      const childIcon = L.icon({ iconUrl: '/public/kid2.png', iconSize: [32, 32], 
      iconAnchor: [16, 32], popupAnchor: [0, -32], shadowAnchor: [4, 62]}); 
  

      const ciIcon = L.icon({ iconUrl: '/public/ci.png', iconSize: [32, 32], 
      iconAnchor: [16, 32], popupAnchor: [0, -32], shadowAnchor: [4, 62]}); 

	return (
        <section className='estadisticas'>

        <div className='container-main mt-3 '>
            
            <div className='row mt-3 justify-content-evenly'>
                <div className='col-md-7 col-xl-7'>
                <canvas className='card' id="myChart" width='800' height="400">


                </canvas>
                </div>

                <div className='col-md-5 col-xl-5'>
                     <div className='row align-items-center'>
										<div className='col-md-12 '>

											<MapContainer className='map-container' style={{ width: '100%', height: '400px' }} 
                                            
                                            center={[21.72761, -82.834167]} zoom={10} scrollWheelZoom={false} >
                                                
												<TileLayer 
													attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
													url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
												// /Tiles/{z}/{x}/{y}.png  
												/>
                                                 <MarkerClusterGroup>
                                                {submisionsLocal.map((submision) => (
                                                <Marker key={submision._id} position={submision.child.latlng} icon={childIcon} >

                                                    <Popup>
                                                    <span className='popup'>
                                                        <h3>{submision.child.childName + submision.child.childLastname}</h3>
                                                        <p>{submision.child.childAdress}</p>
                                                        <p>Edad: {submision.child.age},  {submision.child.sex}</p>
                                                    </span>
                                                    </Popup>
                                                </Marker>
                                                ))}
                                                </MarkerClusterGroup>

                                                 {circulosLocal.map((circulo) => (
                                                <Marker key={circulo._id} position={circulo.latlng} icon={ciIcon}>
                                                <Popup>
                                                    <div>
                                                    <p>CI {circulo.name }</p>
                                                    </div>
                                                </Popup>
                                                </Marker>
                                                ))}
                                               
                                            
											</MapContainer>
                                            
										</div>

									</div>
                </div>
                                                
            </div>
        </div>
    </section>
        );
    };
    
export default Map;
