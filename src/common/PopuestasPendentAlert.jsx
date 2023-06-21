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
      }, 1800000); // 900000 ms = 15 minutos
      return () => clearInterval(interval);
    }, []);
  
    console.log(showAlert)

    return (
      showAlert && (
        <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
          Existen {count} propuestas pendientes
        </Alert>
      )
    );
  };
  
  export default PopuestasPendentAlert

 
