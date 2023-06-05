import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapMarker from '../../../../common/MapMarker/MapMarker';
import Select from '../../../../common/uiForms/select';

const ChildForm = ({ form, markerIcon, handleLatlngChange }) => {
	const [consejosPopulares, setConsejosPopulares] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/src/utils/ConsejosPopulares.json');
			const data = await response.json();
			setConsejosPopulares(data.consejosPopulares);
		}
		fetchData();
	}, []);

	console.log(form.values.child.cPopular)

	return (
		<div id='child'>
			<hr className='text-secondary' />
			<h3 className='text-center text-secondary mt-4'>Datos del menor</h3>
			<h6 className='text-secondary mb-5'>
				Llene la informmación personal del menor, proporcione la dirección particular y ubicación geográfica
			</h6>

			<div className='container '>
				<div className='row justify-content-center'>
					<div className='col-md-12 '>
						<div className='row mb-4 justify-content-evenly'>
							<div className='col-md-3'>
								<input
									type='text'
									className='form-control'
									id='childName'
									name='child.childName'
									placeholder='Nombre(s) *'
									value={form.values.child.childName}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>

								{form.errors.child?.childName && form.touched.child?.childName && (
									<p className='text-danger'>{form.errors.child?.childName}</p>)}
							</div>

							<div className='col-md-4'>
								<input
									type='text'
									className='form-control'
									id='childLastname'
									name='child.childLastname'
									placeholder='Apellidos *'
									value={form.values.child.childLastname}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								{form.errors.child?.childLastname && form.touched.child?.childLastname && (
									<p className='text-danger'>{form.errors.child?.childLastname}</p>)}
							</div>

							<div className='col-md-3'>
								<input
									type='number'
									className='form-control'
									id='carnet'
									name='child.carnet'
									placeholder='CI *'
									value={form.values.child.carnet}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								/>
								{form.errors.child?.carnet && form.touched.child?.carnet && (
									<p className='text-danger'>{form.errors.child?.carnet}</p>)}
							</div>

							<div className='col-md-2'>
								<select
									className='form-select d-inline'
									id='year_of_life'
									name='child.year_of_life'
									value={form.values.child.year_of_life}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
								>
									<option value='0'>Año de vida</option>
									<option value='2'>2</option>
									<option value='3'>3</option>
									<option value='4'>4</option>
									<option value='5'>5</option>
									<option value='6'>6</option>
								</select>
								{form.errors.child?.year_of_life && form.touched.child?.year_of_life && (
								<p className='text-danger'>{form.errors.child?.year_of_life}</p>)}
							</div>
						</div>

						<div className='row mb-3 justify-content-evenly'>
							<div className='col-md-12'></div>
						</div>

						<div className='row mb-3 justify-content-evenly'>
							<div className='col-md-4'>
								<div className='mb-5'>
									<textarea
										type='text'
										rows={2}
										className='form-control'
										name='child.childAddress'
										id='childAddress'
										placeholder='Direccion *'
										value={form.values.child.childAddress}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
									></textarea>
									{form.errors.child?.childAddress && form.touched.child?.childAddress && (
								<p className='text-danger'>{form.errors.child?.childAddress}</p>)}
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
									{form.errors.child?.neighborhood && form.touched.child?.neighborhood && (
								<p className='text-danger'>{form.errors.child?.neighborhood}</p>)}
								</div>

								<Select
									className='mb-3'
									id={'cPopular'}
									name={'child.cPopular'}
									value={form.values.child.cPopular}
									optionText={'Consejo Popular'}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									mapFunction={consejosPopulares.map((consejo) => (
										<option key={consejo.nombre} value={consejo.nombre}>
											{consejo.nombre}
										</option>
									))}
								/>
								

								<Select
									className='mb-3'
									id={'municipality'}
									name={'child.municipality'}
									value={form.values.child.municipality}
									optionText={'Municipio'}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									mapFunction={<option value='Isla de la Juventud'>Isla de la Juventud</option>}
									
								/>

								<Select
									className='mb-3'
									id={'province'}
									name={'child.province'}
									value={form.values.child.province}
									optionText={'Provincia'}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									mapFunction={<option value='Isla de la Juventud'>Isla de la Juventud</option>}
								/>
							</div>

							<div className='col-md-8'>
								<div className='col-md-12 '>
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
											url='/public/Tiles/{z}/{x}/{y}.png'
										/>

										<MapMarker
											position={form.values.child && form.values.child.latlng}
											icon={markerIcon}
											onPositionChange={handleLatlngChange}
										/>
									</MapContainer>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ChildForm.propTypes = {
	form: PropTypes.object.isRequired,
	markerIcon: PropTypes.object.isRequired,
	handleLatlngChange: PropTypes.func.isRequired,
};
export default ChildForm;
