import { useFormik } from 'formik';
import PropTypes from 'prop-types' 
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"
import { useCirculoContext } from '../context/CirculoContext';

import {CIRCULOS} from '../../../../core/config/routes/paths';
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMaker from '../../../../common/LocationMaker/LocationMaker';


	const CirculoSchema = Yup.object().shape({
		number: Yup.number().required("Se requiere un numero"),
		name: Yup.string().required("Se requiere un nombre"),
		normed_capacity2: Yup.number().required('Se requiere la capacidad'),
		normed_capacity3: Yup.number().required('Se requiere la capacidad'),
		normed_capacity4: Yup.number().required('Se requiere la capacidad'),
		normed_capacity5: Yup.number().required('Se requiere la capacidad'),
		normed_capacity6: Yup.number().required('Se requiere la capacidad'),
/* 		marker
		lat: Yup.number(),
   		lon: Yup.number(), */
	});

function CirculoForm ({circulo}) {

	const { addCirculo, updateCirculo } = useCirculoContext();
	const navigate = useNavigate()

	const form = useFormik({
		initialValues: {
			number: circulo ? circulo.number : '',
			name: circulo ? circulo.name : '',
			normed_capacity2: circulo ? circulo.normed_capacity2 : '',
			normed_capacity3: circulo ? circulo.normed_capacity3 : '',
			normed_capacity4: circulo ? circulo.normed_capacity4 : '',
			normed_capacity5: circulo ? circulo.normed_capacity5 : '',
			normed_capacity6: circulo ? circulo.normed_capacity6 : '',
/* 			marker
			lat: circulo ? circulo.lat : '',
			lon: circulo ? circulo.lon : '', */
		},

		onSubmit: async (values, { resetForm }) => {
		const formData = {
				...values
		};
		if (circulo) {
			await updateCirculo.mutate({id: circulo._id, formData});
		} else {
			await addCirculo.mutate(formData);
		}
			resetForm();
			navigate(CIRCULOS)
		} ,
		onReset: async ( )  => {
			document.getElementById("circulo").style.display = "none";
		},
		validationSchema: CirculoSchema
	});
	  
	useEffect(() => {
	if (circulo) {
		form.setValues(circulo);
		}
	}, [circulo]);
	
    return (

  <div
      className='show-form container mt-3 col-6'  id="circulo"  
    >
	<div className=' p-5'>
        <div className='card-form'>
          <form  className="f-modal p-3 gap-3 justify-content-between " onSubmit={form.handleSubmit}>
						<div className='form-group'>
							<div className='row '>
                            <h3 className='text-secondary'>Datos del c??rculo</h3>
                            <h6 className="text-secondary mb-3">Escriba el n??mero y nombre de la instituci??n</h6>
								<div className='col-md-3 mb-3'>
									<input
										type='number'
										className='form-control'
										id='number'
										placeholder='#'
										value={form.values.number}
										onChange={form.handleChange}
										autoFocus
									/>
									{form.errors.number ? <p className='text-danger'>{form.errors.number}</p> : null}
								</div>

								<div className='col-md-9 mb-3'>
									<input
										type='text'
										className='form-control'
										id='name'
										placeholder='Nombre del c??rculo'
										value={form.values.name}
										onChange={form.handleChange}
									/>
									{form.errors.name ? <p className='text-danger'>{form.errors.name}</p> : null}
								</div>
							</div>
						</div>

						<div className='form-group'>
                        <div className='row '>
                        <h3 className='text-secondary mt-3'>Capacidades por a??o de vida </h3>
                        <h6 className="text-secondary mb-3">Escriba la capacidad total para cada a??o de vida</h6>
								<div className='d-flex mb-2 gap-3 justify-content-between'>
 									<div >
										<input
											type='number'
											className='form-control '
											id='normed_capacity2'
                                            placeholder='2do'
											value={form.values.normed_capacity2}
											onChange={form.handleChange}
										/>
										{form.errors.normed_capacity2 ? <p className='text-danger'>{form.errors.normed_capacity2}</p> : null}
									</div>

									<div >
										<input
											type='number'
											className='form-control '
											id='normed_capacity3'
                                            placeholder='3ro'
											value={form.values.normed_capacity3}
											onChange={form.handleChange}
										/>
										{form.errors.normed_capacity3 ? <p className='text-danger'>{form.errors.normed_capacity3}</p> : null}
									</div>

									<div >
										<input
											type='number'
											className='form-control '
											id='normed_capacity4'
											placeholder='4to'
											value={form.values.normed_capacity4}
											onChange={form.handleChange}
										/>
										{form.errors.normed_capacity4 ? <p className='text-danger'>{form.errors.normed_capacity4}</p> : null}
										</div>

										<div >
										<input
											type='number'
											className='form-control '
											id='normed_capacity5'
											placeholder='5to'
											value={form.values.normed_capacity5}
											onChange={form.handleChange}
										/>
										{form.errors.normed_capacity5 ? <p className='text-danger'>{form.errors.normed_capacity5}</p> : null}
										</div>

										<div >
										<input
											type='number'
											className='form-control '
											id='normed_capacity6'
											placeholder='6to'
											value={form.values.normed_capacity6}
											onChange={form.handleChange}
										/>
										{form.errors.normed_capacity6 ? <p className='text-danger'>{form.errors.normed_capacity6}</p> : null}
										</div>
								</div>
                                </div>
								<div className='row align-items-center'>
									<h3 className='text-secondary mt-3'>Ubicaci??n geogr??fica</h3>
									<h6 className="text-secondary mb-3">Busque la ubicaci??n y haga click en el mapa</h6>
										<div className='col-md-12'>

											<MapContainer className='map-container' style={{ 	width: '100%', height: '300px' }} center={[21.72761, -82.834167]} zoom={10} scrollWheelZoom={false}>
												<TileLayer
													attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
													url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
												// /Tiles/{z}/{x}/{y}.png  
												/>
												<LocationMaker/>
											</MapContainer>
										</div>

									</div>

						</div>

						<article className=" m-4 d-flex w-100 justify-content-center align-items-center gap-5">

						<a href='#top' className="btn cancel-btn" onClickCapture={form.handleReset}> Cancelar</a>

						<button type="submit" className="btn save-btn"> Guardar</button>

						</article>

					</form>
	</div>
	</div>
	</div>

    );
  };
  
  CirculoForm.propTypes = {
	circulo: PropTypes.object
  }
  
  export default CirculoForm;

