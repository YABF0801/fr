import './styles/Help.scss';

const Help = () => {
	return (
		<section className='help'>
			<div className='container-main mt-3 p-3'>
				<div className='row justify-content-center text-center'>
					<div className='col-lg-12'>
						<h2 className='text-center text-secondary mt-5'>Ayuda rápida</h2>
						<p className='text-muted title-subtitle mx-auto'>
							Lea esta pequeña ayuda para guiarse en el uso de la aplicación
						</p>
					</div>
				</div>
				<div className='timeline-page mt-5'>
					{/*    Nuevas solicitudes de matrícula */}
					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='duration date-label-left'>
									{/*   PONER CAPTURA DE PANTALLA DE FORM */}
									{/* <img
										src='https://bootdey.com/img/Content/avatar/avatar1.png'
										alt=''
										className='img-fluid rounded-circle'
									/> */}
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='works works-description-right'>
									<h4>Nuevas solicitudes de matrícula</h4>
									<p className='timeline-subtitle'>
										Para registrar una Nueva Solicitud haga click en el ícono
										<i className='bi bi-plus-lg'></i> que se encuentra en la barra de navegación, a
										continuación llene el formulario con todos los datos requeridos y guarde.
										Recibirá una confirmación de guardado junto con el número de entrada
									</p>
								</div>
							</div>
						</div>
					</div>

					{/*  Consultar Datos de los niños */}
					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='works works-description-left'>
									<h4>Consultar Datos de los niños</h4>
									<p className='timeline-subtitle'>
										Para consultar información guardada de las planillas de cada niño, con solictud
										pendiente o matrículado, haga click en el ícono <i className='bi bi-files'></i>
										que se encuentra en la barra de navegación. Se le mostrará un listado general
										con las opciones de búsqueda y ordenar cada columna de la tabla
									</p>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='duration duration-right '>
									{/* <img
										src='https://bootdey.com/img/Content/avatar/avatar6.png'
										alt=''
										className='img-fluid rounded-circle'
									/> */}
								</div>
							</div>
						</div>
					</div>

					{/* Estadísticas */}
					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='duration date-label-left'>
									{/* <img
										src='https://bootdey.com/img/Content/avatar/avatar7.png'
										alt=''
										className='img-fluid rounded-circle'
									/> */}
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='works works-description-right'>
									<h4>Estadísticas</h4>
									<p className='timeline-subtitle'>
										Para consultar información estadística puede dirigirse a la barra de navegación
										en el ícono <i className='bi bi-bar-chart-fill'></i> para tener acceso a las
										gráficas y otros datos de su interés
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Consultar y agregar datos de los círculos */}
					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='works works-description-left'>
									<h4>Consultar y agregar datos de los círculos</h4>
									<p className='timeline-subtitle'>
										Para consultar los datos básicos de los círculos infantiles haga click en el
										ícono <i className='bi bi-house-gear'></i> que puede encontrar en la barra de
										navegación. Se le mostrará un listado con la información y un botón con la
										opción de agregar un nuevo cículo para lo que tendrá que completar un formulario
										con los datos requeridos
									</p>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='duration duration-right '>
									{/* <img
										src='https://bootdey.com/img/Content/avatar/avatar6.png'
										alt=''
										className='img-fluid rounded-circle'
									/> */}
								</div>
							</div>
						</div>
					</div>

					{/* Consultar y agregar datos de los organismos */}
					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='duration date-label-left'>
									{/* <img
										src='https://bootdey.com/img/Content/avatar/avatar7.png'
										alt=''
										className='img-fluid rounded-circle'
									/> */}
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='works works-description-right'>
									<h4>Consultar y agregar datos de los organismos</h4>
									<p className='timeline-subtitle'>
										Para ver la información guardada de los organismos puede hacer click en el ícono
										<i className='bi bi-building-gear'></i> en la barra de navegación. Se le
										mostrará un listado con el nombre y la descripción y un botón con la opción de
										agregar un nuevo organismo para lo que tendrá que completar un formulario con
										los datos requeridos y especificar si es priorizado
									</p>
								</div>
							</div>
						</div>
					</div>

					{/*  GENERAR PROPUESTAS */}
					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='works works-description-left'>
									<h4>Generar propuestas de matrícula para otorgamiento masivo</h4>
									<p className='timeline-subtitle'>
										Para ver las propuestas de nuevas matrículas para la etapa de otorgamiento
										masivo puede encontrar un botón abajo a la derecha del listado general. Generará
										las propuestas y activará una nueva pantalla en la que se mostrarán en un
										listado. Puede accceder a esta pantalla en el nuevo ícono{' '}
										<i className='bi bi-ui-checks'></i>
									</p>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='duration duration-right '>
									{/* <img
										src='https://bootdey.com/img/Content/avatar/avatar6.png'
										alt=''
										className='img-fluid rounded-circle'
									/> */}
								</div>
							</div>
						</div>
					</div>

					{/*  VALIDAR PROPUESTAS */}
					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='duration date-label-left'>
									{/* <img
										src='https://bootdey.com/img/Content/avatar/avatar7.png'
										alt=''
										className='img-fluid rounded-circle'
									/> */}
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='works works-description-right'>
									<h4>Aprobar propuestas de matrícula para otorgamiento masivo</h4>
									<p className='timeline-subtitle'>
										Para aprobar las propuestas de nuevas matrículas generadas diríjase a la nueva
										página donde se muestra el listado a través del ícono{' '}
										<i className='bi bi-ui-checks'></i> en la barra de navegación. Seleccione las
										que fueron aceptadas por la Comisión de Otrogamiento y presione el botón aceptar
										que econtrará abajo a la derecha.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* NOTA FINAL */}
					<div className='row justify-content-center text-center'>
						<div className='col-lg-12'>
							<p className='text-danger title-subtitle mx-auto'>
								Revise con cuidado antes de manipular los datos. Toda la información agregada, editada o
								eliminada actualizará la base de datos de la aplicación y por tanto modificará la
								información.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Help;
