import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ModalBase from '../../../../common/Modal/Modal';
import Progress from '../../../../common/Progress/ProgressBar';
import { useOtorgamientoContext } from '../../../../core/context/OtorgamientoContext';
import { usePropuestasContext } from '../../../../core/context/PopuestasContext';
import { propuestasApiGet } from '../../../../core/services/propuestas.services';
import PropuestasListTable from './PropuestasListTable';
import { CustomStepper } from './Stepper';

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

	const [botonComenzar, setBotonComenzar] = useState(false);
	const [showProgressBar, setShowProgressBar] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDateArrived, setisDateArrived] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const fechaActual = new Date();

	useEffect(() => {
		const compareDates = () => {
			if (queryFechaOm.data) {
				const omDate = new Date(queryFechaOm.data);
				const compare = omDate.getTime() <= fechaActual.getTime();
				if (omDate && compare) {
					setisDateArrived(true);
				}
			} else setisDateArrived(false);
		};
		compareDates();
	}, [queryFechaOm.data]);

	useEffect(() => {
		setBotonComenzar(isDateArrived);
	}, [isDateArrived]);

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

	const handleSkip = async () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = async () => {
		setActiveStep(activeStep - 1);
	};

	const handleGenerateProps = async () => {
		try {
			setIsModalOpen(true);
			setShowProgressBar(true);
			setActiveStep(activeStep + 1);
			await generarPropuestas.mutate();

			setTimeout(() => {
				setShowProgressBar(false);
				setIsModalOpen(false);
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
		setActiveStep(2);
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
		await handleRechazarTodo();
	};

	function Comezar() {
		return (
			<div className='d-flex justify-content-center align-items-center flex-column'>
				{!botonComenzar && (
					<>
						<h4 className='om-text-start text-secondary p-2'>
							Una vez que llegue la fecha del otorgamiento masivo se habilitará un botón para que inicie
							el proceso.
						</h4>
						<p className='text-secondary'>Puede establecer la fecha en la pestaña de administración</p>
					</>
				)}

				{botonComenzar && (
					<div className='col-10 mt-3 d-flex justify-content-center align-items-center flex-column'>
						<h3>Bienvenido al proceso de otorgamiento masivo</h3>
						<p className='text-secondary'>
							La fecha establecida ha llegado, ahora puede dar inicio al proceso para generar propuestas
							de asignación de matrículas.
						</p>
						<h4 className='om-text-start text-secondary p-2'>
							Al hacer click en el botón Comenzar se procesarán todas las planillas pendientes que{' '}
							<br></br>
							fueron guardadas para el otorgamiento masivo (OM) anteriores a la fecha establecida.
						</h4>

						<p className='text-secondary'>
							Nota: Una vez comenzado no podrá modificar la fecha hasta el final.
						</p>
						<a
							href='#prop-list'
							type='button'
							id='generar-btn'
							className='btn prop-btn'
							onClick={handleGenerateProps}
						>
							Comenzar
						</a>
					</div>
				)}
			</div>
		);
	}

	function CambioCurso() {
		return (
			<div className='mt-3 d-flex justify-content-center align-items-center flex-column'>
				<p className='text-secondary'>
					Se han procesado y análizado los datos de las planillas y la información de los círculos infantiles
					para generar propuestas de matrículas que podrá encontrar abajo en una tabla.
				</p>

				<h3>Para aceptar o rechazar las propuestas primero debe hacer click en el botón Cambio de curso.</h3>

				<h4 className='om-text-start text-secondary p-2'>
					El cambio de curso modificará la base de datos moviendo las matrículas de los círculos al año{' '}
					<br></br>
					superior y cambiará el año de vida en la planilla de los niños matriculados.{' '}
				</h4>

				<p className='text-secondary'>
					Las propuestas aceptadas pasarán a ser matrícula del círculo asignado mientras que las propuestas
					rechazadas volverán a su estado anterior
				</p>
				<a type='button' id='cambio-btn' onClick={confirmCambioDeCurso} className='btn prop-btn'>
					Cambio de curso
				</a>
			</div>
		);
	}

	function GenerarNew() {
		return (
			<div className='mt-3 d-flex justify-content-center align-items-center flex-column'>
				<p className='text-secondary'>Durante esta etapa del proceso puede</p>
				<h4 className='om-text-start text-secondary pt-2'>
					1. Generar nuevas propuestas tantas veces como lo necesites para aquellas que fueron rechazadas.
				</h4>
				<h4 className='om-text-start text-secondary pb-2'>
					2. Evaluarlas nuevamente y tomar la decisión de aceptar o rechazar estas nuevas propuestas.
				</h4>
				<p className='text-secondary p-2'>
					Tiene la opción de saltar este paso y avanzar directamente hacia la finalización del proceso si
					considera que ya está completo.
				</p>

				<div className='d-flex justify-content-center align-items-center d-flex-inline gap-4'>
					<a type='button' id='generar-btn' className='btn prop-btn' onClick={handleGenerateProps}>
						Generar propuesta
					</a>
					<a type='button' id='generar-btn' className='btn save-btn' onClick={handleSkip}>
						Saltar
					</a>
				</div>
			</div>
		);
	}

	function Finalizar() {
		return (
			<div className='d-flex justify-content-center align-items-center flex-column'>
				<h3 className='p-2'>El proceso ha llegado a su fin</h3>
				<h4 className='om-text-start text-secondary p-2'>
					Al hacer clic en el botón Finalizar, se restablecerá la fecha establecida para este otorgamiento{' '}
					<br></br>Además, todas las propuestas pendientes{' '}
					de aprobación serán rechazadas, lo que marcará el fin del proceso de otorgamiento
				</h4>
				<p className='text-secondary p-2'>Podrá establecer la fecha para el próximo otorgamiento en la pestaña de administración </p>
				<div className='d-flex justify-content-center align-items-center d-flex-inline gap-4'>
					<a type='button' id='generar-btn' className='btn save-btn' onClick={handleBack}>
						Atrás
					</a>
					<a type='button' id='finalizar-btn' className='btn prop-btn' onClick={confirmFinalizarOms}>
						Finalizar
					</a>
				</div>
			</div>
		);
	}

	const steps = [
		{ label: 'Comenzar ', tooltip: 'Comenzar otorgamiento' },
		{ label: 'Cambio de curso', tooltip: 'Cambio de Curso' },
		{ label: 'Generar nuevas', tooltip: 'Generar nuevas propuestas' },
		{ label: 'Finalizar', tooltip: 'Finalizar otorgamiento' },
	];

	function getSectionComponent() {
		switch (activeStep) {
			case 0:
				return <Comezar />;
			case 1:
				return <CambioCurso />;
			case 2:
				return <GenerarNew />;
			case 3:
				return <Finalizar />;
			default:
				return null;
		}
	}
	return (
		<div className='  p-2 '>
			<h2 className='text-center p-3'>Proceso de otorgamiento masivo</h2>
			<div className='card '>
				<div className='card-body '>
					<div>
						<CustomStepper activeStep={activeStep} steps={steps} />

						<div style={{ padding: '20px' }}>
							{getSectionComponent()}

							<div className='p-2 d-flex d-flex-inline justify-content-center'>
								{activeStep !== 0 && activeStep !== steps.length && (
									<button className='cancel-btn' onClick={() => setActiveStep(activeStep - 1)}>
										Previous
									</button>
								)}
								{activeStep !== steps.length - 1 && (
									<button className='save-btn' onClick={() => setActiveStep(activeStep + 1)}>
										Next
									</button>
								)}
							</div>
						</div>
					</div>

					<ModalBase
						show={isModalOpen}
						onHide={() => setIsModalOpen(false)}
						ModalBody={
							<div>
								{showProgressBar && <Progress id={'progress-bar'} label={'Generando propuestas'} />}
							</div>
						}
					/>
				</div>
			</div>

			<PropuestasListTable />
		</div>
	);
};

export default OmAdministration;
