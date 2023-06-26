import { Tooltip } from 'leaflet';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { renderSwitchSelect } from '../../../../common/uiForms/imputSwitch';
import Select from '../../../../common/uiForms/select';
import { circulosApiGet } from '../../Circulos/service/circulo.services';
import { consecustiveApiGet } from '../../GeneralList/service/submision.services';
import { getSubmisiontype } from '../services/SubmisionForm.services';
import { renderTypeRadios } from './Utils';

<Tooltip id='tooltip' effect='solid' className='diff-arrow' />;

const SubmisionForm = ({ form, submision }) => {
	const [newEntryNumber, setNewEntryNumber] = useState(null);
	const [year, setYear] = useState(null);
	const [circulosToMap, setCirculosToMap] = useState([]);
	const [type, setType] = useState([]);
	const [selectedFinality, setSelectedFinality] = useState(form.values.finality === 'os' ? 1 : 2);
	const [isOsNew, setIsOsNew] = useState(false);
	const [isMatricula, setIsMatricula] = useState(false);

	useEffect(() => {
		const getParentsEnums = async () => {
			const typesEnum = await getSubmisiontype();
			setType(typesEnum);
		};
		getParentsEnums();
	}, []);

	useEffect(() => {
		const now = new Date().getFullYear();
		if (submision && submision.entryNumber) {
			const entryNumber = submision.entryNumber;
			const date = new Date(submision.createdAt).getFullYear();
			form.setFieldValue('entryNumber', submision.entryNumber);
			setNewEntryNumber(entryNumber);
			setYear(date);
		} else {
			fetchData();
			setYear(now);
		}
	}, [submision]);

	useEffect(() => {
		if (submision && submision.status === 'matricula') {
			setIsMatricula(true)
		} else {
			setIsMatricula(false)
		}
	}, [submision]);

	useEffect(() => {
		const fetchData = async () => {
			const circulos = await circulosApiGet();
			setCirculosToMap(circulos);
		};
		fetchData();
	}, []);

	useEffect(() => {
		setSelectedFinality(form.values.finality === 'os' ? 1 : 2);
	}, [form.values.finality]);

	const fetchData = async () => {
		const consecutive = await consecustiveApiGet();
		form.setFieldValue('entryNumber', consecutive + 1);
		setNewEntryNumber(consecutive + 1);
	};

	const handleOs = () => {
		form.setFieldValue('finality', 'os');
		setIsOsNew(true);
	};

	const handleOm = () => {
		form.setFieldValue('finality', 'om');
		setIsOsNew(false);
	};

	return (
		<div id='sub'>
			<h3 className='text-center text-secondary'>Datos generales de la planilla</h3>
			<h6 className='text-secondary mb-5'>Introduzca los datos de la planilla de solicitud</h6>

			<div className='container '>
				<div className='row justify-content-center'>
					{isOsNew && (
						<div className='text-info col-10 '>
							<p>
								Al guardarse como otorgamiento sistemático, esta planilla no será tomada en cuenta para
								generar las propuestas en el otorgamiento masivo, por lo que deberá regresar a ella
								para hacer una matrícula manual
							</p>
						</div>
					)}
					<div className='col-md-12 '>
						<div className='row justify-content-evenly'>
							<div className='col-md-3'>
								<ButtonToolbar>
									<ToggleButtonGroup
										type='radio'
										name='finality'
										defaultValue={form.values.finality === 'os' ? 1 : 2}
									>
										<ToggleButton
											className={selectedFinality === 1 ? 'selected-btn' : 'toggle-btn'}
											value={1}
											onClick={handleOs}
											data-tooltip-id='tooltip'
											data-tooltip-content='Otorgamiento sistemático'
											disabled={isMatricula}
										>
											OS
										</ToggleButton>
										<ToggleButton
											className={selectedFinality === 2 ? 'selected-btn' : 'toggle-btn'}
											value={2}
											onClick={handleOm}
											data-tooltip-id='tooltip'
											data-tooltip-content='Otorgamiento masivo'
											disabled={isMatricula}
										>
											OM
										</ToggleButton>
									</ToggleButtonGroup>
								</ButtonToolbar>
							</div>

							<div className='col-md-3 mb-5 gap-3 d-flex align-items-center'>
								{renderTypeRadios(type, 'submisiontype', form)}
							</div>

							<div className='col-md-3'>
								{renderSwitchSelect('socialCase', 'Caso Social', form, form.values.socialCase)}
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
									placeholder={`${newEntryNumber}/${year}`}
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
