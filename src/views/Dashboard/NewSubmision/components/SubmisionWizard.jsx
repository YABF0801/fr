
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

const req = 'campo requerido';

const SubmisionSchema = Yup.object().shape({
	finality: Yup.string(),
	submisiontype: Yup.string(),
	entryNumber: Yup.number().required(req),
	socialCase: Yup.boolean(),
	motive: Yup.string().optional(),
	status: Yup.string(),
	ciPedido: Yup.string().optional(),

	child: Yup.object().shape({
		childName: Yup.string().min(2, 'minimo 2 caracteres').max(20, 'maximo 20 caracteres').required('Se requiere un nombre'),
		childLastname: Yup.string().min(2, 'minimo 2 caracteres').max(50, 'maximo 50 caracteres').required('Se requiere al menos un apellido'),
		carnet: Yup.number().required('Se requiere un número de identificación'),
		year_of_life: Yup.number().required('Seleccione un año de vida'),
		childAddress: Yup.string().min(2, 'minimo 2 caracteres').max(70, 'maximo 70 caracteres').required('Se requiere una dirección'),
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
				parentName: Yup.string().min(2, 'minimo 2 caracteres').max(20, 'maximo 20 caracteres').required('Se requiere un nombre'),
				parentLastname: Yup.string().min(2, 'minimo 2 caracteres').max(50, 'maximo 50 caracteres').required('Se requiere un apellido'),
				uniqueParent: Yup.boolean().optional(),
				typeParent: Yup.string(),
				convivencia: Yup.boolean(),
				parentAddress: Yup.string().when('convivencia', {
					is: false,
					then: Yup.string().min(2, 'minimo 2 caracteres').max(70, 'maximo 70 caracteres').required('Se requiere una  dirección'),
				}),
				phoneNumber: Yup.string().min(8, 'minimo 8 caracteres').max(15, 'maximo 15 caracteres').required('Se requiere un número de teléfono'),
				occupation: Yup.string(),
				
				workName: Yup.string().optional().when('occupation', {
					is: 'trabajador' || 'estudiante',
					then: Yup.string().min(2, 'minimo 2 caracteres').max(70, 'maximo 70 caracteres').required('Se requiere el nombre del centro'),
				}),
				workAddress: Yup.string().optional().when('occupation', {
					is: 'trabajador',
					then: Yup.string().min(2, 'minimo 2 caracteres').max(70, 'maximo 70 caracteres').required('Se requiere la dirección del centro de trabajo'),
				}),
				jobTitle: Yup.string().optional().when('occupation', {
					is: 'trabajador',
					then: Yup.string().min(4, 'minimo 4 caracteres').max(50, 'maximo 50 caracteres').required('Se requiere el cargo que ocupa'),
				}),

				organismo: Yup.object().optional().when('occupation', {
					is: 'trabajador',
					then: Yup.object().required('Se requiere un organismo'),
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
		initialValues: {
			finality: submision ? submision.finality : 'om',
			submisiontype: submision ? submision.submisiontype : 'new',
			entryNumber: submision ? submision.entryNumber : '',
			socialCase: submision ? submision.socialCase : false,	
			motive: submision ? submision.motive : 'me da la gana',
			status: submision ? submision.status : 'pendiente',
			ciPedido: submision ? submision.ciPedido : '',

			child: {
				childName: submision ? submision.child.childName : 'Perico',
				childLastname: submision ? submision.child.childLastname : 'Perez',
				carnet: submision ? submision.child.carnet : '19010824651',
				year_of_life: submision ? submision.child.year_of_life : 2,
				childAddress: submision ? submision.child.childAddress : 'mi casita',
				neighborhood: submision ? submision.child.neighborhood : 'mi barrio',
				cPopular: submision ? submision.child.cPopular : 'Micro 70',
				municipality: submision ? submision.child.municipality : 'Isla de la Juventud',
				province: submision ? submision.child.province : 'Isla de la Juventud',

		/**/	circulo: submision ? submision.child.circulo.name: '',

				latlng: submision ? submision.child.latlng : null,

				parents: [
					{
						parentName: submision ? submision.child.parents[0].parentName : 'Madre',
						parentLastname: submision ? submision.child.parents[0].parentLastname : 'Apellido Madre',
						uniqueParent: submision ? submision.child.parents[0].uniqueParent : false,
						typeParent: submision ? submision.child.parents[0].typeParent : 'madre',
						convivencia: submision ? submision.child.parents[0].convivencia : true,
						parentAddress: submision ? submision.child.parents[0].parentAddress : 'mi casita',
						phoneNumber: submision ? submision.child.parents[0].phoneNumber : '58029954',
						occupation: submision ? submision.child.parents[0].occupation : 'trabajador',
						workName: submision ? submision.child.parents[0].workName : 'mi trabajo',
						workAddress: submision ? submision.child.parents[0].workAddress : 'donde queda la oficina',
						jobTitle: submision ? submision.child.parents[0].jobTitle : 'jefa de todo',

						organismo: submision ? submision.child.parents[0].organismo.name : 'ETECSA55',
						
						salary: submision ? submision.child.parents[0].salary : 15000,
						otherChildrenInCi: submision ? submision.child.parents[0].otherChildrenInCi : false,
						numberOfOtherChildrenInCi: submision ? submision.child.parents[0].numberOfOtherChildrenInCi : 0,
						otherChildrenCenter: submision ? submision.child.parents[0].otherChildrenCenter : '',
						pregnant: submision ? submision.child.parents[0].pregnant : false,
						deaf: submision ? submision.child.parents[0].deaf : false,
					},
					{
						parentName: submision ? submision.child.parents[1].parentName : 'El padre',
						parentLastname: submision ? submision.child.parents[1].parentLastname : 'Apellidos Padre',
						typeParent: submision ? submision.child.parents[1].typeParent : 'padre',
						convivencia: submision ? submision.child.parents[1].convivencia : false,
						parentAddress: submision ? submision.child.parents[1].parentAddress : 'su propia casa',
						phoneNumber: submision ? submision.child.parents[1].phoneNumber : '58029954',
						occupation: submision ? submision.child.parents[1].occupation : 'trabajador',
						workName: submision ? submision.child.parents[1].workName : 'su trabajo',
						workAddress: submision ? submision.child.parents[1].workAddress : 'que se yo',
						jobTitle: submision ? submision.child.parents[1].jobTitle : 'jefe tambien',
						salary: submision ? submision.child.parents[1].salary : 15000,
					},
				],
			},
		},

/* 		real
			initialValues: {
			finality: submision ? submision.finality : 'om',
			submisiontype: submision ? submision.submisiontype : 'new',
			entryNumber: submision ? submision.entryNumber : '',
			socialCase: submision ? submision.socialCase : false,	
			motive: submision ? submision.motive : '',
			status: submision ? submision.status : 'pendiente',
			ciPedido: submision ? submision.ciPedido : '',

			child: {
				childName: submision ? submision.child.childName : '',
				childLastname: submision ? submision.child.childLastname : '',
				carnet: submision ? submision.child.carnet : '',
				year_of_life: submision ? submision.child.year_of_life : '',
				childAddress: submision ? submision.child.childAddress : '',
				neighborhood: submision ? submision.child.neighborhood : '',
				cPopular: submision ? submision.child.cPopular : '',
				municipality: submision ? submision.child.municipality : 'Isla de la Juventud',
				province: submision ? submision.child.province : 'Isla de la Juventud',

		//	circulo: submision ? submision.child.circulo.name: '',

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

						organismo: submision ? submision.child.parents[0].organismo.name : '',
						
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
		}, */
		
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
						// onSubmit={ formik.handleSubmit }
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
						{ formik.values.child?.parents?.[0].uniqueParent || <Parent2Form form={ formik } /> }

						<div className=" m-4 d-flex w-100 justify-content-center align-items-center gap-5">

							<a href='#top' className="btn cancel-btn" onClickCapture={ formik.handleReset }> Cancelar</a>

							{/* <button type="submit" className="btn save-btn">Guardar</button> */ }
							<button type="submit" className="btn save-btn" onClick={()=> addSubmision.mutate(formik.values)}>Guardar</button>
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
