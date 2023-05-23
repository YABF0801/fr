
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { GENERAL_LIST } from '../../../../core/config/routes/paths';
import { useSubmisionContext } from '../../GeneralList/context/SumisionContext';
import './SumisionForm.scss';
import SubmisionForm from './SubmisionForm';
import ChildForm from './ChildForm';
import Parent1Form from './Parent1Form';
import Parent2Form from './Parent2Form';

const SubmisionSchema = Yup.object().shape({
	socialCase: Yup.boolean(),
	finality: Yup.string(),
	submisiontype: Yup.string(),
	motive: Yup.string(),
	ciPedido: Yup.string(),

	child: Yup.object().shape({
		childName: Yup.string().required('Se requiere un nombre'),
		childLastname: Yup.string().required('Se requiere al menos un apellido'),
		carnet: Yup.number().required('Se requiere un número de identificación'),
		year_of_life: Yup.number().required('Seleccione un año de vida'),
		childAdress: Yup.string().required('Se requiere una dirección'),
		neighborhood: Yup.string(),
		cPopular: Yup.string(),
		municipality: Yup.string(),
		province: Yup.string(),
		latlng: Yup.array(),

		circulo: Yup.object().when('finality', {
			is: 'os',
			then: Yup.object().shape({
				_id: Yup.string(),
				name: Yup.string(),
			}),
		}),

		parents: Yup.array().of(
			Yup.object().shape({
				parentName: Yup.string().required('Se requiere un nombre'),
				parentLastname: Yup.string().required('Se requiere un apellido'),
				uniqueParent: Yup.boolean(),
				typeParent: Yup.string(),
				convivencia: Yup.boolean(),
				parentAddress: Yup.string().when('convivencia', {
					is: false,
					then: Yup.string().required('Se requiere una  dirección'),
				}),
				phoneNumber: Yup.string().required('Se requiere un número de teléfono'),
				occupation: Yup.string(),
				workName: Yup.string().when('occupation', {
					is: 'trabajador',
					then: Yup.string().required('Se requiere el nombre del centro de trabajo'),
				}),
				workAddress: Yup.string().when('occupation', {
					is: 'trabajador',
					then: Yup.string().required('Se requiere la dirección del centro de trabajo'),
				}),
				jobTitle: Yup.string().when('occupation', {
					is: 'trabajador',
					then: Yup.string().required('Se requiere el cargo que ocupa'),
				}),
				organismo: Yup.object().when('occupation', {
					is: 'trabajador',
					then: Yup.object().required('Se requiere un organismo'),
				}),
				salary: Yup.number().when('occupation', {
					is: 'trabajador',
					then: Yup.number().required('Escriba el salario'),
				}),
				otherChildrenInCi: Yup.boolean(),
				numberOfOtherChildrenInCi: Yup.number().when('otherChildrenInCi', {
					is: true,
					then: Yup.number().required('Especifique la cantidad'),
				}),
				otherChildrenCenter: Yup.string().when('otherChildrenInCi', {
					is: true,
					then: Yup.string().required('Especifique el círculo'),
				}),
				pregnant: Yup.boolean().when('typeParent', {
					is: 'Madre',
					then: Yup.boolean(),
				}),
				deaf: Yup.boolean(),
			})
		),
	}),
});

