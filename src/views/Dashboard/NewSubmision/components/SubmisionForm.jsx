import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { consecustiveApiGet } from '../../GeneralList/service/submision.services';
import { circulosApiGet } from '../../Circulos/service/circulo.services';
import InputSwitch from './ui/imputSwitch';
import Select from './ui/select';

const SubmisionForm = ({ form, submision }) => {
	const [newEntryNumber, setNewEntryNumber] = useState(null);
	const [circulosToMap, setCirculosToMap] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const consecutive = await consecustiveApiGet();
			setNewEntryNumber(consecutive + 1);
		}

		fetchData();
	}, []);

	useEffect(() => {
		if (newEntryNumber) {
			form.setFieldValue('entryNumber', newEntryNumber);
		}
	}, [newEntryNumber]);

	useEffect(() => {
		if (submision) {
			form.setValues(submision);
		}
	}, [submision]);

	useEffect(() => {
		const fetchData = async () => {
			const circulos = await circulosApiGet();
			setCirculosToMap(circulos);
		};
		fetchData();
	}, []);

	const now = new Date().getFullYear();
	const numberLabel = submision.entryNumber || `${newEntryNumber}/${now}`;

	const handleOm = () => {
		form.setFieldValue('finality', 'om');
		if (document.getElementById('om').style.background !== 'indianred') {
			document.getElementById('om').style.background = 'indianred';
			document.getElementById('os').style.background = 'radial-gradient(#686251a6, #635730c2)';
		}
	};

	const handleOs = () => {
		form.setFieldValue('finality', 'os');
		if (document.getElementById('os').style.background !== 'indianred') {
			document.getElementById('os').style.background = 'indianred';
			document.getElementById('os').style.opacity = 1;
			document.getElementById('om').style.background = 'radial-gradient(#0c3d4a, #0c3d4a)';
		}
	};

	console.log(form.values.ciPedido);
	return (
		<div id='sub'>
			<h3 className='text-center text-secondary '>Datos generales de la planilla</h3>
			<h6 className='text-secondary mb-4'>Introduzca los datos de la planilla de solicitud</h6>

			<div className='form-group '>
				<div className='row d-flex justify-content-center'>
					<div className='col-md-10 mb-10 '>
						<div className='form-group '>
							<div className='row align-items-center mt-3 mb-3'>
								<div className='col-md-3 mb-3'>
									<div className='om-os-group-buttons d-flex'>
										<a className='btn' role='button' id='os' name='finality' onClick={handleOs}>
											OS
										</a>
										<a className='btn ' role='button' id='om' name='finality' onClick={handleOm}>
											OM
										</a>
									</div>
								</div>
								{/*  ****************************************************** */}

								<div className='col-md-4 mb-4 d-flex justify-content-evenly'>
									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											id='new'
											name='submisiontype'
											value='new'
											defaultChecked
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>
										<label className='form-check-label' htmlFor='new'>
											New
										</label>
									</div>

									<div className='form-check form-check-inline'>
										<input
											className='form-check-input'
											type='radio'
											id='traslado'
											name='submisiontype'
											value='traslado'
											onChange={form.handleChange}
											onBlur={form.handleBlur}
										/>

										<label className='form-check-label' htmlFor='traslado'>
											Traslado
										</label>
									</div>
								</div>

								{/*  ****************************************************** */}

								<InputSwitch
									id={'socialCase'}
									name={'socialCase'}
									value={form.values.socialCase}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									label='Caso Social'
								/>

								{/*  ****************************************************** */}

								<div className='col-md-3 mb-4 gap-1 d-inline-flex'>
									<label className='m-md-2 d-inline-flex'>No. </label>
									<input
										className='form-control'
										type='text'
										id='entryNumber'
										name='entryNumber'
										placeholder={numberLabel}
										disabled
									/>
								</div>

								{/*  ****************************************************** */}
							</div>
						</div>

						{/*  ****************************************************** */}

						<Select
							id={'ciPedido'}
							name={'ciPedido'}
							value={form.values.ciPedido}
							label={'Si se solicita un circulo en particular como preferencia'}
							optionText={'--- Seleccione el círculo que solicita ---'}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							mapFunction={circulosToMap.map((circulo) => (
								<option key={circulo._id} value={circulo.name}>
									{circulo.name}
								</option>
							))}
						/>

						{/*  ****************************************************** */}

						<div className='col-md-12 mb-3 mt-3'>
							<textarea
								className='form-control'
								rows={2}
								id='motive'
								name='motive'
								placeholder='Escriba el motivo de la solicitud...'
								value={form.values.motive}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

SubmisionForm.propTypes = {
	form: PropTypes.object.isRequired,
	submision: PropTypes.object.isRequired,
};
export default SubmisionForm;
