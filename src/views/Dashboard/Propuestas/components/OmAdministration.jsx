import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import ModalBase from '../../../../common/Modal/Modal';
import Progress from '../../../../common/Progress/ProgressBar';
import { PROPUESTAS_LIST } from '../../../../core/config/routes/paths';
import { useOtorgamientoContext } from '../../../../core/context/OtorgamientoContext';
import { usePropuestasContext } from '../../../../core/context/PopuestasContext';
import { propuestasApiGet } from '../../../../core/services/propuestas.services';

const OmAdministration = () => {
	const { generarPropuestas, rechazarPropuestas } = usePropuestasContext();
	const { 
		queryFechaOm, 
		queryContadorCambioCurso, 
		queryContadorPropAceptadas,
		queryContadorPropGeneradas, 
		nuevoCurso,
		resetearFecha,
		resetAllContadores,
		resetArrays,
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
	  }, [queryFechaOm.data]);

	console.log('')

	useEffect(() => {
		// Condición 1: Habilitar el botón Comenzar si ha llegado la ffecha y deshabilitara si ya se han geenerado prop
		if (queryContadorPropGeneradas.data !== 0){
			setBotonComenzar(false)
		} else {
		setBotonComenzar(isDateArrived)}
	}, [isDateArrived, queryContadorPropGeneradas.data]);
	
	  useEffect(() => {
		// Condición 2: Habilitar el botón Cambio de Curso si se han generado propuestas una vez y los otros contadores están en 0
		if (
		  queryContadorPropGeneradas.data === 1 &&
		  queryContadorCambioCurso.data === 0 &&
		  queryContadorPropAceptadas.data === 0
		) {
		  setBotonCambioDeCurso(true);
		} else {
		  setBotonCambioDeCurso(false);
		}
	  }, [queryContadorPropGeneradas.data, queryContadorCambioCurso.data, queryContadorPropAceptadas.data]);

	  useEffect(() => {
		// Condición 3: Habilitar el botón Generar propuesta cuando todos los contadores sean diferentes de cero
		if (
		  queryContadorPropGeneradas.data !== 0 &&
		  queryContadorCambioCurso.data !== 0 &&
		  queryContadorPropAceptadas.data !== 0
		) {
		  setBotonGenerarPropuesta(true);
		  setBotonFinalizar(true);
		} else {
		  setBotonGenerarPropuesta(false);
		  setBotonFinalizar(false);
		}
	  }, [queryContadorPropGeneradas.data, queryContadorCambioCurso.data, queryContadorPropAceptadas.data]);

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
			
			setTimeout(() => {
				setShowProgressBar(false);
				navigate(PROPUESTAS_LIST);
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
	};

	return (
		<>
			<div className='card '>
					<div className='card-body '>
				<div className='d-flex flex-inline justify-content-center align-items-center gap-5 '>
															
							<button
								type='button'
								id='generar-btn' 	
								className='btn prop-btn'
								data-tooltip-id='tooltip'
								onClick={handleGenerateProps}
								data-tooltip-content='Comenzar otorgamiento'
								// disabled={!botonComenzar}
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
								// disabled={!botonCambioDeCurso}
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
								// disabled={!botonGenerarPropuesta}
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
								// disabled={!botonFinalizar}
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
			</div>
			</div>
		</>
	);
};

export default OmAdministration;
