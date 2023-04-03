import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { circulosApiGet } from '../../Circulos/service/circulo.services';
import { consecutiveApiGet } from '../../GeneralList/service/submision.services';

const SubSchema = Yup.object().shape({
	socialCase: Yup.boolean(),
	finality: Yup.string(),
	submisiontype: Yup.string(),
	motive: Yup.string(),
	status: Yup.string(),
	ciPedido: Yup.string(),
});

function SubmisionForm(submision) {
	const [circulosToMap, setCirculosToMap] = useState([]);
	const [newEntryNumber, setNewEntryNumber] = useState(null);
	
	useEffect(() => {
		const fetchData = async () => {
			const circulos = await circulosApiGet();
			setCirculosToMap(circulos);
			const consecutive = await consecutiveApiGet(); 
			setNewEntryNumber(consecutive + 1);
		};
		fetchData();
	}, []);

	const form = useFormik({
		initialValues: {
			entryNumber: submision ? submision.entryNumber: '',
			socialCase: submision ? submision.socialCase : false,
			finality: submision ? submision.finality : 'om',
			submisiontype: submision ? submision.submisiontype : 'new',
			motive: submision ? submision.motive : '',
			ciPedido: submision ? submision.ciPedido : '' ,
		},
		validationSchema: SubSchema,
	});

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
    console.log('1', form.values)

	const now = new Date().getFullYear();
	const numberLabel = `${newEntryNumber}/${now}`

	useEffect(() => {
        if (newEntryNumber) {
          form.setFieldValue('entryNumber', newEntryNumber);
        }
      }, [newEntryNumber]);

/* 	  useEffect(() => {
		if (submision) {
			form.setValues(submision);
			}
		}, [submision]); */

	return (
		<div id='submision'>
			<h3 className='text-center text-secondary '>Datos generales de la planilla</h3>
			<h6 className='text-secondary mb-4'>Introduzca los datos de la planilla de solicitud</h6>

			<div className='form-group '>
				<div className='row d-flex justify-content-center'>
				<div className='col-md-10 mb-10 '>
					<div className='form-group '>
						<div className='row align-items-center mt-3 mb-3'>
							<div className='col-md-3 mb-3'>
								<div className='om-os-group-buttons'>
									<a
										className='btn '
										role='button'
										id='os'
										name='finality'
										onClickCapture={handleOs}
									> OS
									</a>
									<a
										className='btn '
										role='button'
										id='om'
										name='finality'
										onClickCapture={handleOm}
									> OM
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

							<div className='col-md-2 mb-4 form-check form-switch'>
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
					<div className='form-group col-md-12 mb-3 d-flex'>
						<label
							className='col-md-6 m-md-2 text-secondary'
							htmlFor='ciPedido'
						>
							Si se solicita un circulo en particular como preferencia 
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
