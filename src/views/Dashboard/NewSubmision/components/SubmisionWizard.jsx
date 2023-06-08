import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { childIcon } from '../../../../common/MapMarker/MarkerIcons';
import ModalBase from '../../../../common/Modal/Modal';
import Select from '../../../../common/uiForms/select';
import { GENERAL_LIST } from '../../../../core/config/routes/paths';
import { useSubmisionContext } from '../../../../core/context/SumisionContext';
import { submisionInitialValues } from '../../../../utils/initialValues/submisionInitialValues';
import { SubmisionSchema } from '../../../../utils/yupValidations/submisionYupValidations';
import { circulosApiGet } from '../../Circulos/service/circulo.services';
import ChildForm from './ChildForm';
import Parent1Form from './Parent1Form';
import Parent2Form from './Parent2Form';
import SubmisionForm from './SubmisionForm';
import './SumisionForm.scss';

function SubmisionWizardForm({ submision }) {
	const { addSubmision, updateSubmision } = useSubmisionContext();
	const [isOs, setIsOs] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [circulosToMap, setCirculosToMap] = useState([]);
	const [selectedCirculoOs, setSelectedCirculoOs] = useState('');

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: submisionInitialValues(submision),

		onSubmit: async (values, { resetForm }) => {
			const formData = {
				...values,
			};
			if (submision) {
				await updateSubmision.mutate({ ...values });
			} else {
				console.log(formik.values.finality)
				await addSubmision.mutate(formData);
			}

			resetForm();
			navigate(GENERAL_LIST);
		},
		onReset: async () => {
			document.getElementById('submision').style.display = 'none';
		},

		validationSchema: SubmisionSchema,
	});

	useEffect(() => {
		const fetchData = async () => {
			const circulos = await circulosApiGet();
			console.log('ci array', circulos)
			setCirculosToMap(circulos);
		};
		fetchData();
	}, []);

	useEffect(() => {
		setIsOs(formik.values.finality === 'os');
	}, [formik.values.finality]);

	const handleMatManual = async () => {
		try {
			setIsModalOpen(true);
		} catch (error) {
			console.error(error);
		}
	};
	
	const handleModalCancel = () => {
		formik.setFieldValue('finality', formik.initialValues.finality);
		formik.setFieldValue('finality', formik.initialValues.child.circulo);
		setIsOs(false);
		setSelectedCirculoOs(null)
		setIsModalOpen(false);
	  };

	  	const handleCirculo = (selectedCirculo) => {
		const circulo = circulosToMap.find((circ) => circ.name === selectedCirculo);
		setSelectedCirculoOs(selectedCirculo)
		formik.setFieldValue('child.circulo.name', circulo.name);
		formik.setFieldValue('child.circulo._id', circulo._id);
	  };

	console.log('fin |', formik.values.finality)
	console.log('ci q pasa |', formik.values.child.circulo)
	console.log('isOS |', isOs)
	console.log(formik.values)

	const handleLatlngChange = (value) => {
		formik.setFieldValue('child.latlng', value);
	};

	return (
		<div className='show-form container list mt-3 col-12' id='submision'>
			<div className=' p-5 '>
				<h2 className='text-center mt-5 p-3'>Nueva solicitud</h2>
				<div className='card'>
					<form className='f-modal p-3 gap-3 justify-content-between ' onSubmit={formik.handleSubmit}>
						{/* SUBMISION DATA */}

						<SubmisionForm form={formik} submision={submision || formik.initialValues} />

						{/* CHILD DATA */}

						<ChildForm markerIcon={childIcon} handleLatlngChange={handleLatlngChange} form={formik} />

						{/* PARENT1 DATA */}

						<Parent1Form form={formik} />

						{/* PARENT2 DATA */}
						{formik.values.child?.parents?.[0].uniqueParent || <Parent2Form form={formik} />}

						<div className=' m-4 d-flex w-100 justify-content-center align-items-center gap-5'>
							<a href='#top' className='btn cancel-btn' onClickCapture={formik.handleReset}>
								{' '}
								Cancelar
							</a>

 							{!isOs ? (
							<button className="btn save-btn" type="submit" >
								{submision ? 'Actualizar' : 'Guardar'}
							</button>
							) : (
							<button  className="btn save-btn" onClick={handleMatManual}>
								{submision ? 'Actualizar' : 'Guardar'}
							</button>
							)} 
						</div>

						<ModalBase
								show={isModalOpen}
								ModalBody={
									<div className="modal-content-centered">
										<h2>Ha seleccionado otorgamiento sistemático</h2>
										<p>Por favor seleccione el círculo en el que se matriculará</p>
										<h6>Una vez guardada la planilla, el niño/a pasará a ser matrícula de ese circulo</h6>
										<div className='col-md-12 mt-3'>
											<Select
												id={'circulo'}
												name={'child.circulo'}
												value={selectedCirculoOs}
												optionText={'--- Seleccione  ---'}
												onChange={(e) => handleCirculo(e.target.value)}
												onBlur={formik.handleBlur}
												mapFunction={circulosToMap.map((circulo) => (
													<option key={circulo._id} value={circulo.name}>
														{circulo.name}
													</option>
												))}
											/>
							</div>
							<div className=' m-4 d-flex w-100 justify-content-center align-items-center gap-5'>
										<button className='btn save-btn' onClick={handleModalCancel}>Cancelar</button>
										<button className='btn save-btn' onClick={() => setIsModalOpen(false)}>Establecer</button>
										</div>
									</div>
								}
								onHide={() => setIsModalOpen(false)}
							/>

					</form>
				</div>
			</div>
		</div>
	);
}

SubmisionWizardForm.propTypes = {
	submision: PropTypes.object,
};

export default SubmisionWizardForm;
