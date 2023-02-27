import { Formik, Form } from "formik";
import { Tab, Tabs } from "react-bootstrap";
import * as Yup from "yup";
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { GENERAL_LIST } from '../../../../core/config/routes/paths';

import { useSubmisionContext } from '../../GeneralList/context/SumisionContext';

import './SumisionForm.scss';
import ChildForm from "./ChildForm";
import Parent1Form from "./Parent1Form";
import Parent2Form from "./Parent2Form"; 
import SubmisionForm from "./SubmisionForm";


const initialValues = {
    entryNumber: '',
    socialCase: false,
    finality: 'om',
    submisiontype: 'new',
    motive: '',
    ciPedido: {
        name: ''},

    child: { 
        childName: '',
        childLastname: '',
        year_of_life: '',
        carnet: '',
        childAdress: '',
        neighborhood: '',
        cPopular: '',
        municipality: 'Isla de la Juventud',
        province: 'Isla de la Juventud',
        lat: 21.72761,
        lon: -82.834167,
        circulo: {
            id: '',
            name: ''},

        parents: [{ 
        parentName: '',
        parentLastname: '',
        uniqueParent: false,
        typeParent: 'madre',
        convivencia: true,
        parentAddress: '',
        phoneNumber: '',
        occupation: 'trabajador',
        workName: '',
        workAddress: '',
        jobTitle: '',
        organismo: {
            name: '',
            weight: ''},
        salary: '',
        otherChildrenInCi: false,
        numberOfOtherChildrenInCi: '',
        otherChildrenCenter: {
            name: ''},
        pregnant: false,
        deaf: false,},

        {   parentName: '',
            parentLastname: '',
            typeParent: 'padre',
            convivencia: true,
            parentAddress: '',
            phoneNumber: '',
            occupation: 'trabajador',
            workName: '',
            workAddress: '',
            jobTitle: '',
            salary: '',},
        ]},
};

const SubmisionSchema = Yup.object().shape({
	entryNumber: Yup.number().required('Se requiere un Nùmero de enntrada'),
	socialCase: Yup.boolean(),
	finality: Yup.string(),
	submisiontype: Yup.string(),
	motive: Yup.string(),
	status: Yup.string(),
	ciPedido: Yup.object().shape({
		name: Yup.string(),
	}),

	child: Yup.object().shape({
		childName: Yup.string().required('Se requiere un nombre'),
		childLastname: Yup.string().required('Se requiere un apellido'),
		carnet: Yup.number().required('Se requiere un número de identificación'),
		year_of_life: Yup.number().required('Seleccione un año de vida'),
		childAdress: Yup.string().required('Se requiere una dirección'),
		neighborhood: Yup.string(),
		cPopular: Yup.string(),
		municipality: Yup.string(),
		province: Yup.string(),
		lat: Yup.number().required('Se requiere una ubicación en el mapa'),
		lon: Yup.number().required('Se requiere una ubicación en el mapa'),
		circulo: Yup.object().when('status', {
			is: 'matricula',
			then: Yup.object().shape({
				name: Yup.string(),
			}),
		}),

		parents: Yup.array().of(
			Yup.object().shape({
				parentName: Yup.string().required('Se requiere un nombre'),
				parentLastname: Yup.string().required('Se requiere un apellido'),
				uniqueParent: Yup.boolean(),
				typeParent: Yup.string().required('Se requiere este campo'),
				convivencia: Yup.boolean(),
				parentAddress: Yup.string().when('convivencia', {
					is: false,
					then: Yup.string().required('Se requiere una  dirección'),
				}),
				phoneNumber: Yup.string().required('Se requiere un número de teléfono'),
				occupation: Yup.string(),
				workName: Yup.string(),
				workAddress: Yup.string(),
				jobTitle: Yup.string(),
	
				organismo: Yup.object().when('typeParent', {
					is: 'madre',
					then: Yup.object().shape({
						name: Yup.string().required('Se requiere un organismo'),
					}),
				}),
				salary: Yup.number(),

				otherChildrenInCi: Yup.boolean(),
	
				numberOfOtherChildrenInCi: Yup.number().when('otherChildrenInCi', {
					is: true,
					then: Yup.number().required('Especifique la cantidad'),
				}),
	
				otherChildrenCenter: Yup.string().when('otherChildrenInCi', {
					is: true,
					then: Yup.string().required('Especifique el lugar'),
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

const SubmisionWizardForm = () => {
  const { addSubmision } = useSubmisionContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [values, setValues] = useState({});

  const handleNext = (data) => {
    setValues({ ...values, ...data });
    setActiveTab((prevTab) => prevTab + 1);
  };

  const handlePrev = () => setActiveTab((prevTab) => prevTab - 1);

  const handleReset = () => {
		navigate(GENERAL_LIST);
		document.getElementById('plus').style.display = 'none';
	};

  return (
    
    <Formik
      initialValues={initialValues}
      validationSchema={SubmisionSchema}
      onSubmit={async (values, { resetForm }) => {
        const data = { ...values};
        try {
          await addSubmision.mutate({
            data
        });
        resetForm();
        navigate(GENERAL_LIST);
        document.getElementById('plus').style.display = 'none';
        } catch (error) {
          console.error(error);
        } 
      }}

    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className='wizard-form p-2'>
          <h2 className='text-center mt-2 p-3'>Nueva Solicitud</h2>
          <Tabs 
                activeKey={activeTab} 
                className='d-flex justify-content-center btn text-tab ' 
                onSelect={(key) => setActiveTab(parseInt(key))}>
            <Tab eventKey={0} title="">
              <SubmisionForm />
            </Tab>
            <Tab eventKey={1} title=""> 
              <ChildForm />
            </Tab>
            <Tab eventKey={2} title="">
              <Parent1Form />
            </Tab>
            <Tab eventKey={3} title="">
              <Parent2Form /> 
            </Tab>
          </Tabs>

          <div className="mt-4 d-flex w-100 justify-content-center align-items-center gap-5">


            {activeTab > 0 ? (
              <button className='btn cancel-btn mb-3' onClick={handlePrev}>
                Atrás
              </button>
            ):(
              <a className='transparent-btn mb-3' />
            )
            }

            {activeTab < 4 && (
              <button className='btn cancel-btn mb-3' type="button" onClick={handleReset} >
                Cancelar
              </button>
            )}

            {activeTab < 3 ? (
              <button className='btn save-btn mb-3' type='button' onClick={handleNext}>
                Siguiente
              </button>
            ) : (
              <button className='btn save-btn mb-3' type='submit' disabled={isSubmitting}>
                Guardar
              </button>
            )}

          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubmisionWizardForm;