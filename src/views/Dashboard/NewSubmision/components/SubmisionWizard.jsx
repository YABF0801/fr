import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { childIcon } from '../../../../common/MapMarker/MarkerIcons';
import { GENERAL_LIST } from '../../../../core/config/routes/paths';
import { submisionInitialValues } from '../../../../utils/initialValues/submisionInitialValues';
import { useSubmisionContext } from '../../GeneralList/context/SumisionContext';
import ChildForm from './ChildForm';
import Parent1Form from './Parent1Form';
import Parent2Form from './Parent2Form';
import SubmisionForm from './SubmisionForm';
import './SumisionForm.scss';

const req = 'campo requerido';

const SubmisionSchema = Yup.object().shape({
	finality: Yup.string(),
	submisiontype: Yup.string(),
	entryNumber: Yup.number().required(req),
	socialCase: Yup.boolean(),
	motive: Yup.string().optional(),
	status: Yup.string(),
	ciPedido: Yup.string().optional(),
	createdBy: Yup.string(),

	child: Yup.object().shape({
		childName: Yup.string()
			.min(2, 'minimo 2 caracteres')
			.max(20, 'maximo 20 caracteres')
			.required('Se requiere un nombre'),
		childLastname: Yup.string()
			.min(2, 'minimo 2 caracteres')
			.max(50, 'maximo 50 caracteres')
			.required('Se requiere al menos un apellido'),
		carnet: Yup.number().required('Se requiere un número de identificación'),
		year_of_life: Yup.number().required('Seleccione un año de vida'),
		childAddress: Yup.string()
			.min(2, 'minimo 2 caracteres')
			.max(70, 'maximo 70 caracteres')
			.required('Se requiere una dirección'),
		neighborhood: Yup.string().min(2, 'minimo 2 caracteres').max(30, 'maximo 30 caracteres'),
		cPopular: Yup.string().required('Se requiere el cconsejo popular'),
		municipality: Yup.string().required('Se requiere el municipio'),
		province: Yup.string(),

		circulo: Yup.object().optional().shape({
			_id: Yup.string(),
			name: Yup.string(),
		}),

		latlng: Yup.array().required('seleccione ubicacion en el mapa'),

		parents: Yup.array().of(
			Yup.object().shape({
				parentName: Yup.string()
					.min(2, 'minimo 2 caracteres')
					.max(20, 'maximo 20 caracteres')
					.required('Se requiere un nombre'),
				parentLastname: Yup.string()
					.min(2, 'minimo 2 caracteres')
					.max(50, 'maximo 50 caracteres')
					.required('Se requiere un apellido'),
				uniqueParent: Yup.boolean().optional(),
				typeParent: Yup.string(),
				convivencia: Yup.boolean(),
				parentAddress: Yup.string().when('convivencia', {
					is: false,
					then: Yup.string()
						.min(2, 'minimo 2 caracteres')
						.max(70, 'maximo 70 caracteres')
						.required('Se requiere una  dirección'),
				}),
				phoneNumber: Yup.string()
					.min(8, 'minimo 8 caracteres')
					.max(15, 'maximo 15 caracteres')
					.required('Se requiere un número de teléfono'),
				occupation: Yup.string(),

				workName: Yup.string()
					.optional()
					.when('occupation', {
						is: 'trabajador' || 'estudiante',
						then: Yup.string()
							.min(2, 'minimo 2 caracteres')
							.max(70, 'maximo 70 caracteres')
							.required('Se requiere el nombre del centro'),
					}),
				workAddress: Yup.string()
					.optional()
					.when('occupation', {
						is: 'trabajador',
						then: Yup.string()
							.min(2, 'minimo 2 caracteres')
							.max(70, 'maximo 70 caracteres')
							.required('Se requiere la dirección del centro de trabajo'),
					}),
				jobTitle: Yup.string()
					.optional()
					.when('occupation', {
						is: 'trabajador',
						then: Yup.string()
							.min(4, 'minimo 4 caracteres')
							.max(50, 'maximo 50 caracteres')
							.required('Se requiere el cargo que ocupa'),
					}),

				organismo: Yup.object()
					.optional()
					.when('occupation', {
						is: 'trabajador',
						then: Yup.object().required('Se requiere un organismo').shape({
							name: Yup.string(),
							weight: Yup.number(),
						}),
					}),

				salary: Yup.number(),

				otherChildrenInCi: Yup.boolean(),
				numberOfOtherChildrenInCi: Yup.number().optional(),
				otherChildrenCenter: Yup.string().optional(),

				pregnant: Yup.boolean(),
				deaf: Yup.boolean(),
			})
		),
	}),
});

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
