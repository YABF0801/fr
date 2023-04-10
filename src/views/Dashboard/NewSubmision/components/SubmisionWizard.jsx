import { circulosApiGet } from '../../Circulos/service/circulo.services';
import { consecutiveApiGet } from '../../GeneralList/service/submision.services';
import { organismosApiGet } from '../../Organismos/service/organismo.services';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapMarker from '../../../../common/MapMarker/MapMarker';
import { useNavigate } from 'react-router-dom';
import { GENERAL_LIST } from '../../../../core/config/routes/paths';
import { useSubmisionContext } from '../../GeneralList/context/SumisionContext';
import './SumisionForm.scss';

const SubmisionSchema = Yup.object().shape({
	socialCase: Yup.boolean(),
	finality: Yup.string(),
	submisiontype: Yup.string(),
	motive: Yup.string(),
	ciPedido: Yup.string(),

	child: Yup.object().shape({
		childName: Yup.string().required('Se requiere un nombre'),
		childLastname: Yup.string().required('Se requiere al menos un apellido'),
		carnet: Yup.number().required('Se requiere un número de identificación'),
		year_of_life: Yup.number().required('Seleccione un año de vida'),
		childAdress: Yup.string().required('Se requiere una dirección'),
		neighborhood: Yup.string(),
		cPopular: Yup.string(),
		municipality: Yup.string(),
		province: Yup.string(),
		latlng: Yup.array(),

		circulo: Yup.object().when('finality', {
			is: 'os',
			then: Yup.object().shape({
				_id: Yup.string(),
				name: Yup.string(),
			}),
		}),

		parents: Yup.array().of(
			Yup.object().shape({
				parentName: Yup.string().required('Se requiere un nombre'),
				parentLastname: Yup.string().required('Se requiere un apellido'),
				uniqueParent: Yup.boolean(),
				typeParent: Yup.string(),
				convivencia: Yup.boolean(),
				parentAddress: Yup.string().when('convivencia', {
					is: false,
					then: Yup.string().required('Se requiere una  dirección'),
				}),
				phoneNumber: Yup.string().required('Se requiere un número de teléfono'),
				occupation: Yup.string(),
				workName: Yup.string().when('occupation', {
					is: 'trabajador',
					then: Yup.string().required('Se requiere el nombre del centro de trabajo'),
				}),
				workAddress: Yup.string().when('occupation', {
					is: 'trabajador',
					then: Yup.string().required('Se requiere la dirección del centro de trabajo'),
				}),
				jobTitle: Yup.string().when('occupation', {
					is: 'trabajador',
					then: Yup.string().required('Se requiere el cargo que ocupa'),
				}),
				organismo: Yup.object().when('occupation', {
					is: 'trabajador',
					then: Yup.object().required('Se requiere un organismo'),
				}),
				salary: Yup.number().when('occupation', {
					is: 'trabajador',
					then: Yup.number().required('Escriba el salario'),
				}),
				otherChildrenInCi: Yup.boolean(),
				numberOfOtherChildrenInCi: Yup.number().when('otherChildrenInCi', {
					is: true,
					then: Yup.number().required('Especifique la cantidad'),
				}),
				otherChildrenCenter: Yup.string().when('otherChildrenInCi', {
					is: true,
					then: Yup.string().required('Especifique el círculo'),
				}),
				pregnant: Yup.boolean().when('typeParent', {
					is: 'Madre',
					then: Yup.boolean(),
				}),
				deaf: Yup.boolean(),
			})
		),
	}),
});

