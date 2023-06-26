import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ModalBase from '../../../../common/Modal/Modal';
import Progress from '../../../../common/Progress/ProgressBar';
import { useOtorgamientoContext } from '../../../../core/context/OtorgamientoContext';
import { usePropuestasContext } from '../../../../core/context/PopuestasContext';
import { propuestasApiGet } from '../../../../core/services/propuestas.services';
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
			<div className="d-flex justify-content-center align-items-center flex-column">
				<p className='p-3'>vammos a probaar a comenzaar un otorgamiento aqui ccon un botoncito en un ccopoonete</p>
				{botonComenzar && (
					<a
						href='#prop-list'
						type='button'
						id='generar-btn'
						className='btn prop-btn'
						onClick={handleGenerateProps}
					>
						Comenzar
					</a>
				)}
			</div>
		);
	}

	function CambioCurso() {
		return (
			<div className="d-flex justify-content-center align-items-center flex-column">
				<p className='p-3'>ahora lo mismo para el cambio de curso aca</p>
				<a
					type='button'
					id='cambio-btn'
					onClick={confirmCambioDeCurso}
					className='btn prop-btn'
				>
					Cambio de Curso
				</a>
			</div>
		);
	}

	function GenerarNew() {
		return (
			<div className="d-flex justify-content-center align-items-center flex-column">
				<p className='p-3'>ahora lo mismo para el cambio de curso aca</p>
				<a
					type='button'
					id='generar-btn'
					className='btn prop-btn'
					onClick={handleGenerateProps}
				>
					Generar propuesta
				</a>
			</div>
		);
	}

	function Finalizar() {
		return (
			<div className="d-flex justify-content-center align-items-center flex-column">
				<p className='p-3'>y por ultimo finalizamos</p>
				<a
					type='button'
					id='finalizar-btn'
					className='btn prop-btn'
					onClick={confirmFinalizarOms}
				>
					Finalizar
				</a>
			</div>
		);
	}

	const steps = [
		{ label: 'Comenzar ' , tooltip: 'Comenzar otorgamiento'},
		{ label: 'Cambio de curso' , tooltip: 'Cambio de Curso'},
		{ label: 'Generar nuevas' , tooltip: 'Generar nuevas propuestas'},
		{ label: 'Finalizar' , tooltip: 'Finalizar otorgamiento'},
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
		<>
			<div className='card mt-5'>
				<div className='card-body '>
					<h2 className='text-center p-3'>Proceso de otorgamiento masivo</h2>
					<div>
						<CustomStepper 
							activeStep={activeStep}
							steps={steps}		
						/>

				
						<div style={{ padding: '20px' }}>
							{getSectionComponent()}
							<div className='p-5 d-flex d-flex-inline justify-content-center'>
								{activeStep !== 0 && activeStep !== steps.length  && (
									<button className='cancel-btn' onClick={() => setActiveStep(activeStep - 1)}>
										Previous
									</button>
								)}
								{activeStep !== steps.length -1 && (
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
		</>
	);
};

export default OmAdministration;
