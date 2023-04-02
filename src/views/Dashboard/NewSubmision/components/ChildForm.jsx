import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import L from 'leaflet';
import { MapContainer, TileLayer} from 'react-leaflet';
import MapMarker from '../../../../common/MapMarker/MapMarker';


const ChildSchema = Yup.object().shape({
	child: Yup.object().shape({
		childName: Yup.string().required('Se requiere un nombre'),
		childLastname: Yup.string().required('Se requiere un apellido'),
		carnet: Yup.number().required('Se requiere un número de identificación'),
		year_of_life: Yup.number().required('Seleccione un año de vida'),
		childAdress: Yup.string().required('Se requiere una dirección'),
		neighborhood: Yup.string(),
		cPopular: Yup.string(),
		municipality: Yup.string(),
		province: Yup.string(),
		latlng: Yup.array(),
		circulo: Yup.object().when('status', {
			is: 'matricula',
			then: Yup.object().shape({
				name: Yup.string(),
			}),
		}),
	}),
});

function ChildForm(submision) {
	const childData = submision.child || {};

	const form = useFormik({
		
		initialValues: {
			child: { 
				childName: childData.childName || '',
				childLastname: childData.childLastname || '',
				year_of_life: childData.year_of_life || '',
				childAdress: childData.childAdress || '',
				neighborhood: childData.neighborhood || '',
				cPopular: childData.cPopular || '',
				municipality: childData.municipality || 'Isla de la Juventud',
				province: childData.province || 'Isla de la Juventud',
				latlng: childData.latlng || null,
				circulo: childData.circulo || {
					id: '',
					name: ''},
				},
			},
			validationSchema: ChildSchema
		});


		const markerIcon = L.icon({ iconUrl: '/public/markerBlue.png', iconSize: [32, 32], 
		iconAnchor: [16, 32], popupAnchor: [0, -32], shadowAnchor: [4, 62]}); 

		const handleLatlngChange = (value) => {
			form.setFieldValue('latlng', value);
			console.log(value)
		};

	
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
					{form.errors.child.childName && form.touched.child.childName ? <p className='text-danger'>{form.errors.child.childName}</p> : null}
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
					{form.errors.child.childLastname && form.touched.child.childLastname ? <p className='text-danger'>{form.errors.child.childLastname}</p> : null}
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
					{form.errors.child.carnet && form.touched.child.carnet ? <p className='text-danger'>{form.errors.child.carnet}</p> : null}
				</div>

				<div className='col-md-2 '>
					<select
						className='form-select d-inline'
						id='year_of_life'
						name='child.year_of_life'
						value={form.values.child.year_of_life}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
					>{form.errors.child.year_of_life && form.touched.child.year_of_life ? <p className='text-danger'>{form.errors.child.year_of_life}</p> : null}

						<option>Año de vida</option>
						<option value='1'>2</option>
						<option value='2'>3</option>
						<option value='3'>4</option>
						<option value='4'>5</option>
						<option value='5'>6</option>
						
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
					{form.errors.child.childAdress && form.touched.child.childAdress ? <p className='text-danger'>{form.errors.child.childAdress}</p> : null}
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
						{form.errors.child.neighborhood && form.touched.child.neighborhood ? <p className='text-danger'>{form.errors.child.neighborhood}</p> : null}
					</div>

					<div className='mb-3'>
					<select
							className='form-select'
							id='cPopular'
							name='child.cPopular'
							value={form.values.child.cPopular}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
						>{form.errors.child.cPopular && form.touched.child.cPopular ? <p className='text-danger'>{form.errors.child.cPopular}</p> : null}

							<option value=''>Consejo Popular</option>
							<option value='1'>Micro 70</option>
							<option value='2'>Abel Santamaría</option>
							<option value='3'>Centro Histórico Nueva Gerona</option>
							<option value='4'>Pueblo Nuevo</option>
							<option value='5'>26 de Julio</option>
							<option value='6'>Sierra Caballos</option>
							<option value='7'>Delio Chacón</option>
							<option value='8'>Patria</option>
							<option value='9'>Centro Histórico Santa Fé</option>
							<option value='10'>Los Paneles (Santa Fe)</option>
							<option value='11'>Julio Antonio Mella (Santa Fe)</option>
							<option value='12'>Consejo Popular La Demajagua</option>
							<option value='13'>La Reforma</option>
							<option value='14'>Argelia-Victoria</option>
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
						> {form.errors.child.municipality && form.touched.child.municipality ? <p className='text-danger'>{form.errors.child.municipality}</p> : null}

							<option value=''>Municipio</option>
							<option value='1'>Isla de la Juventud</option>
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
						>{form.errors.child.province && form.touched.child.province ? <p className='text-danger'>{form.errors.child.province}</p> : null}

							<option value=''>Provincia</option>
							<option value='1'>Isla de la Juventud</option>
						</select>
					</div>

				</div>


{/*  ****************************************************** */}	

				<div className='col-md-7 p-3'>
				<MapContainer 
				className='map-container' style={{ width: '100%', height: '400px' }}
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