function SubmisionWizardForm({ submision }) {
	const { addSubmision, updateSubmision } = useSubmisionContext();
	const [circulosToMap, setCirculosToMap] = useState([]);
	const [newEntryNumber, setNewEntryNumber] = useState(null);
	const [consejosPopulares, setConsejosPopulares] = useState([]);
	const [organismosToMap, setOrganismosToMap] = useState([]);
	const navigate = useNavigate();

	const form = useFormik({
		initialValues: {
			entryNumber: submision ? submision.entryNumber : '',
			socialCase: submision ? submision.socialCase : false,
			finality: submision ? submision.finality : 'om',
			submisiontype: submision ? submision.submisiontype : 'new',
			motive: submision ? submision.motive : '',
			ciPedido: submision ? submision.ciPedido : '',

			child: {
				childName: submision ? submision.child.childName : '',
				childLastname: submision ? submision.child.childLastname : '',
				year_of_life: submision ? submision.child.year_of_life : '',
				carnet: submision ? submision.child.carnet : '',
				childAdress: submision ? submision.child.childAdress : '',
				neighborhood: submision ? submision.child.neighborhood : '',
				cPopular: submision ? submision.child.cPopular : '',
				municipality: submision ? submision.child.municipality : 'Isla de la Juventud',
				province: submision ? submision.child.province : 'Isla de la Juventud',
				latlng: submision ? submision.child.latlng : null,

				parents: [
					{
						parentName: submision ? submision.child.parents[0].parentName : '',
						parentLastname: submision ? submision.child.parents[0].parentLastname : '',
						uniqueParent: submision ? submision.child.parents[0].uniqueParent : false,
						typeParent: submision ? submision.child.parents[0].typeParent : 'madre',
						convivencia: submision ? submision.child.parents[0].convivencia : true,
						parentAddress: submision ? submision.child.parents[0].parentAddress : '',
						phoneNumber: submision ? submision.child.parents[0].phoneNumber : '',
						occupation: submision ? submision.child.parents[0].occupation : 'trabajador',
						workName: submision ? submision.child.parents[0].workName : '',
						workAddress: submision ? submision.child.parents[0].workAddress : '',
						jobTitle: submision ? submision.child.parents[0].jobTitle : '',
						salary: submision ? submision.child.parents[0].salary : 0,
						otherChildrenInCi: submision ? submision.child.parents[0].otherChildrenInCi : false,
						numberOfOtherChildrenInCi: submision ? submision.child.parents[0].numberOfOtherChildrenInCi : 0,
						otherChildrenCenter: submision ? submision.child.parents[0].otherChildrenCenter : '',
						pregnant: submision ? submision.child.parents[0].pregnant : false,
						deaf: submision ? submision.child.parents[0].deaf : false,
					},
					{
						parentName: submision ? submision.child.parents[1].parentName : '',
						parentLastname: submision ? submision.child.parents[1].parentLastname : '',
						typeParent: submision ? submision.child.parents[1].typeParent : 'padre',
						convivencia: submision ? submision.child.parents[1].convivencia : true,
						parentAddress: submision ? submision.child.parents[1].parentAddress : '',
						phoneNumber: submision ? submision.child.parents[1].phoneNumber : '',
						occupation: submision ? submision.child.parents[1].occupation : 'trabajador',
						workName: submision ? submision.child.parents[1].workName : '',
						workAddress: submision ? submision.child.parents[1].workAddress : '',
						jobTitle: submision ? submision.child.parents[1].jobTitle : '',
						salary: submision ? submision.child.parents[1].salary : 0,
					},
				],
			},
		},
		onSubmit: async (values, { resetForm }) => {
			const formData = {
				...values,
			};
			if (submision) {
				await updateSubmision.mutate({ ...values });
			} else {
       
				await addSubmision.mutate(formData);
			}
    
			resetForm();
			navigate(GENERAL_LIST);
		},
		onReset: async () => {
			document.getElementById('submision').style.display = 'none';
		},

		validationSchema: SubmisionSchema,
	});

  console.log(form.values)
  
	useEffect(() => {
		if (submision) {
			form.setValues(submision);
		}
	}, [submision]);

	useEffect(() => {
		const fetchData = async () => {
			const circulos = await circulosApiGet();
			setCirculosToMap(circulos);
			const consecutive = await consecutiveApiGet();
			setNewEntryNumber(consecutive + 1);
			const organismos = await organismosApiGet();
			setOrganismosToMap(organismos);
		};
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/src/utils/ConsejosPopulares.json');
			const data = await response.json();
			setConsejosPopulares(data.consejosPopulares);
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (newEntryNumber) {
			form.setFieldValue('entryNumber', newEntryNumber);
		}
	}, [newEntryNumber]);

	const handleOm = () => {
		form.setFieldValue('finality', 'om');
		if (document.getElementById('om').style.background !== 'indianred') {
			document.getElementById('om').style.background = 'indianred';
			document.getElementById('os').style.background = 'radial-gradient(#686251a6, #635730c2)';
		}
	};

	const handleOs = () => {
		form.setFieldValue('finality', 'os');
		if (document.getElementById('os').style.background !== 'indianred') {
			document.getElementById('os').style.background = 'indianred';
			document.getElementById('os').style.opacity = 1;
			document.getElementById('om').style.background = 'radial-gradient(#0c3d4a, #0c3d4a)';
		}
	};

	const now = new Date().getFullYear();
	const numberLabel = submision ? submision.entryNumber: `${newEntryNumber}/${now}`;

	const markerIcon = L.icon({
		iconUrl: '/public/markerBlue.png',
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
		shadowAnchor: [4, 62],
	});

	const handleLatlngChange = (value) => {
		form.setFieldValue('child.latlng', value);
	};

	return (
		<div
			className='show-form container list mt-3 col-12'
			id='submision'
		>
			<div className=' p-5 '>
				<div className='card'>
					<form
						className='f-modal p-3 gap-3 justify-content-between '
						onSubmit={form.handleSubmit}
					>
						<h2 className='text-center mt-5 p-3'>Nueva Solicitud</h2>

						{/* SUBMISION DATA */}

						<div id='sub'>
							<h3 className='text-center text-secondary '>Datos generales de la planilla</h3>
							<h6 className='text-secondary mb-4'>Introduzca los datos de la planilla de solicitud</h6>

							<div className='form-group '>
								<div className='row d-flex justify-content-center'>
									<div className='col-md-10 mb-10 '>
										<div className='form-group '>
											<div className='row align-items-center mt-3 mb-3'>
												<div className='col-md-3 mb-3'>
													<div className='om-os-group-buttons'>
														<a
															className='btn '
															role='button'
															id='os'
															name='finality'
															onClickCapture={handleOs}
														>
															{' '}
															OS
														</a>
														<a
															className='btn '
															role='button'
															id='om'
															name='finality'
															onClickCapture={handleOm}
														>
															{' '}
															OM
														</a>
													</div>
												</div>
												{/*  ****************************************************** */}

												<div className='col-md-4 mb-4 d-flex justify-content-evenly'>
													<div className='form-check form-check-inline'>
														<input
															className='form-check-input'
															type='radio'
															id='new'
															name='submisiontype'
															value='new'
															defaultChecked
															onChange={form.handleChange}
															onBlur={form.handleBlur}
														/>
														<label
															className='form-check-label'
															htmlFor='new'
														>
															New
														</label>
													</div>

													<div className='form-check form-check-inline'>
														<input
															className='form-check-input'
															type='radio'
															id='traslado'
															name='submisiontype'
															value='traslado'
															onChange={form.handleChange}
															onBlur={form.handleBlur}
														/>

														<label
															className='form-check-label'
															htmlFor='traslado'
														>
															Traslado
														</label>
													</div>
												</div>

												{/*  ****************************************************** */}

												<div className='col-md-2 mb-4 form-check form-switch'>
													<input
														type='checkbox'
														className='form-check-input'
														id='socialCase'
														name='socialCase'
														onChange={form.handleChange}
														onBlur={form.handleBlur}
														value={form.values.socialCase}
													/>
													<label htmlFor='socialCase'>Caso Social</label>
												</div>

												{/*  ****************************************************** */}

												<div className='col-md-3 mb-4 gap-1 d-inline-flex'>
													<label className='m-md-2 d-inline-flex'>No. </label>
													<input
														className='form-control'
														type='text'
														id='entryNumber'
														name='entryNumber'
														placeholder={numberLabel}
														disabled
													/>
												</div>

												{/*  ****************************************************** */}
											</div>
										</div>

										{/*  ****************************************************** */}
										<div className='form-group col-md-12 mb-3 d-flex'>
											<label
												className='col-md-6 m-md-2 text-secondary'
												htmlFor='ciPedido'
											>
												Si se solicita un circulo en particular como preferencia
											</label>
											<select
												className='form-control'
												id='ciPedido'
												name='ciPedido'
												value={form.values.ciPedido}
												onChange={form.handleChange}
												onBlur={form.handleBlur}
											>
												<option className='text-center'>
													------ Seleccione el círculo que solicita-------
												</option>
												{circulosToMap.map((circulo) => (
													<option
														key={circulo._id}
														value={circulo.name}
													>
														{circulo.name}
													</option>
												))}
											</select>
										</div>

										{/*  ****************************************************** */}

										<div className='col-md-12 mb-3 mt-3'>
											<textarea
												className='form-control'
												rows={2}
												id='motive'
												name='motive'
												placeholder='Escriba el motivo de la solicitud...'
												value={form.values.motive}
												onChange={form.handleChange}
												onBlur={form.handleBlur}
											></textarea>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* CHILD DATA */}

						<div id='child'>
							<div className='row d-flex justify-content-center'>
						
									<h3 className='text-center text-secondary'>Datos del menor</h3>
									<h6 className='text-secondary mb-4'>
										Llene la informmación personal del menor, proporcione la dirección particular y
										ubicación geográfica
									</h6>

									<div className='form-group '>
										<div className='row align-items-center mb-2'>
											<div className='col-md-3 '>
												<input
													type='text'
													className='form-control'
													id='childName'
													name='child.childName'
													placeholder='Nombre(s)'
													value={form.values.child.childName}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
											</div>

											<div className='col-md-4 '>
												<input
													type='text'
													className='form-control'
													id='childLastname'
													name='child.childLastname'
													placeholder='Apellidos'
													value={form.values.child.childLastname}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
											</div>

											<div className='col-md-3 '>
												<input
													type='text'
													className='form-control'
													id='carnet'
													name='child.carnet'
													placeholder='CI'
													value={form.values.child.carnet}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
											</div>

											<div className='col-md-2 '>
												<select
													className='form-select d-inline'
													id='year_of_life'
													name='child.year_of_life'
													value={form.values.child.year_of_life}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												>
													<option>Año de vida</option>
													<option value='2'>2</option>
													<option value='3'>3</option>
													<option value='4'>4</option>
													<option value='5'>5</option>
													<option value='6'>6</option>
												</select>
											</div>
										</div>
									</div>

									{/*  ****************************************************** */}

									<div className='form-group '>
										<div className='row align-items-center mb-3'>
											<div className='col-md-5 mb-3 justify-content-between'>
												<div className='mb-3'>
													<textarea
														type='text'
														rows={2}
														className='form-control'
														name='child.childAdress'
														id='childAdress'
														placeholder='Direccion...'
														value={form.values.child.childAdress}
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													></textarea>
												</div>

												<div className='mb-3'>
													<input
														type='text'
														className='form-control'
														placeholder='Localidad (Barrrio)'
														id='neighborhood'
														name='child.neighborhood'
														value={form.values.child.neighborhood}
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													/>
												</div>

												<div className='mb-3'>
													<select
														className='form-select'
														id='cPopular'
														name='child.cPopular'
														value={form.values.child.cPopular}
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													>
														<option>Consejo Popular</option>
														{consejosPopulares.map((consejo) => (
															<option
																key={consejo.nombre}
																value={consejo.nombre}
															>
																{consejo.nombre}
															</option>
														))}
													</select>
												</div>

												<div className='mb-3'>
													<select
														className='form-select'
														id='municipality'
														name='child.municipality'
														value={form.values.child.municipality}
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													>
														<option>Municipio</option>
														<option value='Isla de la Juventud'>Isla de la Juventud</option>
													</select>
												</div>

												<div className='mb-3'>
													<select
														className='form-select'
														id='province'
														name='child.province'
														value={form.values.child.province}
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													>
														{' '}
														<option>Provincia</option>
														<option value='Isla de la Juventud'>Isla de la Juventud</option>
													</select>
												</div>
											</div>

											{/*  ****************************************************** */}

											<div className='col-md-7 p-3'>
												<MapContainer
													className='map-container'
													style={{ width: '100%', height: '300px' }}
													center={[21.72761, -82.834167]}
													zoom={10}
													setView={[21.72761, -82.834167]}
													scrollWheelZoom={true}
													minZoom={9}
													maxBounds={[
														[21.410303, -83.26972], // Suroeste
														[21.961168, -82.531547], // Noreste
													]}
												>
													<TileLayer
														attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
														url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
														// /Tiles/{z}/{x}/{y}.png
													/>

													<MapMarker
														icon={markerIcon}
														onPositionChange={handleLatlngChange}
													/>
												</MapContainer>
											</div>
										</div>
									</div>
								
							</div>
						</div>

						{/* PARENT1 DATA */}

						<div id='parent1'>
							<div className='row d-flex justify-content-center'>
			
									<h3 className='text-center text-secondary '>Datos de los padres o tutores</h3>
									<h6 className='text-secondary mb-4'>
										Comience llenando los datos de la madre o tutora
									</h6>

									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center gap-2 mb-3'>
											<div className='col-md-3 '>
												<input
													type='text'
													className='form-control'
													id='parentName1'
													placeholder='Nombre(s)'
													name='child.parents[0].parentName'
													value={form.values.child.parents[0].parentName}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>{' '}
												{form.errors.child?.parents?.[0]?.parentName &&
													form.touched.child?.parents?.[0]?.parentName && (
														<p className='text-danger'>
															{form.errors.child.parents[0].parentName}
														</p>
													)}
											</div>

											<div className='col-md-4 '>
												<input
													type='text'
													className='form-control'
													id='parentLastname1'
													placeholder='Apellidos'
													name='child.parents[0].parentLastname'
													value={form.values.child.parents[0].parentLastname}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>{' '}
												{form.errors.child?.parents?.[0]?.parentLastname &&
													form.touched.child?.parents?.[0]?.parentLastname && (
														<p className='text-danger'>
															{form.errors.child.parents[0].parentLastname}
														</p>
													)}
											</div>

											<div className='col-md-2 '>
												<select
													className='form-select d-inline'
													id='typeParent1'
													name='child.parents[0].typeParent'
													value={form.values.child.parents[0].typeParent}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												>
													<option>Parentesco</option>
													<option value='madre'>Madre</option>
													<option value='padre'>Padre</option>
													<option value='tutor'>Tutor</option>
												</select>
											</div>

											<div className='col-md-2 form-check form-switch'>
												<input
													type='checkbox'
													className='form-check-input'
													id='uniqueParent1'
													name='child.parents[0].uniqueParent'
													onChange={form.handleChange}
													onBlur={form.handleBlur}
													value={form.values.child.parents[0].uniqueParent}
												/>
												<label htmlFor='uniqueParent1'>Monoparental</label>
											</div>
										</div>
									</div>

									{/* ************************************************************* */}

									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center mb-3'>
											<div className='col-md-2 form-check form-switch '>
												<input
													type='checkbox'
													className='form-check-input m-1'
													id='convivencia1'
													name='child.parents[0].convivencia'
													onChange={form.handleChange}
													onBlur={form.handleBlur}
													value={form.values.child.parents[0].convivencia}
													defaultChecked
												/>
												<label htmlFor='convivencia1'>Convive</label>
											</div>

											<div className='col-md-7 '>
												<input
													type='text'
													className='form-control '
													id='parentAddress1'
													placeholder='Dirección...'
													name='child.parents[0].parentAddress'
													value={form.values.child.parents[0].parentAddress}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[0]?.parentAddress &&
													form.touched.child?.parents?.[0]?.parentAddress && (
														<p className='text-danger'>
															{form.errors.child.parents[0].parentAddress}
														</p>
													)}
											</div>

											<div className='col-md-3 '>
												<input
													type='text'
													className='form-control '
													id='phoneNumber1'
													placeholder='Teléfono'
													name='child.parents[0].phoneNumber'
													value={form.values.child.parents[0].phoneNumber}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[0]?.phoneNumber &&
													form.touched.child?.parents?.[0]?.phoneNumber && (
														<p className='text-danger'>
															{form.errors.child.parents[0].phoneNumber}
														</p>
													)}
											</div>
										</div>
									</div>

									{/* ******************************************************** */}

									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center mb-3'>
											<div className='col-md-6 d-flex justify-content-evenly '>
												<div className='form-check form-check-inline '>
													<input
														className='form-check-input '
														type='radio'
														id='trabajador1'
														name='child.parents[0].occupation'
														value='trabajador'
														onChange={form.handleChange}
														onBlur={form.handleBlur}
														defaultChecked
													/>
													<label
														className='form-check-label'
														htmlFor='trabajador1'
													>
														Trabajador
													</label>
												</div>

												<div className='form-check form-check-inline'>
													<input
														className='form-check-input '
														type='radio'
														id='jubilado1'
														name='child.parents[0].occupation'
														value='jubilado'
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													/>

													<label
														className='form-check-label'
														htmlFor='jubilado1'
													>
														Jubilado
													</label>
												</div>

												<div className='form-check form-check-inline '>
													<input
														className='form-check-input '
														type='radio'
														id='asistenciado1'
														name='child.parents[0].occupation'
														value='asistenciado'
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													/>

													<label
														className='form-check-label'
														htmlFor='asistenciado1'
													>
														Asistenciado
													</label>
												</div>

												<div className='form-check form-check-inline '>
													<input
														className='form-check-input '
														type='radio'
														id='estudiante1'
														name='child.parents[0].occupation'
														value='estudiante'
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													/>

													<label
														className='form-check-label'
														htmlFor='estudiante1'
													>
														Estudiante
													</label>
												</div>
											</div>

											<div className='col-md-6 '>
												<input
													type='text'
													className='form-control'
													id='workName1'
													name='child.parents[0].workName'
													placeholder='Nombre del centro de trabajo...'
													value={form.values.child.parents[0].workName}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[0]?.workName &&
													form.touched.child?.parents?.[0]?.workName && (
														<p className='text-danger'>
															{form.errors.child.parents[0].workName}
														</p>
													)}
											</div>
										</div>
									</div>

									{/* ******************************************************** */}
									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center  mb-3'>
											<div className='col-md-3 '>
												<select
													className='form-select d-inline'
													id='organismo1'
													name='child.parents[0].organismo'
													value={form.values.child.parents[0].organismo}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												>
													<option className='text-center'> Organismo </option>
													{organismosToMap.map((organismo) => (
														<option
															key={organismo._id}
															value={organismo}
														>
															{organismo.name}
														</option>
													))}
												</select>
											</div>

											<div className='col-md-9 '>
												<input
													type='text'
													className='form-control'
													id='jobTitle1'
													name='child.parents[0].jobTitle'
													placeholder='Cargo...'
													value={form.values.child.parents[0].jobTitle}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[0]?.jobTitle &&
													form.touched.child?.parents?.[0]?.jobTitle && (
														<p className='text-danger'>
															{form.errors.child.parents[0].jobTitle}
														</p>
													)}
											</div>
										</div>
									</div>

									{/* ************************************************************* */}

									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center  mb-3'>
											<div className='col-md-10 '>
												<input
													type='text'
													className='form-control'
													id='workAddress1'
													name='child.parents[0].workAddress'
													placeholder='Dirección del centro de trabajo...'
													value={form.values.child.parents[0].workAddress}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[0]?.workAddress &&
													form.touched.child?.parents?.[0]?.workAddress && (
														<p className='text-danger'>
															{form.errors.child.parents[0].workAddress}
														</p>
													)}
											</div>

											<div className='col-md-2 '>
												<input
													type='number'
													className='form-control'
													id='salary1'
													name='child.parents[0].salary'
													value={form.values.child.parents[0].salary}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[0]?.salary &&
													form.touched.child?.parents?.[0]?.salary && (
														<p className='text-danger'>
															{form.errors.child.parents[0].salary}
														</p>
													)}
											</div>
										</div>
									</div>

									{/* ************************************************************* */}

									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center mb-3 m-1'>
											<div className='col-md-3  form-check form-switch '>
												<input
													type='checkbox'
													className='form-check-input '
													id='otherChildrenInCi1'
													name='child.parents[0].otherChildrenInCi'
													onChange={form.handleChange}
													onBlur={form.handleBlur}
													value={form.values.child.parents[0].otherChildrenInCi}
												/>
												<label htmlFor='otherChildrenInCi1'>
													Tiene otros niños en círculo?
												</label>
											</div>

											<div className='col-md-2 '>
												<input
													type='number'
													className='form-control'
													id='numberOfOtherChildrenInCi1'
													name='child.parents[0].numberOfOtherChildrenInCi'
													value={form.values.child.parents[0].numberOfOtherChildrenInCi}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[0]?.numberOfOtherChildrenInCi &&
													form.touched.child?.parents?.[0]?.numberOfOtherChildrenInCi && (
														<p className='text-danger'>
															{form.errors.child.parents[0].numberOfOtherChildrenInCi}
														</p>
													)}
											</div>

											<div className='col-md-3 '>
												<select
													className='form-control'
													id='otherChildrenCenter1'
													name='child.parents[0].otherChildrenCenter'
													value={form.values.child.parents[0].otherChildrenCenter}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												>
													{form.errors.child?.parents?.[0]?.otherChildrenCenter &&
														form.touched.child?.parents?.[0]?.otherChildrenCenter && (
															<p className='text-danger'>
																{form.errors.child.parents[0].otherChildrenCenter}
															</p>
														)}
													<option className='text-center'> Seleccione el círculo </option>
													{circulosToMap.map((circulo) => (
														<option
															key={circulo._id}
															value={circulo.name}
														>
															{circulo.name}
														</option>
													))}
												</select>
											</div>

											<div className='col-md-4 '>
												<div className='form-check form-check-inline'>
													<input
														className='form-check-input'
														type='checkbox'
														id='pregnant1'
														name='child.parents[0].pregnant'
														value={form.values.child.parents[0].pregnant}
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													/>
													<label
														className='form-check-label'
														htmlFor='pregnant1'
													>
														Embarazada
													</label>
												</div>

												<div className='form-check form-check-inline '>
													<input
														className='form-check-input'
														type='checkbox'
														id='deaf1'
														name='child.parents[0].deaf'
														value={form.values.child.parents[0].deaf}
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													/>

													<label
														className='form-check-label'
														htmlFor='deaf1'
													>
														Hipoacúsica
													</label>
												</div>
											</div>
										</div>
									</div>
								
							</div>
						</div>

						{/* PARENT2 DATA */}

						<div id='parent2'>
							<div className='row d-flex justify-content-center'>
								
									<h3 className='text-center text-secondary'>Datos de los padres o tutores</h3>
									<h6 className='text-secondary mb-4'>
										Continúe con los los datos del padre o tutor
									</h6>

									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center'>
											<div className='col-md-3 mb-3'>
												<input
													type='text'
													className='form-control'
													id='parentName2'
													placeholder='Nombre(s)'
													name='child.parents[1].parentName'
													value={form.values.child.parents[1].parentName}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>{' '}
												{form.errors.child?.parents?.[1]?.parentName &&
													form.touched.child?.parents?.[1]?.parentName && (
														<p className='text-danger'>
															{form.errors.child.parents[1].parentName}
														</p>
													)}
											</div>

											<div className='col-md-4 mb-3'>
												<input
													type='text'
													className='form-control'
													id='parentLastname2'
													placeholder='Apellidos'
													name='child.parents[1].parentLastname'
													value={form.values.child.parents[1].parentLastname}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>{' '}
												{form.errors.child?.parents?.[1]?.parentLastname &&
													form.touched.child?.parents?.[1]?.parentLastname && (
														<p className='text-danger'>
															{form.errors.child.parents[1].parentLastname}
														</p>
													)}
											</div>

											<div className='col-md-2 mb-3'>
												<select
													className='form-select d-inline'
													id='typeParent2'
													name='child.parents[1].typeParent'
													value={form.values.child.parents[1].typeParent}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												>
													<option>Parentesco</option>
													<option value='padre'>Padre</option>
													<option value='madre'>Madre</option>
													<option value='tutor'>Tutor</option>
												</select>
											</div>

											<div className='col-md-3 mb-3'>
												<input
													type='text'
													className='form-control'
													id='phoneNumber2'
													placeholder='Teléfono'
													name='child.parents[1].phoneNumber'
													value={form.values.child.parents[1].phoneNumber}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[1]?.phoneNumber &&
													form.touched.child?.parents?.[1]?.phoneNumber && (
														<p className='text-danger'>
															{form.errors.child.parents[1].phoneNumber}
														</p>
													)}
											</div>
										</div>
									</div>

									{/* ************************************************************* */}

									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center mb-3'>
											<div className='col-md-2 form-check form-switch '>
												<input
													type='checkbox'
													className='form-check-input m-1'
													id='convivencia2'
													name='child.parents[1].convivencia'
													onChange={form.handleChange}
													onBlur={form.handleBlur}
													value={form.values.child.parents[1].convivencia}
													defaultChecked
												/>
												<label htmlFor='convivencia2'>Convive</label>
											</div>

											<div className='col-md-10 '>
												<input
													type='text'
													className='form-control'
													id='parentAddress2'
													placeholder='Dirección...'
													name='child.parents[1].parentAddress'
													value={form.values.child.parents[1].parentAddress}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[1]?.parentAddress &&
													form.touched.child?.parents?.[1]?.parentAddress && (
														<p className='text-danger'>
															{form.errors.child.parents[1].parentAddress}
														</p>
													)}
											</div>
										</div>
									</div>

									{/* ******************************************************** */}

									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center '>
											<div className='col-md-6 mb-3 d-flex justify-content-evenly '>
												<div className='form-check form-check-inline'>
													<input
														className='form-check-input'
														type='radio'
														id='trabajador2'
														name='child.parents[1].occupation'
														value='trabajador'
														onChange={form.handleChange}
														onBlur={form.handleBlur}
														defaultChecked
													/>
													<label
														className='form-check-label'
														htmlFor='trabajador'
													>
														Trabajador
													</label>
												</div>

												<div className='form-check form-check-inline'>
													<input
														className='form-check-input'
														type='radio'
														id='jubilado2'
														name='child.parents[1].occupation'
														value='jubilado'
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													/>

													<label
														className='form-check-label'
														htmlFor='jubilado'
													>
														Jubilado
													</label>
												</div>

												<div className='form-check form-check-inline'>
													<input
														className='form-check-input'
														type='radio'
														id='asistenciado2'
														name='child.parents[1].occupation'
														value='asistenciado'
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													/>

													<label
														className='form-check-label'
														htmlFor='asistenciado'
													>
														Asistenciado
													</label>
												</div>

												<div className='form-check form-check-inline'>
													<input
														className='form-check-input'
														type='radio'
														id='estudiante2'
														name='child.parents[1].occupation'
														value='estudiante'
														onChange={form.handleChange}
														onBlur={form.handleBlur}
													/>

													<label
														className='form-check-label'
														htmlFor='estudiante'
													>
														Estudiante
													</label>
												</div>
											</div>

											<div className='col-md-6 mb-3'>
												<input
													type='text'
													className='form-control'
													id='workName2'
													name='child.parents[1].workName'
													placeholder='Nombre del centro de trabajo...'
													value={form.values.child.parents[1].workName}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[1]?.workName &&
													form.touched.child?.parents?.[1]?.workName && (
														<p className='text-danger'>
															{form.errors.child.parents[1].workName}
														</p>
													)}
											</div>
										</div>
									</div>

									{/* ******************************************************** */}
									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center '>
											<div className='col-md-12 mb-3'>
												<input
													type='text'
													className='form-control'
													id='jobTitle2'
													name='child.parents[1].jobTitle'
													placeholder='Cargo...'
													value={form.values.child.parents[1].jobTitle}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[1]?.jobTitle &&
													form.touched.child?.parents?.[1]?.jobTitle && (
														<p className='text-danger'>
															{form.errors.child.parents[1].jobTitle}
														</p>
													)}
											</div>
										</div>
									</div>

									{/* ************************************************************* */}

									<div className='form-group d-inline justify-content-evenly'>
										<div className='row align-items-center mb-3'>
											<div className='col-md-10 mb-3'>
												<input
													type='text'
													className='form-control'
													id='workAddress2'
													name='child.parents[1].workAddress'
													placeholder='Dirección del centro de trabajo...'
													value={form.values.child.parents[1].workAddress}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[1]?.workAddress &&
													form.touched.child?.parents?.[1]?.workAddress && (
														<p className='text-danger'>
															{form.errors.child.parents[1].workAddress}
														</p>
													)}
											</div>

											<div className='col-md-2 mb-3'>
												<input
													type='number'
													className='form-control'
													id='salary2'
													name='child.parents[1].salary'
													placeholder='Salario'
													value={form.values.child.parents[1].salary}
													onChange={form.handleChange}
													onBlur={form.handleBlur}
												/>
												{form.errors.child?.parents?.[1]?.salary &&
													form.touched.child?.parents?.[1]?.salary && (
														<p className='text-danger'>
															{form.errors.child.parents[1].salary}
														</p>
													)}
											</div>
										</div>
									</div>
						
							</div>
						</div>

						{/* END OF DATA */}
{/* 						<div className='mt-4 d-flex w-100 justify-content-center align-items-center gap-5'>
							<button className='btn cancel-btn mb-3'>Atrás</button>

							<a
								href='#top'
								className='btn cancel-btn mb-3'
								type='button'
								onClick={form.handleReset}
							>
								Cancelar
							</a>

							<button
								className='btn save-btn mb-3'
								type='button'
							>
								Siguiente
							</button>

							<button
								className='btn save-btn mb-3'
								type='submit'
							>
								Guardar
							</button>
						</div> */}

            
						<article className=" m-4 d-flex w-100 justify-content-center align-items-center gap-5">

            <a href='#top' className="btn cancel-btn" onClickCapture={form.handleReset}> Cancelar</a>

            <button type="submit" className="btn save-btn"> Guardar</button>

            </article>

					</form>
				</div>
			</div>
		</div>
	);
}

SubmisionWizardForm.propTypes = {
	submision: PropTypes.object,
};

export default SubmisionWizardForm;
