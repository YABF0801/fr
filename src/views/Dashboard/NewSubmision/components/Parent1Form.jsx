import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const Parent1Schema = Yup.object().shape({
	child: Yup.object().shape({
		parents: Yup.array().of(
			Yup.object().shape({
				parentName: Yup.string().required('Se requiere un nombre'),
				parentLastname: Yup.string().required('Se requiere un apellido'),
				uniqueParent: Yup.boolean(),
				typeParent: Yup.string().required('Se requiere este campo'),
				convivencia: Yup.boolean(),
				parentAddress: Yup.string().when('convivencia', {
					is: false,
					then: Yup.string().required('Se requiere una  dirección'),
				}),
				phoneNumber: Yup.string().required('Se requiere un número de teléfono'),
				occupation: Yup.string(),
				workName: Yup.string(),
				workAddress: Yup.string(),
				jobTitle: Yup.string(),
				organismo: Yup.object().when('typeParent', {
					is: 'madre',
					then: Yup.object().shape({
						name: Yup.string().required('Se requiere un organismo'), weight: Yup.number(), }) }),
				salary: Yup.number(),
				otherChildrenInCi: Yup.boolean(),
				numberOfOtherChildrenInCi: Yup.number().when('otherChildrenInCi', {
					is: true,
					then: Yup.number().required('Especifique la cantidad')}),
				otherChildrenCenter: Yup.string().when('otherChildrenInCi', {
					is: true,
					then: Yup.string().required('Especifique el lugar')}),
				pregnant: Yup.boolean().when('typeParent', {
					is: 'Madre',
					then: Yup.boolean()}),
				deaf: Yup.boolean(),
			})
		),
	}),
	
});

