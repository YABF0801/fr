import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { childIcon } from '../../../../common/MapMarker/MarkerIcons';
import { GENERAL_LIST } from '../../../../core/config/routes/paths';
import { submisionInitialValues } from '../../../../utils/initialValues/submisionInitialValues';
import { SubmisionSchema } from '../../../../utils/yupValidations/submisionYupValidations';
import { useSubmisionContext } from '../../GeneralList/context/SumisionContext';
import ChildForm from './ChildForm';
import Parent1Form from './Parent1Form';
import Parent2Form from './Parent2Form';
import SubmisionForm from './SubmisionForm';
import './SumisionForm.scss';

function SubmisionWizardForm({ submision }) {
	const { addSubmision, updateSubmision } = useSubmisionContext();
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

	const handleLatlngChange = (value) => {
		formik.setFieldValue('child.latlng', value);
	};

	return (
		<div className='show-form container list mt-3 col-12' id='submision'>
			<div className=' p-5 '>
			<h2 className='text-center mt-5 p-3'>Nueva solicitud</h2>
				<div className='card'>
					<form
						className='f-modal p-3 gap-3 justify-content-between '
						onSubmit={formik.handleSubmit}
					>
						
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

							{/* <button type="submit" className="btn save-btn">Guardar</button> */}
							<button type='submit' className='btn save-btn'>
								{submision ? 'Actualizar' : 'Guardar'}
							</button>
						</div>
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
