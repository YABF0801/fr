import './Stats.scss';

const Cards = () => {
	return (
        <section className='estadisticas'>
        <div className='container-main mt-3 p-3'>
            
            <div className='row mt-3 justify-content-evenly'>
                <div className='col-md-4 col-xl-4'>
                    <div className='card bg-c-yellow order-card'>
                        <div className='card-block'>
                            <h5 className='m-b-20'>Total de Matriculados</h5>
                            <h1 className='text-right display-1'>
                                <span>2287</span>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className='col-md-4 col-xl-4'>
                    <div className='card bg-c-pink order-card'>
                        <div className='card-block'>
                            <h5 className='m-b-20'>Total de Niñas</h5>
                            <h1 className='text-right display-1'>
                                <span>1092</span>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className='col-md-4 col-xl-4'>
                    <div className='card bg-c-green order-card'>
                        <div className='card-block'>
                            <h5 className='m-b-20'>Total de Niños</h5>
                            <h1 className='text-right display-1'>
                                <span>1195</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>
        );
    };
    
export default Cards;