import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapToLocation from '../../../../common/Map/map';

import { ciIcon } from '../../../../common/Map/MarkerIcons';
// import { renderSwitchSelect } from '../../../../common/uiForms/imputSwitch';

import { CIRCULOS } from '../../../../core/config/routes/paths';
import { circuloInitialValues } from '../../../../utils/initialValues/circuloInitialValues';
import { CirculoSchema } from '../../../../utils/yupValidations/circuloYupValidations';
import { useCirculoContext } from '../context/CirculoContext';
import { renderTypeRadios } from './Utils';

function CirculoForm({ circulo, showAttendance,  onHideForm  }) {
	const { addCirculo, updateCirculo } = useCirculoContext();
	const type = ['rural', 'urbano'];
	const navigate = useNavigate();

	const form = useFormik({
		initialValues: circuloInitialValues(circulo),

		onSubmit: async (values, { resetForm }) => {
			const formData = {
				...values,
			};
			if (circulo) {
				await updateCirculo.mutate({ ...values });
			} else {
				await addCirculo.mutate(formData);
			}
			resetForm();
			navigate(CIRCULOS);
		},
		onReset: async () => {
			onHideForm && onHideForm();
			document.getElementById('table').style.display = 'none';
		},
		validationSchema: CirculoSchema,
	});

	useEffect(() => {
		if (circulo) {
			form.setValues(circulo);
		}
	}, [circulo]);

	const handleLatlngChange = (value) => {
		form.setFieldValue('latlng', value);
	};
	
	return (
		<div className='container mt-3 col-6' id='circulo'>
			<div className=' p-5 '>
			{circulo ? <h2 className='text-center mt-5 p-3'>Editar círculo</h2> : <h2 className='text-center mt-5 p-3'>Nuevo círculo</h2>}
				<div className='card '>
					<form className='f-modal p-3 gap-3 justify-content-evenly ' onSubmit={form.handleSubmit}>
						<h3 className='text-secondary'>Datos del círculo</h3>
						<h6 className='text-secondary mb-3'>Escriba el número y nombre de la institución</h6>

						<div className='row justify-content-start mb-4 '>
							<div className='col-md-3 '>
								<input
									type='number'
									className='form-control'
									id='number'
									placeholder='#'
									value={form.values.number}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								{form.errors.number && form.touched.number ? (
									<p className='text-danger'>{form.errors.number}</p>
								) : null}
							</div>

							<div className='col-md-4 d-flex align-items-center'>

							{renderTypeRadios(type, 'circulotype', form)}

							</div>

							{/* <div className='col-md-4 '>
							{renderSwitchSelect('isCiActive', 'Activo', form, form.values.isCiActive)}

							</div> */}
						</div>

						<div className='row justify-content-evenly mb-4'>
							<div className='col-md-12'>
								<input
									type='text'
									className='form-control'
									id='name'
									placeholder='Nombre del círculo *'
									value={form.values.name}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								{form.errors.name && form.touched.name ? (
									<p className='text-danger'>{form.errors.name}</p>
								) : null}
							</div>
						</div>

						<h6 className='text-secondary mb-3'>
							Escriba la capacidad normada total para cada año de vida
						</h6>

						<div className='row justify-content-evenly mb-3 '>
							<div className='d-flex mb-2 gap-3 justify-content-between'>
								<div>
									<input
										type='number'
										className='form-control '
										id='normed_capacity2'
										name='normed_capacity2'
										placeholder='2do'
										value={form.values.normed_capacity2}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
									/>
									{form.errors.normed_capacity2 && form.touched.normed_capacity2 ? (
										<p className='text-danger'>{form.errors.normed_capacity2}</p>
									) : null}
								</div>

								<div>
									<input
										type='number'
										className='form-control '
										id='normed_capacity3'
										name='normed_capacity3'
										placeholder='3ro'
										value={form.values.normed_capacity3}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
									/>
									{form.errors.normed_capacity3 && form.touched.normed_capacity3 ? (
										<p className='text-danger'>{form.errors.normed_capacity3}</p>
									) : null}
								</div>

								<div>
									<input
										type='number'
										className='form-control '
										id='normed_capacity4'
										name='normed_capacity4'
										placeholder='4to'
										value={form.values.normed_capacity4}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
									/>
									{form.errors.normed_capacity4 && form.touched.normed_capacity4 ? (
										<p className='text-danger'>{form.errors.normed_capacity4}</p>
									) : null}
								</div>

								<div>
									<input
										type='number'
										className='form-control '
										id='normed_capacity5'
										name='normed_capacity5'
										placeholder='5to'
										value={form.values.normed_capacity5}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
									/>
									{form.errors.normed_capacity5 && form.touched.normed_capacity5 ? (
										<p className='text-danger'>{form.errors.normed_capacity5}</p>
									) : null}
								</div>

								<div>
									<input
										type='number'
										className='form-control '
										id='normed_capacity6'
										name='normed_capacity6'
										placeholder='6to'
										value={form.values.normed_capacity6}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
									/>
									{form.errors.normed_capacity6 && form.touched.normed_capacity6 ? (
										<p className='text-danger'>{form.errors.normed_capacity6}</p>
									) : null}
								</div>
							</div>
						</div>

						{showAttendance && (
							<div className='row '>
								<h6 className='text-secondary mt-3 mb-3'>
									Escriba el porciento de asistencia para cada año de vida
								</h6>
								<div className='d-flex mb-2 gap-3 justify-content-between'>
									<div>
										<input
											type='number'
											className='form-control '
											id='attendance2'
											name='attendance2'
											placeholder='% 2do'
											value={form.values.attendance2}
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>
										{form.errors.attendance2 && form.touched.attendance2 ? (
										<p className='text-danger'>{form.errors.attendance2}</p>
									) : null}
									</div>

									<div>
										<input
											type='number'
											className='form-control '
											id='attendance3'
											name='attendance3'
											placeholder='% 3ro'
											value={form.values.attendance3}
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>
											{form.errors.attendance3 && form.touched.attendance3 ? (
										<p className='text-danger'>{form.errors.attendance3}</p>
									) : null}
									</div>

									<div>
										<input
											type='number'
											className='form-control '
											id='attendance4'
											name='attendance4'
											placeholder='% 4to'
											value={form.values.attendance4}
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>
											{form.errors.attendance4 && form.touched.attendance4 ? (
										<p className='text-danger'>{form.errors.attendance4}</p>
									) : null}
									</div>

									<div>
										<input
											type='number'
											className='form-control '
											id='attendance5'
											name='attendance5'
											placeholder='% 5to'
											value={form.values.attendance5}
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>
											{form.errors.attendance5 && form.touched.attendance5 ? (
										<p className='text-danger'>{form.errors.attendance5}</p>
									) : null}
									</div>

									<div>
										<input
											type='number'
											className='form-control '
											id='attendance6'
											name='attendance6'
											placeholder='% 6to'
											value={form.values.attendance6}
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>
											{form.errors.attendance6 && form.touched.attendance6 ? (
										<p className='text-danger'>{form.errors.attendance6}</p>
									) : null}
									</div>
								</div>
							</div>
						)}

						<div className='row align-items-center'>
							<h3 className='text-secondary mt-3'>Ubicación geográfica</h3>
							<h6 className='text-secondary mb-3'>Busque la ubicación y haga click en el mapa</h6>
							<div className='col-md-12'>

							<MapToLocation 
							position={circulo?.latlng} 
							markerIcon={ciIcon} 
							handleLatlngChange={handleLatlngChange}  />
							{form.errors.latlng && form.touched.latlng && (
									<p className='text-danger'>{form.errors.latlng}</p>)}
							
							</div>
						</div>



						<article className=' m-4 d-flex w-100 justify-content-center align-items-center gap-5'>
							<a href='#topCirculos' className='btn cancel-btn' onClick={form.handleReset}>
								{' '}
								Cancelar
							</a>

							<button type='submit' className='btn save-btn'>
								{' '}
								{circulo ? 'Actualizar' : 'Guardar'}
							</button>
						</article>

					</form>
				</div>
			</div>
		</div>
	);
}

CirculoForm.propTypes = {
	circulo: PropTypes.object,
	showAttendance: PropTypes.bool,
	onHideForm: PropTypes.func,
};

export default CirculoForm;
