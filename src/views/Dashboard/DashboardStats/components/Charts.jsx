import { useEffect, useState } from 'react';
import { circulosPositionGet, getAverageAttendance, getCapacityNperYear, getMatriculaPerYear, submisionsPositionGet } from '../service/dashboard.services';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import 'chart.js/auto';

import L from 'leaflet';
import './Stats.scss';
import { Bar } from 'react-chartjs-2';

const Charts = () => {
    const [asistencia, setAttendance] = useState([]);
    const [matricula, setMatricula] = useState([]);
    const [capacidad, setCapacidad] = useState([]);
 

     useEffect(() => {
		const fetchData = async () => {
            const attendances = await getAverageAttendance();
            const matriculas = await getMatriculaPerYear();
            const capacidades = await getCapacityNperYear();
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
 
	return (
        <section className='estadisticas2'>

        <div className='container-main mt-3 '>
            
            <div className='row mt-3 justify-content-evenly'>
                <div className='col-md-6 col-xl-6'>
    
               <Bar data={barChartData} />

                </div>

                <div className='col-md-6 col-xl-6'>
                     <div className='row align-items-center'>
                     <Bar data={barChartData} />

									</div>
                </div>


                                                
            </div>
        </div>
    </section>
        );
    };
    
export default Charts;
