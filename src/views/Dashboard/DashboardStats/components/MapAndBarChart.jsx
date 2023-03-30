import { useEffect, useState } from 'react';
import { circulosPositionGet, getAverageAttendance, getCapacityNperYear, getMatriculaPerYear, submisionsPositionGet } from '../service/dashboard.services';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'chart.js/auto';

import L from 'leaflet';
import './Stats.scss';
import { Bar } from 'react-chartjs-2';

const MapComponent = () => {
    const [submisionsLocal, setSubmisionsLocal] = useState([]);
    const [circulosLocal, setCirculosLocal] = useState([]);
    const [asistencia, setAttendance] = useState([]);
    const [matricula, setMatricula] = useState([]);
    const [capacidad, setCapacidad] = useState([]);
 

     useEffect(() => {
		const fetchData = async () => {
            const submisions = await submisionsPositionGet();
            const circulos = await circulosPositionGet();
            const attendances = await getAverageAttendance();
            const matriculas = await getMatriculaPerYear();
            const capacidades = await getCapacityNperYear();
                setSubmisionsLocal(submisions);
                setCirculosLocal(circulos); 
                setAttendance(attendances);
                setMatricula(matriculas)
                setCapacidad(capacidades)
            };
            fetchData();
          }, []); 
        
          const barChartData = {
            labels: ['2do', '3ro', '4to', '5to', '6to'],
            datasets: [
              {
                label: 'Porciento de asistencia por año de vida',
                data: asistencia,
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.5)',
                borderColor: 'rgba(75,192,192,1)'
              },
              {
                label: 'Matricula total por año de vida ',
                data: matricula,
                fill: true,
                backgroundColor: 'rgba(150,192,102,0.5)',
                borderColor: 'rgba(150,192,102,1)'
              },
              {
                label: 'Capacidad normada por año de vida',
                data: capacidad,
                fill: true,
                backgroundColor: 'rgba(150,122,102,0.5)',
                borderColor: 'rgba(150,122,102,1)'
              }
            ],
          };

      const childIcon = L.icon({ iconUrl: '/public/kid2.png', iconSize: [32, 32], 
      iconAnchor: [16, 32], popupAnchor: [0, -32], shadowAnchor: [4, 62]}); 
  
      const ciIcon = L.icon({ iconUrl: '/public/ci.png', iconSize: [32, 32], 
      iconAnchor: [16, 32], popupAnchor: [0, -32], shadowAnchor: [4, 62]}); 
  
	return (
        <section className='estadisticas'>

        <div className='container-main mt-3 '>
            
            <div className='row mt-3 justify-content-evenly'>
                <div className='col-md-7 col-xl-7'>   
               <Bar data={barChartData} />

                </div>

                <div className='col-md-5 col-xl-5'>
                     <div className='row align-items-center'>
										<div className='col-md-12 '>

										
                                            <MapContainer className='map-container' style={{ width: '100%', height: '400px' }} 
                                            center={[21.72761, -82.834167]} zoom={10}  setView={[21.72761, -82.834167]} scrollWheelZoom={true} >
												<TileLayer 
													attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
													url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
												// /Tiles/{z}/{x}/{y}.png  
												/>
                                           

                                            
                                            {submisionsLocal.map((submision) => (
                                            <Marker
                                                key={submision._id}
                                                position={submision.child.latlng}
                                                icon={childIcon}
                                            >
                                                <Popup>
                                                    <span className='popup'>
                                                        <h3>{submision.child.childName + submision.child.childLastname}</h3>
                                                        <p>{submision.child.childAddress}</p>
                                                        <p>Edad: {submision.child.age}, {submision.child.sex}</p>
                                                    </span>
                                                </Popup>
                                            </Marker>
                                        ))}

                                        {circulosLocal.map((circulo) => (
                                            <Marker 
                                            key={circulo._id} 
                                            position={circulo.latlng} 
                                            icon={ciIcon}>
                                                <Popup>
                                                    <div>
                                                        <p>CI {circulo.name}</p>
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
    
export default MapComponent;
