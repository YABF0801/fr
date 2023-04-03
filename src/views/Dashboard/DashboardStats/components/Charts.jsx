import { useEffect, useState } from 'react'; 
import 'chart.js/auto';
import './Stats.scss';
import { Radar, Line } from 'react-chartjs-2';
import { getMatriculaPerYear, getOtherChildrenInCi, getSocialCase,   getTotalBoysPerYear, getTotalChildrenPerAge, getTotalGirlsAndBoys, getTotalGirlsPerYear } from '../service/dashboard.services';

const Charts = () => {
    const [totalchildrenByYear, setTotalchildrenByYear] = useState([]);
    const [girlsByYear, setGirlsByYear] = useState([]);
    const [boysByYear, setBoysByYear] = useState([]);
    const [totalGirlsAndBoys, setTotalGirlsAndBoys] = useState();
    const [childrenPerAge, setChildrenPerAge] = useState([]);
    const [totalSocialCase, setTotalSocialCase] = useState(0);
    const [haveOtherChildren, setHaveOtherChildren] = useState (0);
   
     useEffect(() => {
		const fetchData = async () => {
            const totalchildren = await getMatriculaPerYear();
            const girls = await getTotalGirlsPerYear();
            const boys = await getTotalBoysPerYear();
            const boysAndGilrs = await getTotalGirlsAndBoys();
            const childrenAge = await getTotalChildrenPerAge();
            setTotalchildrenByYear(totalchildren);
            setGirlsByYear(girls)
            setBoysByYear(boys)
            setTotalGirlsAndBoys(boysAndGilrs)
            setChildrenPerAge(childrenAge)
            };
            fetchData();
          }, []); 

          useEffect(() => {
            const fetchData = async () => {
                    const socialCase = await getSocialCase();
                    setTotalSocialCase(socialCase)
                    };
                    fetchData();
                  }, []); 
        
                  useEffect(() => {
                    const fetchData = async () => {
                            const otherChildren = await getOtherChildrenInCi();
                            setHaveOtherChildren(otherChildren)
                            };
                            fetchData();
                          }, []); 
        
          const radarChartData = {
            labels: ['2do', '3ro', '4to', '5to', '6to'],
            datasets: [
              {
                label: 'Totales',
                data: boysByYear,
                fill: true,
                backgroundColor: 'rgba(225, 179, 104, 0.2)', 
                borderColor: 'rgba(225, 179, 104, 0.8)', 
                tension: 0.1, pointBorderWidth:3
              },
              {
                label: 'Niñas ',
                data: girlsByYear,
                fill: true,
                backgroundColor: 'rgba(225, 129, 124, 0.2)',
                borderColor: 'rgba(225, 129, 124, 0.8)',
                tension: 0.1, pointBorderWidth:3
              },
              {
                label: 'Niños',
                data: totalchildrenByYear,
                fill: true,
                backgroundColor: 'rgba(125, 192, 202, 0.2)',
                borderColor: 'rgba(125, 192, 202, 0.8)',
                tension: 0.1, pointBorderWidth:3
              }
            ],
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                r: {
                  ticks: {
                    beginAtZero: true,
                    precision: 0 
                  }
                }
              },
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  text: 'Datos de los niños por año de vida'
                }
              }
            }
            
          };
 
           const lineChartData = {
            labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6'],
            datasets: [
              {
                label: '',
                data: childrenPerAge,
                fill: true,
                backgroundColor: 'rgba(75, 162, 180, 0.3)',
                borderColor: 'rgba(75, 162, 180, 1)',
                tension: 0.3, pointBorderWidth:3
              },
            ],
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: 'Cantidad de niños por edades'
                }
              },
              maintainAspectRatio: false,
              scales: {
                y: {
                    min: 0,
                    max: 20,
                    ticks: {
                        stepSize: 3
                    }
                }
            }
            }
            
          };
 
 
	return (
        <section className='estadisticas2'>

        <div className='container-main mt-3 '>
            
            <div className='row mt-5 justify-content-evenly'>
                <div className='col-md-4 col-xl-4'>
    
               <Radar data={radarChartData} options={radarChartData.options}/>

                </div>

                <div className='col-md-6 col-xl-6'>
                     <div className='row align-items-center'>
                     <Line data={lineChartData} options={lineChartData.options} />
                      
									</div>
                </div>

                <div className='col-md-1 col-xl-1'>
                <div className='row '>
                    <div className='card bg-c-blue2 order-card'>
                        <div className='card-block'>
                            <p className='m-b-10'>Casos Sociales</p>
                            <h4 className='text-right display-5'>
                                <span>{totalSocialCase}</span>
                            </h4>
                        </div>
                    </div>
                </div>

                <div className='row '>
                    <div className='card bg-c-blue2 order-card'>
                        <div className='card-block'>
                            <p className='m-b-10'>Familias con más de un niño en el CI</p>
                            <h4 className='text-right display-5'>
                                <span>{haveOtherChildren}</span>
                            </h4>
                        </div>
                    </div>
                </div>

                </div>                           
            </div>


        </div>
    </section>
        );
    };
    
export default Charts;
