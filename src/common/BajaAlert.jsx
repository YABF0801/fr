import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

const BajaAlert = () => {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        //  verificar si existe algún documento con child.year_of_life nulo

        const hasNullYearOfLife = 1+1 === 2;

        setShowAlert(hasNullYearOfLife);

      }, 900000); // 900000 ms = 15 minutos
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      showAlert && (
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
          Existe un documento year_of_life nulo.
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
