import { useCirculoContext } from '../context/CirculoContext';
import { useEffect, useState } from 'react';

import { Card } from 'react-bootstrap';

const CirculoCards = () => {
	const { circulos } = useCirculoContext();
  const [data, setData] = useState([]);

  useEffect(() => {
       setData(circulos); 
	   return function cleanUp() {};
    }, [circulos]);


  return (
	<section className='list '>
			<div id='top' className='container-main mt-3 p-2 pb-5'>
				<h2 className='text-center mt-2 p-3'>Listado de Circulos</h2>

					<div className='card-body '>
					<div className='pb-3 mb-4 gap-3 d-flex justify-content-center h-100'>

				{data.map((item) => (
					<Card className='card-form' key={item._id}>
						<Card.Body className='pb-3 mb-4 gap-3 d-flex justify-content-center h-100'>
							<Card.Title className='text-center mt-3 p-3'>{item.name}</Card.Title>
							<Card.Text>{
							<h2 className='text-center mt-2 p-3'>{item.matricula2 + item.matricula3 + item.matricula4 + item.matricula5 + item.matricula6} </h2>
							}</Card.Text>

						</Card.Body>
					</Card>
				))}

				</div>
				</div>
			</div>
		
		</section>
  );
};

export default CirculoCards;

