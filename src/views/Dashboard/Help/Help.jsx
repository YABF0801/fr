import './styles/Help.scss';

const Help = () => {
	return (
		<section className='help'>
			<div className='container-main mt-3 p-2 pb-5'>
				<div className='row justify-content-center text-center'>
					<div className='col-lg-12'>
						<h2 className='text-center text-secondary mt-5'>Ayuda rápida</h2>
						<p className='text-muted title-subtitle mx-auto'>
							Lea esta pequeña ayuda para guiarse en el uso de la aplicación
						</p>
					</div>
				</div>
				<div className='timeline-page mt-5'>

					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='duration date-label-left'>
									<img
										src='../../../../public/planillas.png'
										alt=''
										className='col-11 card-form'
									/> 
								</div>
							</div>
							<div className='col-lg-6 '>
								<div className='works works-description-right'>
									<h4>Nuevas solicitudes de matrícula</h4>
									<p className=' timeline-subtitle'>
										Para registrar una Nueva Solicitud haga click en el ícono {''}
										<i className='bi bi-file-earmark-text'></i> que se encuentra en la barra de navegación. Encontrará una tabla con
										el listado de las planillas y un botón para crear una nueva que le mostrará el formulario a llenar. También 
										tendrá acceso a varios botones que le permitirán filtrar, editar, eliminar y dar baja de la matrícula
										a las planillas guardadas. 
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='works works-description-left'>
								<h4>Estadísticas</h4>
									<p className='timeline-subtitle'>
										Para consultar información estadística puede dirigirse a la barra de navegación
										en el ícono <i className='bi bi-bar-chart-fill'></i> para tener acceso a las
										gráficas y otros datos de su interés.
									</p>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='duration duration-right '>
								<img
										src='../../../../public/stats.png'
										alt=''
										className='col-11 card-form'
									/> 
								</div>
							</div>
						</div>
					</div>

					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='duration date-label-left'>
								<img
										src='../../../../public/circulos-list.png'
										alt=''
										className='col-11 card-form'
									/> 
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='works works-description-right'>
									<h4>Consultar y agregar datos de los cículos</h4>
									<p className='timeline-subtitle '>
										Para consultar y administrar los datos de los círculos infantiles puede dirigirse 
										ícono <i className='bi bi-house-gear'></i> en la barra de navegación que le mostrará un 
										listado con la información le dará acceso crear, editar y filtrar los datos.
										Aquí tendrá además un botón para calcular y mostrar la proyección de matrículas para el próximo curso
										y otro para ver los datos históricos de las matrículas de los últimos años.
									</p>
								</div>
							</div>
						</div>
					</div>


					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='works works-description-left'>
									<h4>Consultar y agregar datos de los organismos</h4>
									<p className='timeline-subtitle'>
										Para ver la información guardada de los organismos puede hacer click en el ícono {''}
										<i className='bi bi-building-gear'></i> en la barra de navegación. 
										<br></br> Se le mostrará un listado con el nombre y la descripción y un botón 
										<br></br> con la opción de agregar un nuevo organismo donde puede especificar si es priorizado.
									</p>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='duration duration-right '>
								<img
										src='../../../../public/organ.png'
										alt=''
										className='col-11 card-form'
									/> 
								</div>
							</div>
						</div>
					</div>


					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6' >
								<div className='duration date-label-left'>
									<  div className='d-flex'>
								<img
										src='../../../../public/fecha.png'
										alt=''
										className='col-5 card-form'
										style={{height:'150px'}}
									/> 
									<img
										src='../../../../public/curso.png'
										alt=''
										className='col-5 card-form'
									/> </div>
									<  div className='d-flex'>
									<img
										src='../../../../public/cons.png'
										alt=''
										className='col-5 card-form'
									/> 
										<img
										src='../../../../public/cpop.png'
										alt=''
										className='col-5 card-form'
										style={{height:'170px'}}
									/> </div>
									
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='works works-description-right'>
									<h4>Administración</h4>
									<p className='timeline-subtitle'>
										En el ícono {''}<i className='bi bi-gear-fill'></i> de la barra de navegación podrá acceder
										a la administración de los usuarios y otros datos generales. 
										<br></br>
										Podrá establecer el curso actual, la fecha del
										próximo otorgamiento, administrar el listado de consejos populares y resetear el número consecutivo de las planillas.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='works works-description-left'>
									<h4>Generar propuestas de matrícula para otorgamiento masivo</h4>
									<p className='timeline-subtitle'>
										Para comenzar el proceso de otorgamiento
										masivo puede encontrar un ícono {''} <i className='bi-list-task'/> en la barra de navegación. 
										<br></br> Cuando llegue la fecha establecida se mostrará un botón para comenzar. 
										Siga las instrucciones y los pasos para generar las propuestas que obtendrá en un listado en el 
										que podrá seleccionar cuales serán aprobadas o rechazadas.

									</p>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='duration duration-right '>
								<img
										src='../../../../public/om.png'
										alt=''
										className='col-10 card-form'
									/>
								<img
										src='../../../../public/otorg.png'
										alt=''
										className='col-12 card-form'
									/>
								</div>
							</div>
						</div>
					</div>

					{/*  VALIDAR PROPUESTAS */}
					<div className='timeline-item'>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='duration date-label-left'>
								<img
										src='../../../../public/prop.png'
										alt=''
										className='col-12 card-form'
									/>
								</div>
							</div>
							<div className='col-lg-6'>
								<div className='works works-description-right'>
									<h4>Aprobar propuestas de matrícula para otorgamiento masivo</h4>
									<p className='timeline-subtitle'>
										Para aprobar las propuestas de nuevas matrículas generadas diríjase al listado que muestra las propuestas, 
										seleccione las que serán aprobadas y haga click en el botón Aceptar propuestas para ver sus opciones. 
										Las propuestas aprobadas pasarán a ser matrícula y las rechazadas volverán a su estado pendiente.
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
