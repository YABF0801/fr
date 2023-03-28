
import { useEffect, useState } from 'react';
import { getCapacityAndMatricula, getTotalGirlsAndBoys } from '../service/dashboard.services';
import './Stats.scss';
import MapComponent from './Map';


const Cards = () => {
    const [totalMatricula, setTotalMatricula] = useState(0);
    const [totalCapacidad, setTotalCapacidad] = useState(0);
    const [totalBoys, setTotalBoys] = useState(0);
    const [totalGirls, setTotalGirls] = useState(0);
   
    useEffect(() => {
        const fetchData = async () => {
          const result = await getCapacityAndMatricula();
          setTotalCapacidad(result.NormedCapacity);
          setTotalMatricula(result.Matricula);
        };
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          const result = await getTotalGirlsAndBoys();
          setTotalBoys(result.totalBoys);
          setTotalGirls(result.totalGirls);
        };
        fetchData();
      }, []);


	return (
        <section className='estadisticas'>

        <div className='container-main mt-3 p-3'>
            
            <div className='row mt-3 justify-content-evenly'>
                <div className='col-md-3 col-xl-3'>
                    <div className='card bg-c-yellow order-card'>
                        <div className='card-block'>
                            <h5 className='m-b-10'>Total de Matriculados</h5>
                            <h1 className='text-right display-1'>
                                <span>{totalMatricula}</span>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className='col-md-3 col-xl-3'>
                    <div className='card bg-c-pink order-card'>
                        <div className='card-block'>
                            <h5 className='m-b-10'>Total de Capacidades</h5>
                            <h1 className='text-right display-1'>
                                <span>{totalCapacidad}</span>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className='col-md-3 col-xl-3'>
                    <div className='card bg-c-green order-card'>
                        <div className='card-block'>
                            <h5 className='m-b-10'>Total de Niñas</h5>
                            <h1 className='text-right display-1'>
                                <span>{totalGirls}</span>
                            </h1>
                        </div>
                    </div>
                </div>

                
                <div className='col-md-3 col-xl-3'>
                    <div className='card bg-c-blue order-card'>
                        <div className='card-block'>
                            <h5 className='m-b-10'>Total de Niños</h5>
                            <h1 className='text-right display-1'>
                                <span>{totalBoys}</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <MapComponent/>
        </div>

       
        
    </section>
        );
    };
    
export default Cards;