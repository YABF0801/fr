import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { yearNullExist } from '../views/Dashboard/GeneralList/service/submision.services';

const BajaAlert = () => {
    const [count, setCount] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        const submisions = await yearNullExist();
        setCount(submisions.length)
      };
      fetchData();
    }, []);
    
    console.log(count)

    useEffect(() => {
      const interval = setInterval(() => {  
        if (count !== 0 )  {
          setShowAlert(true)
        } else {
          setShowAlert(false)
        }
      }, 900000); // 900000 ms = 15 minutos
      return () => clearInterval(interval);
    }, []);
  
    console.log(showAlert)

    return (
      showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          Existen {count} niños que salieron en el cambio de curso para dar baja.
        </Alert>
      )
    );
  };
  
  export default BajaAlert

 


// const CustomAlert = ({ condition, message }) => {
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setShowAlert(condition);
//     }, 900000); // 900000 ms = 15 minutos

//     return () => clearInterval(interval);
//   }, [condition]);

//   return (
//     showAlert && (
//       <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
//         {message}
//       </Alert>
//     )
//   );
// };

// export default CustomAlert;

// <CustomAlert condition={/* Condición */} message="Mensaje de la alerta 1" />