function SubmisionWizardForm({ submision }) {
	const { addSubmision, updateSubmision } = useSubmisionContext();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			entryNumber: submision ? submision.entryNumber : '',
			socialCase: submision ? submision.socialCase : false,
			finality: submision ? submision.finality : 'om',
			submisiontype: submision ? submision.submisiontype : 'new',
			motive: submision ? submision.motive : '',
			ciPedido: submision ? submision.ciPedido : '',

			child: {
				childName: submision ? submision.child.childName : '',
				childLastname: submision ? submision.child.childLastname : '',
				year_of_life: submision ? submision.child.year_of_life : '',
				carnet: submision ? submision.child.carnet : '',
				childAdress: submision ? submision.child.childAdress : '',
				neighborhood: submision ? submision.child.neighborhood : '',
				cPopular: submision ? submision.child.cPopular : '',
				municipality: submision ? submision.child.municipality : 'Isla de la Juventud',
				province: submision ? submision.child.province : 'Isla de la Juventud',
				latlng: submision ? submision.child.latlng : null,

				parents: [
					{
						parentName: submision ? submision.child.parents[0].parentName : '',
						parentLastname: submision ? submision.child.parents[0].parentLastname : '',
						uniqueParent: submision ? submision.child.parents[0].uniqueParent : false,
						typeParent: submision ? submision.child.parents[0].typeParent : 'madre',
						convivencia: submision ? submision.child.parents[0].convivencia : true,
						parentAddress: submision ? submision.child.parents[0].parentAddress : '',
						phoneNumber: submision ? submision.child.parents[0].phoneNumber : '',
						occupation: submision ? submision.child.parents[0].occupation : 'trabajador',
						workName: submision ? submision.child.parents[0].workName : '',
						workAddress: submision ? submision.child.parents[0].workAddress : '',
						jobTitle: submision ? submision.child.parents[0].jobTitle : '',
						salary: submision ? submision.child.parents[0].salary : 0,
						otherChildrenInCi: submision ? submision.child.parents[0].otherChildrenInCi : false,
						numberOfOtherChildrenInCi: submision ? submision.child.parents[0].numberOfOtherChildrenInCi : 0,
						otherChildrenCenter: submision ? submision.child.parents[0].otherChildrenCenter : '',
						pregnant: submision ? submision.child.parents[0].pregnant : false,
						deaf: submision ? submision.child.parents[0].deaf : false,
					},
					{
						parentName: submision ? submision.child.parents[1].parentName : '',
						parentLastname: submision ? submision.child.parents[1].parentLastname : '',
						typeParent: submision ? submision.child.parents[1].typeParent : 'padre',
						convivencia: submision ? submision.child.parents[1].convivencia : true,
						parentAddress: submision ? submision.child.parents[1].parentAddress : '',
						phoneNumber: submision ? submision.child.parents[1].phoneNumber : '',
						occupation: submision ? submision.child.parents[1].occupation : 'trabajador',
						workName: submision ? submision.child.parents[1].workName : '',
						workAddress: submision ? submision.child.parents[1].workAddress : '',
						jobTitle: submision ? submision.child.parents[1].jobTitle : '',
						salary: submision ? submision.child.parents[1].salary : 0,
					},
				],
			},
		},
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



	const markerIcon = L.icon({
		iconUrl: '/public/markerBlue.png',
		iconSize: [32, 32],
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
		shadowAnchor: [4, 62],
	});

	const handleLatlngChange = (value) => {
		formik.setFieldValue('child.latlng', value);
	};

	return (
		<div
			className='show-form container list mt-3 col-12'
			id='submision'
		>
			<div className=' p-5 '>
				<div className='card'>
					<form
						className='f-modal p-3 gap-3 justify-content-between '
						onSubmit={ formik.handleSubmit }
					>
						<h2 className='text-center mt-5 p-3'>Nueva Solicitud</h2>

						{/* SUBMISION DATA */ }

						<SubmisionForm form={ formik } submision={ submision || formik.initialValues } />

						{/* CHILD DATA */ }

						<ChildForm
							markerIcon={ markerIcon }
							handleLatlngChange={ handleLatlngChange } form={ formik }
						/>

						{/* PARENT1 DATA */ }

						<Parent1Form form={ formik } />

						{/* PARENT2 DATA */ }
						<Parent2Form form={ formik } />

						<article className=" m-4 d-flex w-100 justify-content-center align-items-center gap-5">

							<a href='#top' className="btn cancel-btn" onClickCapture={ formik.handleReset }> Cancelar</a>

							<button type="submit" className="btn save-btn"> Guardar</button>

						</article>

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
