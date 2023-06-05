import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import {
	FechaOmApiGet,
	resetContadorGp,
	setContadorGp,
	resetFechaOm,
	resetToolsArrays,
	getContadorGp,
	setContadorCc,
	getContadorCc,
} from '../../../../utils/utiles.sevices';
import { useNavigate } from 'react-router-dom';
import { PROPUESTAS_LIST } from '../../../../core/config/routes/paths';
import DatePickerToOm from './datePicker';
import { propuestaApiGenerar } from '../../Propuestas/service/propuestas.services';
import { nuevoCursoApiGet } from '../../Circulos/service/circulo.services';
import { consecustiveApiReset } from '../../GeneralList/service/submision.services';
import Progress from '../../../../common/Progress/ProgressBar';
import ModalBase from '../../../../common/Modal/Modal';

const OmAdministration = () => {
	const [botonComenzarHabilitado, setBotonComenzarHabilitado] = useState(false);
	const [botonCambioDeCursoHabilitado, setBotonCambioDeCursoHabilitado] = useState(false);
	const [botonGenerarPropuestaHabilitado, setBotonGenerarPropuestaHabilitado] = useState(false);
	const [botonFinalizarHabilitado, setBotonFinalizarHabilitado] = useState(false);
	const [showProgressBar, setShowProgressBar] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const storedDate = await FechaOmApiGet();
			const date = new Date(storedDate);
			const fechaActual = new Date();

			const compare = date.getTime() <= fechaActual.getTime();
			if (storedDate && compare) {
				setBotonComenzarHabilitado(true);
				/* 	await consecustiveApiReset(); */
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const contadorGP = await getContadorGp();

			if (contadorGP !== 0) {
				setBotonCambioDeCursoHabilitado(true);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const contadorCC = await getContadorCc();
			if (contadorCC !== 0) {
				setBotonGenerarPropuestaHabilitado(true);
				setBotonFinalizarHabilitado(true);
				setBotonComenzarHabilitado(false);
			}
		};
		fetchData();
	}, []);

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
		setIsModalOpen(true);
		setShowProgressBar(true); // Mostrar la barra de progreso

		await propuestaApiGenerar();
		await setContadorGp(1);

		setTimeout(() => {
			setShowProgressBar(false);
			navigate(PROPUESTAS_LIST);
			document.getElementById('props').style.display = 'block';
		}, 3000);
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

	const handleResetConsecutivo = async () => {
		// TODO: para cuando llegue la fecha del otorgamiento
		await consecustiveApiReset();
	};

	const handleCambioDeCurso = async () => {
		await setContadorCc(1);
		setBotonComenzarHabilitado(false);
		await nuevoCursoApiGet();
	};

	const handleFinalizar = async () => {
		await resetContadorGp();
		await resetFechaOm();
		await resetToolsArrays();
	};

	return (
		<section className='list '>
			<div className=' mt-3 p-2 pb-4'>
				<h2 className='text-center mt-2 p-3'>Otorgamiento masivo</h2>
				<div className='card '>
					<div className='card-body '>
						<div className='gap-3 mt-5 form-check d-flex justify-content-between'>
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
					</div>
				</div>
			</div>

			<ModalBase
				show={isModalOpen}
				ModalBody={
					<div>{showProgressBar && <Progress id={'progress-bar'} label={'Generando propuestas'} />}</div>
				}
				onHide={() => setIsModalOpen(false)}
			/>
		</section>
	);
};

export default OmAdministration;
