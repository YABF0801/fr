import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { propuestasApiGet } from '../../views/Dashboard/Propuestas/service/propuestas.services';

 
function Pill({id}) {
  const [countProps, setCountProps] = useState(0);

  useEffect(() => {
    // Lógica para obtener la cantidad de documentos actualizada
    const fetchData = async () => {
      const propuestas = await propuestasApiGet(); 
      const count = propuestas.length// Llama a tu función API para obtener la cantidad de documentos
      setCountProps(count);
    };
    fetchData();
  }, []);


  return (
    <div>
      <Badge 
      pill 
      id={id}
      bg="danger"
      className='badge-notification translate-middle-y '>
        {countProps}
      </Badge>
    </div>
  );
}

export default Pill;