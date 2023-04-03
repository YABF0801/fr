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
    ciPedido: '',

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
        latlng: null,

        /*     done until here    */
        
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
        organismo: {},
        salary: 0,
        otherChildrenInCi: false,
        numberOfOtherChildrenInCi: 0,
        otherChildrenCenter: '',
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
            salary: 0},
        ]},
};

const SubmisionSchema = Yup.object().shape({
	socialCase: Yup.boolean(),
	finality: Yup.string(),
	submisiontype: Yup.string(),
	motive: Yup.string(),
	status: Yup.string(),
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
/*     done until here    */

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
            then: Yup.number().required('Especifique la cantidad')}),
          otherChildrenCenter: Yup.string().when('otherChildrenInCi', {
            is: true,
            then: Yup.string().required('Especifique el círculo')}),
          pregnant: Yup.boolean().when('typeParent', {
            is: 'Madre',
            then: Yup.boolean()}),
          deaf: Yup.boolean(),
        })
		),
	}),
	
});

const SubmisionWizardForm = ({submision} ) => {
  const { addSubmision, updateSubmision } = useSubmisionContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [values, setValues] = useState(initialValues);

  const handleNext = (data) => {
    setValues({ ...values, ...data });
    setActiveTab((prevTab) => prevTab + 1);
  };

  const handlePrev = () => setActiveTab((prevTab) => prevTab - 1);

  const handleReset = () => {
		document.getElementById('submision').style.display = 'none';
	};

  return (
    
    <Formik
      initialValues={initialValues} 
      validationSchema={SubmisionSchema}
      onSubmit={async (values, { resetForm,  setSubmitting }) => {
        const formData = {
          ...values
         };
        try {
          if (submision) {
            await updateSubmision.mutate({...values});
          } else {
            
            await addSubmision.mutate(formData);
          }
        resetForm();

        setSubmitting(false);
        navigate(GENERAL_LIST);
        document.getElementById('plus').style.display = 'none';
        } catch (error) {
          console.error(error);
        } 
      }}
>
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className='wizard-form p-2 list show-form' id="submision">
          <h2 className='text-center mt-5 p-3'>Nueva Solicitud</h2>
          <Tabs 
                activeKey={activeTab} 
                onSelect={(key) => setActiveTab(parseInt(key))}>
            <Tab eventKey={0} title="" >
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
              <a href='#top' className='btn cancel-btn mb-3' type="button" onClick={handleReset} >
                Cancelar
              </a>
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

