import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { FechaOmApiGet } from '../utils/utiles.sevices';

const omDateAlert = () => {
	const [fecha, setFecha] = useState();
	const [showAlert, setShowAlert] = useState(true);
	const [isDateArrived, setisDateArrived] = useState(false);

	const fetchData = async () => {
		const omDate = await FechaOmApiGet();
		setFecha(omDate);
	};

	const compareDates = () => {
		const fechaActual = new Date();
    const fechaOm = new Date(fecha)
		const compare = fechaOm.getTime() !== fechaActual.getTime();
		setisDateArrived(compare);
	};

	useEffect(() => {
		fetchData();
		compareDates();
	}, []);

	console.log('compre', isDateArrived);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowAlert(isDateArrived);
		}, 7200000); // 900000 ms = 15 minutos
		return () => clearInterval(interval);
	}, []);

	console.log('show', showAlert);

	return (
		showAlert && (
			<Alert variant='info' onClose={() => setShowAlert(false)} dismissible
      className='custom-alert'>
				La fecha de otorgamiento ha llegado
			</Alert>
		)
	);
};
export default omDateAlert
 
