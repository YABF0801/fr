import { PropTypes } from 'prop-types';
import { renderSwitchSelect } from '../../../../common/uiForms/imputSwitch';

const Parent2Form = ({ form }) => {
	return (
		<div id='parent2'>
			<hr className='text-secondary' />

			<h3 className='text-center text-secondary mt-4'>Datos de los padres o tutores</h3>
			<h6 className='text-secondary mb-4'>Continúe con los los datos del padre o tutor</h6>

			<div className='container '>
				<div className='row justify-content-center'>
					<div className='col-md-12 '>
						<div className='row justify-content-evenly mb-4'>
							<div className='col-md-4'>
								<input
									type='text'
									className='form-control'
									id='parentName2'
									placeholder='Nombre(s)'
									name='child.parents[1].parentName'
									value={form.values.child?.parents[1]?.parentName}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								{form.errors.child?.parents?.[1]?.parentName &&
									form.touched.child?.parents?.[1]?.parentName && (
										<p className='text-danger'>{form.errors.child?.parents[1].parentName}</p>
									)}
							</div>

							<div className='col-md-6'>
                            <input
									type='text'
									className='form-control'
									id='parentLastname2'
									placeholder='Apellidos'
									name='child.parents[1].parentLastname'
									value={form.values.child?.parents[1].parentLastname}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								{form.errors.child?.parents?.[1]?.parentLastname &&
									form.touched.child?.parents?.[1]?.parentLastname && (
										<p className='text-danger'>{form.errors.child.parents[1].parentLastname}</p>
									)}
							</div>

							<div className='col-md-2'>
								<select
									className='form-select d-inline'
									id='typeParent2'
									name='child.parents[1].typeParent'
									value={form.values.child?.parents[1].typeParent}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								>
									<option value='0'>Parentesco</option>
									<option value='madre'>Madre</option>
									<option value='padre'>Padre</option>
									<option value='tutor'>Tutor</option>
								</select>
							</div>
						</div>

						{/* ************************************************************* */}

						<div className='form-group d-inline justify-content-evenly'>
							<div className='row align-items-center mb-3'>
							<div className='col-md-2'>
								{renderSwitchSelect('child.parents[1].convivencia', 'Convive', form,
								form.values.child?.parents?.[1].convivencia)} 

								</div>

								<div className='col-md-10 '>
									<input
										type='text'
										className='form-control'
										id='parentAddress2'
										placeholder='Dirección...'
										name='child.parents[1].parentAddress'
										value={
											form.values.child?.parents?.[1].convivencia
												? form.values.child.childAddress
												: form.values.child.parents[1].parentAddress
										}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
										disabled={form.values.child?.parents?.[1].convivencia}
									/>
									{form.errors.child?.parents?.[1]?.parentAddress &&
										form.touched.child?.parents?.[1]?.parentAddress && (
											<p className='text-danger'>{form.errors.child.parents[1].parentAddress}</p>
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
										<label className='form-check-label' htmlFor='trabajador'>
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

										<label className='form-check-label' htmlFor='jubilado'>
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

										<label className='form-check-label' htmlFor='asistenciado'>
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

										<label className='form-check-label' htmlFor='estudiante'>
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
										placeholder={
											form.values.child?.parents?.[1].occupation === 'estudiante'
												? 'Nombre del centro de estudios...'
												: 'Nombre del centro de trabajo...'
										}
										value={form.values.child.parents[1].workName}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
										disabled={
											form.values.child?.parents?.[1].occupation !== 'trabajador' &&
											form.values.child?.parents?.[1].occupation !== 'estudiante'
										}
									/>
									{form.errors.child?.parents?.[1]?.workName &&
										form.touched.child?.parents?.[1]?.workName && (
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
										disabled={form.values.child?.parents?.[1].occupation !== 'trabajador'}
									/>
									{form.errors.child?.parents?.[1]?.jobTitle &&
										form.touched.child?.parents?.[1]?.jobTitle && (
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
										disabled={form.values.child?.parents?.[1].occupation !== 'trabajador'}
									/>
									{form.errors.child?.parents?.[1]?.workAddress &&
										form.touched.child?.parents?.[1]?.workAddress && (
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
									/>
									{form.errors.child?.parents?.[1]?.salary &&
										form.touched.child?.parents?.[1]?.salary && (
											<p className='text-danger'>{form.errors.child.parents[1].salary}</p>
										)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Parent2Form.propTypes = {
	form: PropTypes.object.isRequired,
};
export default Parent2Form;
