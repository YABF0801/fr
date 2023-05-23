import { PropTypes } from "prop-types"
import { useEffect, useState } from "react";

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

	return (
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
								value={ form.values.child?.parents[0]?.parentName }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
							/>{ ' ' }
							{ form.errors.child?.parents?.[0]?.parentName &&
								form.touched.child?.parents?.[0]?.parentName && (
									<p className='text-danger'>
										{ form.errors.child?.parents[0].parentName }
									</p>
								) }
						</div>

						<div className='col-md-4 '>
							<input
								type='text'
								className='form-control'
								id='parentLastname1'
								placeholder='Apellidos'
								name='child.parents[0].parentLastname'
								value={ form.values.child?.parents[0].parentLastname }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
							/>{ ' ' }
							{ form.errors.child?.parents?.[0]?.parentLastname &&
								form.touched.child?.parents?.[0]?.parentLastname && (
									<p className='text-danger'>
										{ form.errors.child.parents[0].parentLastname }
									</p>
								) }
						</div>

						<div className='col-md-2 '>
							<select
								className='form-select d-inline'
								id='typeParent1'
								name='child.parents[0].typeParent'
								value={ form.values.child?.parents[0].typeParent }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
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
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								value={ form.values.child?.parents[0].uniqueParent }
							/>
							<label htmlFor='uniqueParent1'>Monoparental</label>
						</div>
					</div>
				</div>

				{/* ************************************************************* */ }

				<div className='form-group d-inline justify-content-evenly'>
					<div className='row align-items-center mb-3'>
						<div className='col-md-2 form-check form-switch '>
							<input
								type='checkbox'
								className='form-check-input m-1'
								id='convivencia1'
								name='child.parents[0].convivencia'
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								value={ form.values.child.parents[0].convivencia }
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
								value={ form.values.child?.parents?.[0].convivencia ? form.values.child.childAdress : form.values.child.parents[0].parentAddress }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								disabled={ form.values.child?.parents?.[0].convivencia }
							/>
							{ form.errors.child?.parents?.[0]?.parentAddress &&
								form.touched.child?.parents?.[0]?.parentAddress && (
									<p className='text-danger'>
										{ form.errors.child.parents[0].parentAddress }
									</p>
								) }
						</div>

						<div className='col-md-3 '>
							<input
								type='text'
								className='form-control '
								id='phoneNumber1'
								placeholder='Teléfono'
								name='child.parents[0].phoneNumber'
								value={ form.values.child.parents[0].phoneNumber }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
							/>
							{ form.errors.child?.parents?.[0]?.phoneNumber &&
								form.touched.child?.parents?.[0]?.phoneNumber && (
									<p className='text-danger'>
										{ form.errors.child.parents[0].phoneNumber }
									</p>
								) }
						</div>
					</div>
				</div>

				{/* ******************************************************** */ }

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
									onChange={ form.handleChange }
									onBlur={ form.handleBlur }
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
									onChange={ form.handleChange }
									onBlur={ form.handleBlur }
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
									onChange={ form.handleChange }
									onBlur={ form.handleBlur }
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
									onChange={ form.handleChange }
									onBlur={ form.handleBlur }
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
								placeholder={ form.values.child?.parents?.[0].occupation === 'estudiante' ? 'Nombre del centro estudiantil...' : 'Nombre del centro de trabajo...' }
								value={ form.values.child.parents[0].workName }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								disabled={ form.values.child?.parents?.[0].occupation !== 'trabajador' && form.values.child?.parents?.[0].occupation !== 'estudiante' }
							/>
							{ form.errors.child?.parents?.[0]?.workName &&
								form.touched.child?.parents?.[0]?.workName && (
									<p className='text-danger'>
										{ form.errors.child.parents[0].workName }
									</p>
								) }
						</div>
					</div>
				</div>

				{/* ******************************************************** */ }
				<div className='form-group d-inline justify-content-evenly'>
					<div className='row align-items-center  mb-3'>
						<div className='col-md-3 '>
							<select
								className='form-select d-inline'
								id='organismo1'
								name='child.parents[0].organismo'
								value={ form.values.child.parents[0].organismo }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								disabled={ form.values.child?.parents?.[0].occupation !== 'trabajador' }
							>
								<option className='text-center'> Organismo </option>
								{ organismosToMap.map((organismo) => (
									<option
										key={ organismo._id }
										value={ organismo }
									>
										{ organismo.name }
									</option>
								)) }
							</select>
						</div>

						<div className='col-md-9 '>
							<input
								type='text'
								className='form-control'
								id='jobTitle1'
								name='child.parents[0].jobTitle'
								placeholder='Cargo...'
								value={ form.values.child.parents[0].jobTitle }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								disabled={ form.values.child?.parents?.[0].occupation !== 'trabajador' }
							/>
							{ form.errors.child?.parents?.[0]?.jobTitle &&
								form.touched.child?.parents?.[0]?.jobTitle && (
									<p className='text-danger'>
										{ form.errors.child.parents[0].jobTitle }
									</p>
								) }
						</div>
					</div>
				</div>

				{/* ************************************************************* */ }

				<div className='form-group d-inline justify-content-evenly'>
					<div className='row align-items-center  mb-3'>
						<div className='col-md-10 '>
							<input
								type='text'
								className='form-control'
								id='workAddress1'
								name='child.parents[0].workAddress'
								placeholder='Dirección del centro de trabajo...'
								value={ form.values.child.parents[0].workAddress }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								disabled={ form.values.child?.parents?.[0].occupation !== 'trabajador' }
							/>
							{ form.errors.child?.parents?.[0]?.workAddress &&
								form.touched.child?.parents?.[0]?.workAddress && (
									<p className='text-danger'>
										{ form.errors.child.parents[0].workAddress }
									</p>
								) }
						</div>

						<div className='col-md-2 '>
							<input
								type='number'
								className='form-control'
								id='salary1'
								name='child.parents[0].salary'
								value={ form.values.child.parents[0].salary }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
							/>
							{ form.errors.child?.parents?.[0]?.salary &&
								form.touched.child?.parents?.[0]?.salary && (
									<p className='text-danger'>
										{ form.errors.child.parents[0].salary }
									</p>
								) }
						</div>
					</div>
				</div>

				{/* ************************************************************* */ }

				<div className='form-group d-inline justify-content-evenly'>
					<div className='row align-items-center mb-3 m-1'>
						<div className='col-md-3  form-check form-switch '>
							<input
								type='checkbox'
								className='form-check-input '
								id='otherChildrenInCi1'
								name='child.parents[0].otherChildrenInCi'
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								value={ form.values.child.parents[0].otherChildrenInCi }
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
								value={ form.values.child.parents[0].numberOfOtherChildrenInCi }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								disabled={ !form.values.child?.parents?.[0].otherChildrenInCi }

							/>
							{ form.errors.child?.parents?.[0]?.numberOfOtherChildrenInCi &&
								form.touched.child?.parents?.[0]?.numberOfOtherChildrenInCi && (
									<p className='text-danger'>
										{ form.errors.child.parents[0].numberOfOtherChildrenInCi }
									</p>
								) }
						</div>

						<div className='col-md-3 '>
							<select
								className='form-control'
								id='otherChildrenCenter1'
								name='child.parents[0].otherChildrenCenter'
								value={ form.values.child.parents[0].otherChildrenCenter }
								onChange={ form.handleChange }
								onBlur={ form.handleBlur }
								disabled={ !form.values.child?.parents?.[0].otherChildrenInCi }

							>
								{ form.errors.child?.parents?.[0]?.otherChildrenCenter &&
									form.touched.child?.parents?.[0]?.otherChildrenCenter && (
										<p className='text-danger'>
											{ form.errors.child.parents[0].otherChildrenCenter }
										</p>
									) }
								<option className='text-center'> Seleccione el círculo </option>
								{ circulosToMap.map((circulo) => (
									<option
										key={ circulo._id }
										value={ circulo.name }
									>
										{ circulo.name }
									</option>
								)) }
							</select>
						</div>

						<div className='col-md-4 '>
							<div className='form-check form-check-inline'>
								<input
									className='form-check-input'
									type='checkbox'
									id='pregnant1'
									name='child.parents[0].pregnant'
									value={ form.values.child.parents[0].pregnant }
									onChange={ form.handleChange }
									onBlur={ form.handleBlur }
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
									value={ form.values.child.parents[0].deaf }
									onChange={ form.handleChange }
									onBlur={ form.handleBlur }
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
	)
}

Parent1Form.propTypes = {
	form: PropTypes.object.isRequired,
}
export default Parent1Form