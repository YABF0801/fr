import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const Parent2Schema = Yup.object().shape({
	child: Yup.object().shape({
		parents: Yup.array().of(
			Yup.object().shape({
				parentName: Yup.string().required('Se requiere un nombre'),
				parentLastname: Yup.string().required('Se requiere un apellido'),
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
				salary: Yup.number(),
			})
		),
	}),
	
});

function Parent2Form(submision) {
    const parentsData = submision.child && submision.child.parents && submision.child.parents.length ? submision.child.parents[1] : {};

	const form = useFormik({
		initialValues: {
			child: {	 	
				parents: [{},
                    { 
					parentName: parentsData.parentName || '',
					parentLastname: parentsData.parentLastname || '',
					typeParent: parentsData.typeParent || 'madre',
					convivencia: parentsData.convivencia || true,
					parentAddress: parentsData.parentAddress || '',
					phoneNumber: parentsData.phoneNumber || '',
					occupation: parentsData.occupation || 'trabajador',
					workName: parentsData.workName || '',
					workAddress: parentsData.workAddress || '',
					jobTitle: parentsData.jobTitle || '',
					salary: parentsData.salary || '',
				}],
			},
			},
		validationSchema: Parent2Schema
		});

	return (      
                <div id='parent 2'>
                <h3 className='text-center text-secondary'>Datos de los padres o tutores</h3>
                <h6 className="text-secondary mb-4">Continúe con los los datos del padre o tutor</h6>

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
                                /> {form.errors.child?.parents?.[1]?.parentName && form.touched.child?.parents?.[1]?.parentName && (
                                    <p className='text-danger'>{form.errors.child.parents[1].parentName}</p>
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
											/>      {form.errors.child?.parents?.[1]?.parentLastname && form.touched.child?.parents?.[1]?.parentLastname && (
												<p className='text-danger'>{form.errors.child.parents[1].parentLastname}</p>
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
                            > {form.errors.child?.parents?.[1]?.typeParent && form.touched.child?.parents?.[1]?.typeParent && (
                                <p className='text-danger'>{form.errors.child.parents[1].typeParent}</p>
                              )} 
                                <option>Parentesco</option>
                                <option value='madre'>Madre</option>
                                <option value='padre'>Padre</option>
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
                            />{form.errors.child?.parents?.[1]?.phoneNumber && form.touched.child?.parents?.[1]?.phoneNumber && (
                                <p className='text-danger'>{form.errors.child.parents[1].phoneNumber}</p>
                            )}
                        </div>

                    </div>
                </div>

        {/* ************************************************************* */}

                <div className='form-group d-inline justify-content-evenly'>
                    <div className='row align-items-center mb-3'>

                    <div className='col-md-2 form-check form-switch'>
                                    <input    
                                        type="checkbox" 
                                        className="form-check-input m-1" 
                                        id='convivencia2'
                                        name='child.parents[1].convivencia'
                                        onChange={form.handleChange}
                                        onBlur={form.handleBlur}
                                        value={form.values.child.parents[1].convivencia}
                                    />
                                        <label htmlFor='convivencia'>
                                            Convive
                                        </label>
                                        {form.errors.child?.parents?.[1]?.convivencia && form.touched.child?.parents?.[1]?.convivencia && (
													<p className='text-danger'>{form.errors.child.parents[1].convivencia}</p>
												)}
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
                            />{form.errors.child?.parents?.[1]?.parentAddress && form.touched.child?.parents?.[1]?.parentAddress && (
                                <p className='text-danger'>{form.errors.child.parents[1].parentAddress}</p>
                            )}
                        </div>							

                        
                    </div>
                </div>

        {/* ******************************************************** */}

                <div className='form-group d-inline justify-content-evenly'>
                    <div className='row align-items-center '>

                    <div className='col-md-6 mb-3 d-flex justify-content-evenly '>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="trabajador2"
                                name="child.parents[1].occupation"
                                value={form.values.child.parents[1].occupation === 'trabajador'}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                
                            />
                            <label className="form-check-label" htmlFor="trabajador">
                                Trabajador
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="jubilado2"
                                name="child.parents[1].occupation"
                                value={form.values.child.parents[1].occupation === 'jubilado'}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                />
                            
                            <label className="form-check-label" htmlFor="jubilado">
                            Jubilado
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="asistenciado2"
                                name="child.parents[1].occupation"
                                value={form.values.child.parents[1].occupation === 'asistenciado'}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                />
                            
                            <label className="form-check-label" htmlFor="asistenciado">
                            Asistenciado
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="estudiante2"
                                name="child.parents[1].occupation"
                                value={form.values.child.parents[1].occupation === 'estudiante'}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                />
                            
                            <label className="form-check-label" htmlFor="estudiante">
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
                            />{form.errors.child?.parents?.[1]?.workName && form.touched.child?.parents?.[1]?.workName && (
                                <p className='text-danger'>{form.errors.child.parents[1].workName}</p>
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
                            />{form.errors.child?.parents?.[1]?.jobTitle && form.touched.child?.parents?.[1]?.jobTitle && (
													<p className='text-danger'>{form.errors.child.parents[1].jobTitle}</p>
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
                            />{form.errors.child?.parents?.[1]?.workAddress && form.touched.child?.parents?.[1]?.workAddress && (
                                <p className='text-danger'>{form.errors.child.parents[1].workAddress}</p>
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
                            />{form.errors.child?.parents?.[1]?.salary && form.touched.child?.parents?.[1]?.salary && (
                                <p className='text-danger'>{form.errors.child.parents[1].salary}</p>
                            )}
                        </div>

                      

                    </div>
                </div>


               </div>

);
};

Parent2Form.propTypes = {
	children: PropTypes.arrayOf(PropTypes.object),
};

export default Parent2Form;

