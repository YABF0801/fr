import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import MapMarker from '../../../../common/MapMarker/MapMarker';
import { ciIcon } from '../../../../common/MapMarker/MarkerIcons';
import InputSwitch from '../../../../common/uiForms/imputSwitch';
import { CIRCULOS } from '../../../../core/config/routes/paths';
import { circuloInitialValues } from '../../../../utils/initialValues/circuloInitialValues';
import { useCirculoContext } from '../context/CirculoContext';

const CirculoSchema = Yup.object().shape({
	number: Yup.number().required('Se requiere un numero'),
	name: Yup.string().required('Se requiere un nombre'),
	circulotype: Yup.string(),

	normed_capacity2: Yup.number().required('Se requiere la capacidad'),
	normed_capacity3: Yup.number().required('Se requiere la capacidad'),
	normed_capacity4: Yup.number().required('Se requiere la capacidad'),
	normed_capacity5: Yup.number().required('Se requiere la capacidad'),
	normed_capacity6: Yup.number().required('Se requiere la capacidad'),
	attendance2: Yup.number().when('showAttendance', {
		is: true,
		then: Yup.number().required('Se requiere asistencia'),
	}),
	attendance3: Yup.number().when('showAttendance', {
		is: true,
		then: Yup.number().required('Se requiere asistencia'),
	}),
	attendance4: Yup.number().when('showAttendance', {
		is: true,
		then: Yup.number().required('Se requiere asistencia'),
	}),
	attendance5: Yup.number().when('showAttendance', {
		is: true,
		then: Yup.number().required('Se requiere asistencia'),
	}),
	attendance6: Yup.number().when('showAttendance', {
		is: true,
		then: Yup.number().required('Se requiere asistencia'),
	}),
	latlng: Yup.array(),
	isCiActive: Yup.boolean(),
	curso: Yup.number(),
});

function CirculoForm({ circulo, showAttendance }) {

	const { addCirculo, updateCirculo } = useCirculoContext();
	const navigate = useNavigate();
	const [marker, setMarker] = useState(true);

	const form = useFormik({
		initialValues: circuloInitialValues(circulo),

		onSubmit: async (values, { resetForm }) => {
			const formData = {
				...values,
			};
			if (circulo) {
				await updateCirculo.mutate({ ...values });
			} else {
				console.log(formData);
				await addCirculo.mutate(formData);
			}
			resetForm();
			setMarker(false);
			navigate(CIRCULOS);
		},
		onReset: async () => {
			setMarker(false);
			document.getElementById('circulo').style.display = 'none';
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
		<div className='show-form container mt-3 col-6' id='circulo'>
			<div className=' p-5 '>
				<div className='card '>
					<form className='f-modal p-3 gap-3 justify-content-evenly ' onSubmit={form.handleSubmit}>
						<h3 className='text-secondary'>Datos del círculo</h3>
						<h6 className='text-secondary mb-3'>Escriba el número y nombre de la institución</h6>

						<div className='row justify-content-evenly mb-4 '>
							<div className='col-md-4 '>
								<input
									type='number'
									className='form-control'
									id='number'
									placeholder='#'
									value={form.values.number}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									autoFocus
								/>
								{form.errors.number && form.touched.number ? (
									<p className='text-danger'>{form.errors.number}</p>
								) : null}
							</div>

							<div className='col-md-4 d-flex align-items-center'>
								<div className='form-check form-check-inline'>
									<input
										className='form-check-input'
										type='radio'
										id='urbano'
										name='circulotype'
										value='urbano'
										defaultChecked={form.values.circulotype}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
									/>
									<label className='form-check-label' htmlFor='urbano'>
										Urbano
									</label>
								</div>

								<div className='form-check form-check-inline'>
									<input
										className='form-check-input'
										type='radio'
										id='rural'
										name='circulotype'
										value='rural'
										defaultChecked={form.values.circulotype}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
									/>

									<label className='form-check-label' htmlFor='rural'>
										Rural
									</label>
								</div>
							</div>

							<div className='col-md-4 '>
								<InputSwitch
									className={'form-check form-switch'}
									id={'isCiActive'}
									name={'isCiActive'}
									value={form.values.isCiActive}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									label='Activo'
									defaultChecked={form.values.isCiActive}
								/>
							</div>
						</div>

						<div className='row justify-content-evenly mb-4'>
							<div className='col-md-12'>
								<input
									type='text'
									className='form-control'
									id='name'
									placeholder='Nombre del círculo'
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
										{form.touched.attendance2 && form.errors.attendance2 ? (
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
										{form.touched.attendance3 && form.errors.attendance3 ? (
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
										{form.touched.attendance4 && form.errors.attendance4 ? (
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
										{form.touched.attendance5 && form.errors.attendance5 ? (
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
										{form.touched.attendance6 && form.errors.attendance6 ? (
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
								<MapContainer
									className='map-container'
									style={{ width: '100%', height: '400px' }}
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
										url /* '/public/Tiles/{z}/{x}/{y}.png' */='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
									/>

								{marker && (<MapMarker
											position= {circulo && circulo.latlng}
											icon={ciIcon}
											onPositionChange={handleLatlngChange}
										/>
									)}
									
								</MapContainer>
							</div>
						</div>

						<article className=' m-4 d-flex w-100 justify-content-center align-items-center gap-5'>
							<a href='#topCirculos' className='btn cancel-btn' onClickCapture={form.handleReset}>
								{' '}
								Cancelar
							</a>

							<button type='submit' className='btn save-btn'>
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
};

export default CirculoForm;
