import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import ModalBase from '../../../../common/Modal/Modal';
import Progress from '../../../../common/Progress/ProgressBar';
import { PROPUESTAS_LIST } from '../../../../core/config/routes/paths';
import { useOtorgamientoContext } from '../../../../core/context/OtorgamientoContext';
import { usePropuestasContext } from '../../../../core/context/PopuestasContext';

import DatePickerToOm from './datePicker';

const OmAdministration = () => {
	const [botonComenzarHabilitado, setBotonComenzarHabilitado] = useState(false);
	const [botonCambioDeCursoHabilitado, setBotonCambioDeCursoHabilitado] = useState(false);
	const [botonGenerarPropuestaHabilitado, setBotonGenerarPropuestaHabilitado] = useState(false);
	const [botonFinalizarHabilitado, setBotonFinalizarHabilitado] = useState(false);
	const [showProgressBar, setShowProgressBar] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const { generarPropuestas } = usePropuestasContext();
	const { 
		queryFechaOm, 
		queryContadorCambioCurso, 
		queryContadorPropGeneradas, 
		setContadorProp,
		setContadorCambioCurso, 
		nuevoCurso,
		resetearFecha,
		resetContadoresPropyCc,
		resetArrays,
		resetearConsecutivo
	} = useOtorgamientoContext();

	const navigate = useNavigate();

	const date = new Date(queryFechaOm.data);
	const fechaActual = new Date();

	useEffect(() => {
		const compareDates = () => {
			const compare = date.getTime() <= fechaActual.getTime();
			setBotonComenzarHabilitado(queryFechaOm.data && compare)};
		compareDates();
	}, [queryFechaOm.data, fechaActual]);

	useEffect(() => {
		queryContadorPropGeneradas.data !== 0 && 
		setBotonCambioDeCursoHabilitado(true);
	  }, [queryContadorPropGeneradas.data]);


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
		setBotonCambioDeCursoHabilitado(false);
		await nuevoCurso.mutate();
	};

	useEffect(() => {
		queryContadorCambioCurso.data !== 0 && 
		setBotonGenerarPropuestaHabilitado(true);
		setBotonFinalizarHabilitado(true);
		setBotonComenzarHabilitado(false);
	}, [queryContadorCambioCurso.data]);

	const handleResetConsecutivo = async () => {
		// TODO: para cuando llegue la fecha del otorgamiento
		await resetearConsecutivo.mutate();
	};


	const handleFinalizar = async () => {
		await resetContadoresPropyCc.mutate();
		await resetearFecha.mutate();
		await resetArrays.mutate();
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
								disabled={!botonComenzarHabilitado}
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
								disabled={!botonCambioDeCursoHabilitado}
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
								disabled={!botonGenerarPropuestaHabilitado}
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
								disabled={!botonFinalizarHabilitado}
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
