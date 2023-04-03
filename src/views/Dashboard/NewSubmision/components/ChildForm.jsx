import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import L from 'leaflet';
import { MapContainer, TileLayer} from 'react-leaflet';
import MapMarker from '../../../../common/MapMarker/MapMarker';
import { useEffect, useState} from 'react';

const ChildSchema = Yup.object().shape({
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
	}),
});

function ChildForm(submision) {
	const childData = submision.child || {};

	const [consejosPopulares, setConsejosPopulares] = useState([]);

	useEffect(() => {
		async function fetchData() {
		  const response = await fetch('/src/utils/ConsejosPopulares.json');
		  const data = await response.json();
		  setConsejosPopulares(data.consejosPopulares);
		}
		fetchData();
	  }, []);

	 
	const form = useFormik({
		
		initialValues: {
			child: { 
				childName: childData.childName || '',
				childLastname: childData.childLastname || '',
				year_of_life: childData.year_of_life || '',
				carnet: childData.carnet || '',
				childAdress: childData.childAdress || '',
				neighborhood: childData.neighborhood || '',
				cPopular: childData.cPopular || '',
				municipality: childData.municipality || 'Isla de la Juventud',
				province: childData.province || 'Isla de la Juventud',
				latlng: childData.latlng || null,
				},
			},
			validationSchema: ChildSchema
		});

		/* 	  useEffect(() => {
		if (submision) {
			form.setValues(submision);
			}
		}, [submision]); */

		const markerIcon = L.icon({ iconUrl: '/public/markerBlue.png', iconSize: [32, 32], 
		iconAnchor: [16, 32], popupAnchor: [0, -32], shadowAnchor: [4, 62]}); 

		const handleLatlngChange = (value) => {
			form.setFieldValue('child.latlng', value);
		};

		console.log('2', form.values)

	return (      

		<div id='child'>
		<h3 className='text-center text-secondary'>Datos del menor</h3>
		<h6 className="text-secondary mb-4">Llene la informmación personal del menor, proporcione la dirección particular y ubicación geográfica</h6>


		<div className='form-group '>
			<div className='row align-items-center mb-2'>
				<div className='col-md-3 '>
				<input
						type='text'
						className='form-control'
						id='childName'
						name="child.childName"
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
						name="child.childLastname"
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
					>
					</textarea>
					
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
							 <option >Consejo Popular</option>
							{consejosPopulares.map((consejo) => (
								<option key={consejo.nombre} value={consejo.nombre}>
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
							<option >Municipio</option>
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
						>	<option >Provincia</option>
							<option value='Isla de la Juventud'>Isla de la Juventud</option>

						</select>
					</div>

				</div>


{/*  ****************************************************** */}	

				<div className='col-md-7 p-3'>
				<MapContainer 
				className='map-container' style={{ width: '100%', height: '300px' }}
				center={[21.72761, -82.834167]} zoom={10}  setView={[21.72761, -82.834167]} scrollWheelZoom={true}
				minZoom={9} maxBounds={[
					[21.410303, -83.269720], // Suroeste
					[21.961168, -82.531547], // Noreste
				  ]} >
						<TileLayer 
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						// /Tiles/{z}/{x}/{y}.png  
						/>

							<MapMarker icon={markerIcon} onPositionChange={handleLatlngChange}/>
				</MapContainer>


				</div>
			</div>
		</div>
	</div>

);
};

ChildForm.propTypes = {
	children: PropTypes.object,
};

export default ChildForm;