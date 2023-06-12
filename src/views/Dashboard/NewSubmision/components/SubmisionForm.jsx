import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import InputSwitch from '../../../../common/uiForms/imputSwitch';
import Select from '../../../../common/uiForms/select';
import { circulosApiGet } from '../../Circulos/service/circulo.services';
import { consecustiveApiGet } from '../../GeneralList/service/submision.services';
import { getSubmisiontype } from '../services/SubmisionForm.services';
import { renderTypeRadios } from './Utils';

const SubmisionForm = ({ form, submision }) => {
	const [newEntryNumber, setNewEntryNumber] = useState(null);
	const [circulosToMap, setCirculosToMap] = useState([]);
	const [type, setType] = useState([]);

	useEffect(() => {
		const getParentsEnums = async () => {
			const typesEnum = await getSubmisiontype();
			setType(typesEnum);
		};
		getParentsEnums();
	}, []);

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

	return (
		<div id='sub'>
			<h3 className='text-center text-secondary'>Datos generales de la planilla</h3>
			<h6 className='text-secondary mb-5'>Introduzca los datos de la planilla de solicitud</h6>

			<div className='container '>
				<div className='row justify-content-center'>
					<div className='col-md-12 '>
						<div className='row justify-content-evenly'>
							<div className='col-md-3'>
								<div className='om-os-group-buttons d-flex'>
									<a className='btn' role='button' id='os' name='finality' onClick={handleOs}>
										OS
									</a>
									<a className='btn ' role='button' id='om' name='finality' onClick={handleOm}>
										OM
									</a>
								</div>
							</div>

							<div className='col-md-3 mb-5 gap-3 d-flex align-items-center'>

							{renderTypeRadios(type, 'submisiontype', form)}

							</div>

							<div className='col-md-3 '>
								<InputSwitch
									className={' col-md-8 form-check form-switch'}
									id={'socialCase'}
									name={'socialCase'}
									value={form.values.socialCase}
									onChange={form.handleChange}
									onBlur={form.handleBlur}
									label='Caso Social'
									defaultChecked={form.values.socialCase}
								/>
							</div>

							<div className='col-md-3 mb-5 gap-1 d-inline-flex'>
								<label className='m-md-2 d-inline-flex' htmlFor='entryNumber'>
									No.
								</label>
								<input
									className='form-control'
									type='text'
									id='entryNumber'
									name='entryNumber'
									placeholder={numberLabel}
									disabled
								/>
							</div>
						</div>

						<div className='row mb-3 justify-content-evenly'>
							<div className='col-md-12'>
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
							</div>
						</div>

						<div className='row mb-3 justify-content-center'>
							<div className='col-md-12'>
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
		</div>
	);
};

SubmisionForm.propTypes = {
	form: PropTypes.object.isRequired,
	submision: PropTypes.object.isRequired,
};
export default SubmisionForm;
