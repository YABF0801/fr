import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import ModalBase from '../../../../common/Modal/Modal';
import Progress from '../../../../common/Progress/ProgressBar';
import { PROPUESTAS_LIST } from '../../../../core/config/routes/paths';
import { useOtorgamientoContext } from '../../../../core/context/OtorgamientoContext';
import { usePropuestasContext } from '../../../../core/context/PopuestasContext';
import { propuestasApiGet } from '../../../../core/services/propuestas.services';

import DatePickerToOm from './datePicker';

const OmAdministration = () => {
	const { generarPropuestas, rechazarPropuestas } = usePropuestasContext();
	const { 
		queryFechaOm, 
		queryContadorCambioCurso, 
		queryContadorPropAceptadas,
		queryContadorPropGeneradas, 
		setContadorProp,
		setContadorCambioCurso, 
		nuevoCurso,
		resetearFecha,
		resetAllContadores,
		resetArrays,
		resetearConsecutivo
	} = useOtorgamientoContext();

	const navigate = useNavigate();

	const [botonComenzar, setBotonComenzar] = useState(false);
	const [botonCambioDeCurso, setBotonCambioDeCurso] = useState(false);
	const [botonGenerarPropuesta, setBotonGenerarPropuesta] = useState(false);
	const [botonFinalizar, setBotonFinalizar] = useState(false);
	const [isDateArrived, setisDateArrived] = useState(false)

	const [showProgressBar, setShowProgressBar] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fechaActual = new Date();
	
	useEffect(() => {
		const compareDates = () => {
			if (queryFechaOm.data) {
				const omDate = new Date(queryFechaOm.data);
				const compare = omDate.getTime() <= fechaActual.getTime();
				setisDateArrived(omDate && compare);
			}
		};
		compareDates();
		console.log(queryContadorPropAceptadas.data)
	}, [queryFechaOm.data]);
	
	console.log(isDateArrived)

	useEffect(() => {
		if (queryContadorPropGeneradas.data !== 0){
			setBotonComenzar(false)
		} else {
		setBotonComenzar(isDateArrived)}
	}, [isDateArrived]);

	useEffect(() => {
		if (queryFechaOm.data && queryContadorPropAceptadas.data !== 0){
			setBotonCambioDeCurso(true)
		} else {
		setBotonComenzar(isDateArrived)}
	}, [isDateArrived, botonCambioDeCurso]);

	useEffect(() => {
		if (queryFechaOm.data && queryContadorCambioCurso.data !== 0){
			setBotonCambioDeCurso(false)
			setBotonGenerarPropuesta(true)
			setBotonFinalizar(true)
		} 
	}, [botonCambioDeCurso, botonGenerarPropuesta, botonFinalizar]);


	const confirmFinalizarOms = () => {
		confirmAlert({
			message: `Va a dar por finalizado el otorgamiento masivo de este año. ¿Está seguro?`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				{ className: 'save-btn', label: 'Aceptar', onClick: () => handleFinalizar() },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const handleGenerateProps = async () => {
		try {
			setIsModalOpen(true);
			setShowProgressBar(true); 

			await generarPropuestas.mutate();
			await setContadorProp.mutate(1);

			setTimeout(() => {
				setShowProgressBar(false);
				navigate(PROPUESTAS_LIST);
				document.getElementById('props').style.display = 'block';
			}, 3000);
		} catch (error) {
			console.error(error);
		}
	};

	const confirmCambioDeCurso = () => {
		confirmAlert({
			message: (
				<>
					<div>
						<p>Va a ejecutar el cambio de curso, esta acción modificará su base de datos </p>
					</div>
					<div>
						<p>Está seguro? </p>
					</div>
				</>
			),
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},

				{ className: 'save-btn', label: 'Aceptar', onClick: () => handleCambioDeCurso() },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const handleCambioDeCurso = async () => {
		await setContadorCambioCurso.mutate(1);
		await nuevoCurso.mutate();
	};
	
	const handleRechazarTodo = async () => {
		const props = await propuestasApiGet();		
		await rechazarPropuestas.mutate(props);
	};

	const handleFinalizar = async () => {
		await resetAllContadores.mutate();
		await resetearFecha.mutate();
		await resetArrays.mutate();
		handleRechazarTodo();
		document.getElementById('props').style.display = 'none';
	};

	return (
		<>
				{/* <h2 className='text-center mt-2 p-3'>Otorgamiento masivo</h2> */}
				<div className='d-flex flex-column justify-content-center align-items-center gap-5 form-check mb-5'>
						<DatePickerToOm />
														
							<button
								type='button'
								id='generar-btn' 	
								className='btn prop-btn'
								data-tooltip-id='tooltip'
								onClick={handleGenerateProps}
								data-tooltip-content='Comenzar otorgamiento'
								disabled={!botonComenzar}
							>
								Comenzar
							</button>
							
							<button
								type='button'
								id='cambio-btn'
								onClick={confirmCambioDeCurso}
								data-tooltip-id='tooltip'
								className='btn prop-btn'
								data-tooltip-content='Cambio de Curso'
								disabled={!botonCambioDeCurso}
							>
								Cambio de Curso
							</button>
														
							<button
								type='button'
								id='generar-btn'
								className='btn prop-btn'
								data-tooltip-id='tooltip'
								onClick={handleGenerateProps}
								data-tooltip-content='Generar nueva propuesta '
								disabled={!botonGenerarPropuesta}
							>
								Generar propuesta
							</button>
							
							<button
								type='button'
								id='finalizar-btn'
								className='btn prop-btn'
								data-tooltip-id='tooltip'
								onClick={confirmFinalizarOms}
								data-tooltip-content='Finalizar otorgamiento'
								disabled={!botonFinalizar}
							>
								Finalizar
							</button>
						</div>

			<ModalBase
				show={isModalOpen}
				ModalBody={
					<div>{showProgressBar && <Progress id={'progress-bar'} label={'Generando propuestas'} />}</div>
				}
				onHide={() => setIsModalOpen(false)}
			/>
		</>
	);
};

export default OmAdministration;
