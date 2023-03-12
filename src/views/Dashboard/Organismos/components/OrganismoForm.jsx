import { useFormik } from 'formik';
import PropTypes from 'prop-types' 
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"
import { useOrganismoContext } from '../context/OrganismoContext';

import {ORGANISMOS} from '../../../../core/config/routes/paths';
import { useEffect } from "react";

const OrganismoSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  priorizado: Yup.boolean(),
});

function OrganismoForm ({ organismo }) {

  const { addOrganismo, updateOrganismo } = useOrganismoContext();
	const navigate = useNavigate()
  
  const form = useFormik({
    initialValues: {
      name: organismo ? organismo.name : '',
      description: organismo ? organismo.description : '',
      priorizado: organismo ? organismo.priorizado : false,
    },

    onSubmit: async (values, { resetForm }) => {
      const formData = {
        ...values
      };
      
      if (organismo) {
        await updateOrganismo.mutate({id: organismo.id, formData});
      } else {
        await addOrganismo.mutate(formData);
      }
      resetForm();
      navigate(ORGANISMOS)
    },
    onReset: async ( )  => {
			document.getElementById("organismo").style.display = "none";
		},
    validationSchema: OrganismoSchema
  });

  useEffect(() => {
    if (organismo) {
      form.setValues(organismo);
    }
  }, [organismo]);

    return (
      <div
      className='show-form container mt-3 col-6'  id="organismo"  
    >
    	<div className=' p-5'>
        <div className='card-form'>
              <form  className="f-modal p-3 gap-3 justify-content-between " onSubmit={form.handleSubmit}>
						<div className='form-group'>
              <div className='row'>
                          <h3 className='text-secondary'>Datos del organismo</h3>
                            <h6 className="text-secondary mb-4">Escriba el nombre y y defina si es priorizado</h6>

                            <div className='col-md-9 mb-3'>
                              <input
                                type='text'
                                className='form-control'
                                id='name'
                                name='name'
                                placeholder='Nombre'
                                value={form.values.name}
                                onChange={form.handleChange}
                                autoFocus
                              />
                              {form.errors.name ? <p className='text-danger'>{form.errors.name}</p> : null}
                          </div>

                            <div className='col-md-3 mb-3 form-check form-switch'>
                            <input    
                              type="checkbox" 
                              className="form-check-input m-md-1" 
                              name='priorizado'
                              id='priorizado'
                              onChange={form.handleChange}
                              />
                            <label className='custom-control-label text-secondary' htmlFor='priorizado'>Priorizado</label>
                          </div>
                     </div>
                  </div>

                  <div className='form-group mt-3 mb-3'>
                     <div className='row '>
                        <textarea className="form-control"
                              rows={2} 
                              name="description"
                              id='description'
                              placeholder='Escriba una breve descripción'
                              value={form.values.description}
                              onChange={form.handleChange}
                            />
                            {form.errors.description ? <p className='text-danger'>{form.errors.description}</p> : null}
                          
                        </div>
                  </div>

             <article className=" m-4 d-flex w-100 justify-content-center align-items-center gap-5">

              <a href='#top' className="btn cancel-btn" onClickCapture={form.handleReset}> Cancelar</a>

              <button type="submit" className="btn save-btn"> Guardar</button>

              </article>

            </form>

        </div>
      </div>
  </div>
    );
  };
  
    
  OrganismoForm.propTypes = {
    organismo: PropTypes.object,
    };

  export default OrganismoForm;