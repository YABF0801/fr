import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { circulosApiGet } from '../../Circulos/service/circulo.services';

const SubSchema = Yup.object().shape({
	socialCase: Yup.boolean(),
	finality: Yup.string(),
	submisiontype: Yup.string(),
	motive: Yup.string(),
	status: Yup.string(),
	ciPedido: Yup.object().shape({ name: Yup.string() }),
	child: Yup.object().shape({
		circulo: Yup.object().when('status', {
			is: 'matricula',
			then: Yup.object().shape({ name: Yup.string() }),
		}),
	}),
});

function SubmisionForm(submision) {
	const [circulosToMap, setCirculosToMap] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const circulos = await circulosApiGet();
			setCirculosToMap(circulos);
		};
		fetchData();
	}, []);

	const form = useFormik({
		initialValues: {
			socialCase: submision ? submision.socialCase : false,
			finality: submision ? submision.finality : 'om',
			submisiontype: submision ? submision.submisiontype : 'new',
			motive: submision ? submision.motive : '',
			ciPedido: submision ? submision.ciPedido : { name: '' },
			child: { circulo: { id: '', name: '' } },
		},
		validationSchema: SubSchema,
	});
	console.log('submisiontype', form.values.submisiontype)

	const handleOm = () => {
		form.values.finality = 'om';
		if (document.getElementById('om').style.background !== 'indianred') {
			document.getElementById('om').style.background = 'indianred';
			document.getElementById('os').style.background = 'radial-gradient(#686251a6, #635730c2)';
			document.getElementById('os-select').style.display = 'none';
		}
	};

	const handleOs = () => {
		form.values.finality = 'os';
		if (document.getElementById('os').style.background !== 'indianred') {
			document.getElementById('os').style.background = 'indianred';
			document.getElementById('os').style.opacity = 1;
			document.getElementById('om').style.background = 'radial-gradient(#0c3d4a, #0c3d4a)';
			document.getElementById('os-select').style.display = 'block';
		}
	};

	return (
		<div id='submision'>
			<h3 className='text-center text-secondary '>Datos generales de la planilla</h3>
			<h6 className='text-secondary mb-4'>Introduzca los datos de la planilla de solicitud</h6>

			<div className='form-group'>
				<div className='row '>
					<div className='form-group '>
						<div className='row align-items-center mt-3 mb-3'>
							<div className='col-md-3 mb-3'>
								<div className='om-os-group-buttons'>
									<a
										className='btn '
										role='button'
										id='os'
										onClickCapture={handleOs}
									>
										OS
									</a>
									<a
										className='btn '
										role='button'
										id='om'
										onClickCapture={handleOm}
									>
										OM
									</a>
								</div>
							</div>
							{/*  ****************************************************** */}

							<div className='col-md-4 mb-3 d-flex justify-content-evenly'>

								<div className='form-check form-check-inline'>
									<input
										className='form-check-input'
										type='radio'
										id='new'
										name='submisiontype'
										value='new'
										onChange={form.handleChange}
										onBlur={form.handleBlur}
									/>
									<label
										className='form-check-label'
										htmlFor='new'
									>
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

									<label
										className='form-check-label'
										htmlFor='traslado'
									>
										Traslado
									</label>
								</div>
							</div>

							{/*  ****************************************************** */}

							<div className='col-md-2 mb-3 form-check form-switch'>
								<input
									type='checkbox'
									className='form-check-input'
									id='socialCase'
									name='socialCase'
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									value={form.values.socialCase}
								/>
								<label htmlFor='socialCase'>Caso Social</label>
							</div>

							{/*  ****************************************************** */}

							{/* 								<div className='col-md-3 mb-3 gap-1 d-inline-flex'>
												<label className='m-md-2 d-inline-flex'>No.Entrada </label>
												<input
													className='form-control'
													type='number'
													id='entryNumber'
													name='entryNumber'
													value={form.values.entryNumber}
													onChange={form.handleChange}
													 onBlur={form.handleBlur}
												/>										
											</div> */}

							{/*  ****************************************************** */}
						</div>
					</div>

					{/*  ****************************************************** */}
					<div className='form-group col-md-12 mb-3 d-flex'>
						<label
							className='col-md-6 m-md-2 text-secondary'
							htmlFor='ciPedido'
						>
							Si se solicita un circulo en particular como preferencia seleccione
						</label>
						<select
							className='form-control'
							id='ciPedido'
							name='ciPedido'
							value={form.values.ciPedido}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
						>
							<option className='text-center'>------ Seleccione el círculo que solicita-------</option>
							{circulosToMap.map((circulo) => (
								<option
									key={circulo._id}
									value={circulo.name}
								>{circulo.name}
								</option>
							))}
						</select>
					</div>

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

					<div
						id='os-select'
						className='row show-form mt-3 mb-3'
					>
						<h6 className='text-success mb-3'>
							SE HA SELECCIONADO ESTA SOLICITUD COMO OTORGAMIENTO SISTEMÁTICO
						</h6>
						<div className='form-group col-md-12 mb-3 d-flex'>
							<label
								className='col-md-7 m-md-2'
								htmlFor='ciPedido'
							>
								Para continuar con el otrogamiento seleccione el circulo para matricular
							</label>
							<select
								className='form-control'
								id='circulo'
								name='child.circulo'
								value={form.values.child.circulo}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
							>
								<option className='text-center'>------ Seleccione un círculo para matricular -------</option>
								{circulosToMap.map((circulo) => (
								<option
									key={circulo._id}
									value={circulo._id}
								>{circulo.name}
								</option>
							))}

							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

SubmisionForm.propTypes = {
	children: PropTypes.object,
};

export default SubmisionForm;
