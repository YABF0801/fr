import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import InputSwitch from '../../../../common/uiForms/imputSwitch';
import Select from '../../../../common/uiForms/select';

import { circulosApiGet } from '../../Circulos/service/circulo.services';
import { organismosApiGet } from '../../Organismos/service/organismo.services';

const Parent1Form = ({ form }) => {
	const [organismosToMap, setOrganismosToMap] = useState([]);
	const [circulosToMap, setCirculosToMap] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const circulos = await circulosApiGet();
			setCirculosToMap(circulos);

			const organismos = await organismosApiGet();
			setOrganismosToMap(organismos);
		};
		fetchData();
	}, []);

	console.log('org',form.values.child.parents[0].organismo)
	console.log('uniqs',form.values.child.parents[0].uniqueParent)

	return (
		<div id='parent1'>
			<hr className='text-secondary' />

			<h3 className='text-center text-secondary mt-4'>Datos de los padres o tutores</h3>
			<h6 className='text-secondary mb-4'>Comience llenando los datos de la madre o tutora</h6>

			<div className='container '>
				<div className='row justify-content-center'>
					<div className='col-md-12 '>
						<div className='row justify-content-evenly mb-4'>
							<div className='col-md-3'>
								<input
									type='text'
									className='form-control'
									id='parentName1'
									placeholder='Nombre(s)'
									name='child.parents[0].parentName'
									value={form.values.child?.parents[0]?.parentName}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								{form.errors.child?.parents?.[0]?.parentName &&
									form.touched.child?.parents?.[0]?.parentName && (
										<p className='text-danger'>{form.errors.child?.parents[0].parentName}</p>
									)}
							</div>

							<div className='col-md-4'>
								<input
									type='text'
									className='form-control'
									id='parentLastname1'
									placeholder='Apellidos'
									name='child.parents[0].parentLastname'
									value={form.values.child?.parents[0].parentLastname}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								{form.errors.child?.parents?.[0]?.parentLastname &&
									form.touched.child?.parents?.[0]?.parentLastname && (
										<p className='text-danger'>{form.errors.child.parents[0].parentLastname}</p>
									)}
							</div>

							<div className='col-md-2'>
								<select
									className='form-select d-inline'
									id='typeParent1'
									name='child.parents[0].typeParent'
									value={form.values.child?.parents[0].typeParent}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								>
									<option>Parentesco</option>
									<option value='madre'>Madre</option>
									<option value='padre'>Padre</option>
									<option value='tutor'>Tutor</option>
								</select>
							</div>

							<div className='col-md-3 '>
								<InputSwitch
									className={'form-check form-switch'}
									id={'uniqueParent1'}
									name={'child.parents[0].uniqueParent'}
									value={form.values.child?.parents[0].uniqueParent}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									defaultChecked={form.values.child?.parents[0].uniqueParent}
									label='Monoparental'
								/>
							</div>
						</div>

						<div className='row justify-content-evenly mb-4'>
							<div className='col-md-2'>
								<InputSwitch
									className={'form-check form-switch'}
									id={'convivencia1'}
									name={'child.parents[0].convivencia'}
									value={form.values.child.parents[0].convivencia}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									defaultChecked={form.values.child.parents[0].convivencia}
									label='Convive'
								/>
							</div>

							<div className='col-md-7'>
								<input
									type='text'
									className='form-control'
									id='parentAddress1'
									placeholder='Dirección...'
									name='child.parents[0].parentAddress'
									value={form.values.child?.parents?.[0].parentAddress}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									disabled={form.values.child?.parents?.[0].convivencia}
								/>
								{form.errors.child?.parents?.[0]?.parentAddress &&
									form.touched.child?.parents?.[0]?.parentAddress && (
										<p className='text-danger'>{form.errors.child.parents[0].parentAddress}</p>
									)}
							</div>
							<div className='col-md-3'>
								<input
									type='text'
									className='form-control'
									id='phoneNumber1'
									placeholder='Teléfono'
									name='child.parents[0].phoneNumber'
									value={form.values.child.parents[0].phoneNumber}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								{form.errors.child?.parents?.[0]?.phoneNumber &&
									form.touched.child?.parents?.[0]?.phoneNumber && (
										<p className='text-danger'>{form.errors.child.parents[0].phoneNumber}</p>
									)}
							</div>
						</div>

						<div className='form-group justify-content-evenly mb-4'>
							<div className='row align-items-center mb-3'>
								<div className='col-md-6 d-flex justify-content-evenly'>
									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											id='trabajador1'
											name='child.parents[0].occupation'
											value='trabajador'
											onChange={form.handleChange}
											onBlur={form.handleBlur}
											defaultChecked
										/>
										<label className='form-check-label' htmlFor='trabajador1'>
											Trabajador
										</label>
									</div>

									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											id='jubilado1'
											name='child.parents[0].occupation'
											value='jubilado'
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>

										<label className='form-check-label' htmlFor='jubilado1'>
											Jubilado
										</label>
									</div>

									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											id='asistenciado1'
											name='child.parents[0].occupation'
											value='asistenciado'
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>

										<label className='form-check-label' htmlFor='asistenciado1'>
											Asistenciado
										</label>
									</div>

									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											id='estudiante1'
											name='child.parents[0].occupation'
											value='estudiante'
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>

										<label className='form-check-label' htmlFor='estudiante1'>
											Estudiante
										</label>
									</div>
								</div>

								<div className='col-md-6'>
									<input
										type='text'
										className='form-control'
										id='workName1'
										name='child.parents[0].workName'
										placeholder={
											form.values.child?.parents?.[0].occupation === 'estudiante'
												? 'Nombre del centro de estudios...'
												: 'Nombre del centro de trabajo...'
										}
										value={form.values.child.parents[0].workName}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
										disabled={
											form.values.child?.parents?.[0].occupation !== 'trabajador' &&
											form.values.child?.parents?.[0].occupation !== 'estudiante'
										}
									/>
									{form.errors.child?.parents?.[0]?.workName &&
										form.touched.child?.parents?.[0]?.workName && (
											<p className='text-danger'>{form.errors.child.parents[0].workName}</p>
										)}
								</div>
							</div>
						</div>

						<div className='row justify-content-evenly mb-4'>
							<Select
								className='col-md-4'
								id={'organismo1'}
								name={'child.parents[0].organismo.name'}
								value={form.values.child.parents[0].organismo.name}
								optionText={'Organismo'}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								mapFunction={organismosToMap.map((organismo) => (
									<option key={organismo._id} value={organismo.name}>
										{organismo.name}
									</option>
								))}
							/>

							<div className='col-md-8 '>
								<input
									type='text'
									className='form-control'
									id='jobTitle1'
									name='child.parents[0].jobTitle'
									placeholder='Cargo...'
									value={form.values.child.parents[0].jobTitle}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									disabled={form.values.child?.parents?.[0].occupation !== 'trabajador'}
								/>
								{form.errors.child?.parents?.[0]?.jobTitle &&
									form.touched.child?.parents?.[0]?.jobTitle && (
										<p className='text-danger'>{form.errors.child.parents[0].jobTitle}</p>
									)}
							</div>
						</div>

						<div className='row justify-content-evenly mb-4'>
							<div className='col-md-9'>
								<div className='form-group mb-3'>
									<input
										type='text'
										className='form-control'
										id='workAddress1'
										name='child.parents[0].workAddress'
										placeholder='Dirección del centro de trabajo...'
										value={form.values.child.parents[0].workAddress}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
										disabled={form.values.child?.parents?.[0].occupation !== 'trabajador'}
									/>
									{form.errors.child?.parents?.[0]?.workAddress &&
										form.touched.child?.parents?.[0]?.workAddress && (
											<p className='text-danger'>{form.errors.child.parents[0].workAddress}</p>
										)}
								</div>
							</div>

							<div className='col-md-3'>
								<div className='form-group mb-3'>
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
											<p className='text-danger'>{form.errors.child.parents[0].salary}</p>
										)}
								</div>
							</div>
						</div>

						<div className='row justify-content-evenly mb-3'>
							<InputSwitch
								className={'col-md-3  form-check form-switch'}
								id='otherChildrenInCi1'
								name='child.parents[0].otherChildrenInCi'
								value={form.values.child.parents[0].otherChildrenInCi}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								label='Tiene otros niños en círculo?'
							/>

							<div className='col-md-1'>
								<input
									type='number'
									className='form-control'
									id='numberOfOtherChildrenInCi1'
									name='child.parents[0].numberOfOtherChildrenInCi'
									value={form.values.child.parents[0].numberOfOtherChildrenInCi}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									disabled={!form.values.child?.parents?.[0].otherChildrenInCi}
								/>
								{form.errors.child?.parents?.[0]?.numberOfOtherChildrenInCi &&
									form.touched.child?.parents?.[0]?.numberOfOtherChildrenInCi && (
										<p className='text-danger'>
											{form.errors.child.parents[0].numberOfOtherChildrenInCi}
										</p>
									)}
							</div>

							<Select
								className='col-md-4'
								id={'otherChildrenCenter1'}
								name={'child.parents[0].otherChildrenCenter'}
								value={form.values.child.parents[0].otherChildrenCenter}
								optionText={'Seleccione el círculo'}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								disabled={!form.values.child?.parents?.[0].otherChildrenInCi}
								mapFunction={circulosToMap.map((circulo) => (
									<option key={circulo._id} value={circulo.name}>
										{circulo.name}
									</option>
								))}
							/>

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
									<label className='form-check-label' htmlFor='pregnant1'>
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

									<label className='form-check-label' htmlFor='deaf1'>
										Hipoacúsica
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Parent1Form.propTypes = {
	form: PropTypes.object.isRequired,
};
export default Parent1Form;
