import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { childIcon } from '../../../../common/Map/MarkerIcons';
import { useSubmisionContext } from '../../../../core/context/SumisionContext';
import { submisionInitialValues } from '../../../../utils/initialValues/submisionInitialValues';
import { SubmisionSchema } from '../../../../utils/yupValidations/submisionYupValidations';
import ChildForm from './ChildForm';
import Parent1Form from './Parent1Form';
import Parent2Form from './Parent2Form';
import SubmisionForm from './SubmisionForm';
import './SumisionForm.scss';

function SubmisionWizardForm({ submision, onHideForm }) {
	const { addSubmision, updateSubmision } = useSubmisionContext();
	const [showParent2Form, setShowParent2Form] = useState(false);

	const formik = useFormik({
		initialValues: submisionInitialValues(submision),

		onSubmit: async (values, { resetForm }) => {
			const formData = {
				...values,
			};
			if (submision) {
				if (values.child.parents[0].uniqueParent) {
					const confirmation = window.confirm('Ha marcado padre único. ¿Está seguro de continuar?');
					if (confirmation) {
						resetP2();
						await updateSubmision.mutate({ ...values });
					}
				} else {
					await updateSubmision.mutate({ ...values });
				}
			} else {
				delP2();
				await addSubmision.mutate(formData);
			}
			resetForm();
		},
		onReset: async () => {
			onHideForm && onHideForm();
		},
		validationSchema: SubmisionSchema,
	});

	useEffect(() => {
		const value = formik.values.child?.parents?.[0].uniqueParent;
		setShowParent2Form(!value);
		if (!submision) {
			resetP2();
		}
	}, [formik.values.child.parents[0].uniqueParent]);

	const resetP2 = () => {
		if (formik.values.child.parents.length > 0 && formik.values.child.parents[0].uniqueParent) {
			formik.setValues((prevValues) => ({
				...prevValues,
				child: {
					...prevValues.child,
					parents: [prevValues.child.parents[0]],
				},
			}));
		}
	};

	const delP2 = () => {
		if (formik.values.child?.parents?.[0].uniqueParent) {
			formik.setFieldValue('child.parents', [formik.values.child.parents[0]]);
		}
	};

	const handleLatlngChange = (value) => {
		formik.setFieldValue('child.latlng', value);
	};

	return (
		<div className='container list mt-3 col-12' id='submision'>
			<div className=' p-5 '>
				{submision ? (
					<h2 className='text-center mt-5 p-3'>Editar planilla</h2>
				) : (
					<h2 className='text-center mt-5 p-3'>Nueva solicitud</h2>
				)}

				<div className='card'>
					<form className='f-modal p-3 gap-3 justify-content-between ' onSubmit={formik.handleSubmit}>
						{/* SUBMISION DATA */}
						<SubmisionForm form={formik} submision={submision || formik.initialValues} />

						{/* CHILD DATA */}
						<ChildForm markerIcon={childIcon} handleLatlngChange={handleLatlngChange} form={formik} />

						{/* PARENT1 DATA */}
						<Parent1Form form={formik} />

						{/* PARENT2 DATA */}
						{showParent2Form && <Parent2Form form={formik} setShowParent2Form={setShowParent2Form} />}

						<div className=' m-4 d-flex w-100 justify-content-center align-items-center gap-5'>
							<a href='#top' className='btn cancel-btn' onClickCapture={formik.handleReset}>
								Cancelar
							</a>

							<button className='btn save-btn' type='submit' onClick={()=>console.log(formik.values)}>
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
	onHideForm: PropTypes.func,
};

export default SubmisionWizardForm;