function Parent1Form(submision) {
	 const parentsData = submision.child && submision.child.parents && submision.child.parents.length ? submision.child.parents[0] : {};

	const form = useFormik({
		initialValues: {
			child: {	 	
				parents: [{ 
					parentName: parentsData.parentName || '',
					parentLastname: parentsData.parentLastname || '',
					uniqueParent: parentsData.uniqueParent || false,
					typeParent: parentsData.typeParent || 'madre',
					convivencia: parentsData.convivencia || true,
					parentAddress: parentsData.parentAddress || '',
					phoneNumber: parentsData.phoneNumber || '',
					occupation: parentsData.occupation || 'trabajador',
					workName: parentsData.workName || '',
					workAddress: parentsData.workAddress || '',
					jobTitle: parentsData.jobTitle || '',
					organismo: parentsData.organismo || {
						name: '',
						weight: ''},
					salary: parentsData.salary || '',
					otherChildrenInCi: parentsData.otherChildrenInCi || false,
					numberOfOtherChildrenInCi: parentsData.numberOfOtherChildrenInCi || '',
					otherChildrenCenter: parentsData.otherChildrenCenter || {
						name: ''},
					pregnant: parentsData.pregnant || false,
					deaf: parentsData.deaf || false,  
				}],
			},
			},
		validationSchema: Parent1Schema
		});


	return (      
                        <div id='parent 1'>
								<h3 className='text-center text-secondary '>Datos de los padres o tutores</h3>
								<h6 className="text-secondary mb-4">Comience llenando los datos de la madre o tutora</h6>
					

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
											/>
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
											/>
										</div>

										<div className='col-md-2 '>
											<select
												className='form-select d-inline'
												id='typeParent1'
												name='child.parents[0].typeParent'
												value={form.values.child.parents[0].typeParent}
												onChange={form.handleChange}
											>
												<option>Parentesco</option>
												<option value='madre'>Madre</option>
												<option value='padre'>Padre</option>
												<option value='tutor'>Tutor</option>
												
											</select>
										</div>
								

										<div className='col-md-2 form-check form-switch'>
													<input    
														type="checkbox" 
														className="form-check-input" 
														id='uniqueParent1'
														name='child.parents[0].uniqueParent'
														onChange={form.handleChange}
														value={form.values.child.parents[0].uniqueParent}
													/>
													<label htmlFor='uniqueParent1'>
															Monoparental
													</label>
										</div>

									</div>
								</div>

{/* ************************************************************* */}

								<div className='form-group d-inline justify-content-evenly'>
									<div className='row align-items-center mb-3'>

									<div className='col-md-2 form-check form-switch '>
													<input    
														type="checkbox" 
														className="form-check-input m-1" 
														id='convivencia1'
														name='child.parents[0].convivencia'
														onChange={form.handleChange}
														value={form.values.child.parents[0].convivencia}
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
											/>
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
											/>
										</div>
										
									</div>
								</div>

{/* ******************************************************** */}

								<div className='form-group d-inline justify-content-evenly'>
									<div className='row align-items-center mb-3'>
	
									<div className='col-md-6 d-flex justify-content-evenly '>

										<div className="form-check form-check-inline ">
											<input
												className="form-check-input "
												type="radio"
												id="trabajador1"
												name="child.parents[0].occupation"
												value={form.values.child.parents[0].occupation === 'trabajador'}
												onChange={form.handleChange}
												
											/>
											<label className="form-check-label" htmlFor="trabajador1">
												Trabajador
											</label>
										</div>

										<div className="form-check form-check-inline">
											<input
												className="form-check-input "
												type="radio"
												id="jubilado1"
												name="child.parents[0].occupation"
												value={form.values.child.parents[0].occupation === 'jubilado'}
												onChange={form.handleChange}
												/>
												
											<label className="form-check-label" htmlFor="jubilado1">
												Jubilado
             								 </label>
										</div>

										<div className="form-check form-check-inline ">
											<input
												className="form-check-input "
												type="radio"
												id="asistenciado1"
												name="child.parents[0].occupation"
												value={form.values.child.parents[0].occupation === 'asistenciado'}
												onChange={form.handleChange}
												/>
											
											<label className="form-check-label" htmlFor="asistenciado1">
												Asistenciado
             								 </label>
										</div>

										<div className="form-check form-check-inline ">
											<input
												className="form-check-input "
												type="radio"
												id="estudiante1"
												name="child.parents[0].occupation"
												value={form.values.child.parents[0].occupation === 'estudiante'}
												onChange={form.handleChange}
												/>
											
											<label className="form-check-label" htmlFor="estudiante1">
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
											/>
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
											>
												<option>Organismo</option>
												<option value=''>organismos</option>
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
											/>
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
											/>
										</div>		
										
										<div className='col-md-2 '>
											<input
												type='number'
												className='form-control'
												id='salary1'
												name='child.parents[0].salary'
												placeholder='Salario'
												value={form.values.child.parents[0].salary}
												onChange={form.handleChange}
											/>
										</div>

										
										

									</div>
								</div>

{/* ************************************************************* */}

								<div className='form-group d-inline justify-content-evenly'>
									<div className='row align-items-center mb-3 m-1'>

										<div className='col-md-3  form-check form-switch '>
											<input    
												type="checkbox" 
												className="form-check-input " 
												id='otherChildrenInCi1'
												name='child.parents[0].otherChildrenInCi'
												onChange={form.handleChange}
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
												name='parents[0].numberOfOtherChildrenInCi'
												placeholder='Cantidad'
												value={form.values.child.parents[0].numberOfOtherChildrenInCi}
												onChange={form.handleChange}
											/>
										</div>


										<div className="col-md-3 ">
											<select
												className="form-control"
												id="otherChildrenCenter1"
												name='child.parents[0].otherChildrenCenter'
												value={form.values.child.parents[0].otherChildrenCenter}
												onChange={form.handleChange}
												>
												<option className='text-center' value=""> Seleccione el centro</option>								
												<option value="">otherChildrenCenter</option>
												
											</select>
										</div>

										<div className="col-md-4 ">
										<div className="form-check form-check-inline">
											<input
												className="form-check-input"
												type="checkbox"
												id="pregnant1"
												name='child.parents[0].pregnant'
												value={form.values.child.parents[0].pregnant}
												onChange={form.handleChange}
												
												/>
											<label className="form-check-label" htmlFor="pregnant1">
													Embarazada
											</label>
										</div>

										<div className="form-check form-check-inline ">
											<input
												className="form-check-input"
												type="checkbox"
												id="deaf1"
												name='child.parents[0].deaf'
												value={form.values.child.parents[0].deaf}
												onChange={form.handleChange}
												/>
											
											<label className="form-check-label" htmlFor="deaf1">
											Hipoacúsica
             								 </label>
										</div>
										</div>

									</div>
								</div>

							</div>

);
};

Parent1Form.propTypes = {
	children: PropTypes.arrayOf(PropTypes.object),
};


export default Parent1Form;