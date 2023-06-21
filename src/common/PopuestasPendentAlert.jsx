import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { propuestasApiGet } from '../core/services/propuestas.services';

const PopuestasPendentAlert = () => {
    const [count, setCount] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        const propuestas = await propuestasApiGet();
        setCount(propuestas.length)
      };
      fetchData();
    }, []);
    
    console.log('pcount', count)

    useEffect(() => {
      const interval = setInterval(() => {  
        if (count !== 0 )  {
          setShowAlert(true)
        } else {
          setShowAlert(false)
        }
      }, 7200000); // 900000 ms = 15 minutos
      return () => clearInterval(interval);
    }, []);
  
    console.log(showAlert)

    return (
      showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible
        className='custom-alert'>
          Existen {count} propuestas pendientes
        </Alert>
      )
    );
  };
  
 

  export default PopuestasPendentAlert

 
