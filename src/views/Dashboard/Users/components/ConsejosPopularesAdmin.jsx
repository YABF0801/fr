import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { consejosApiDelete, consejosApiGet, consjeosApiCreate } from '../../../../utils/utiles.sevices';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { confirmAlert } from 'react-confirm-alert';

const ConsejosPopularesDropdown = () => {
  const [consejosPopulares, setConsejosPopulares] = useState([]);
  
  const form = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es requerido'),
    }),
    onSubmit: async (values, { resetForm }) => {
      await consjeosApiCreate(values);
      resetForm();
      fetchData(); // Actualizar el listado después de crear un nuevo consejo
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const consejosP = await consejosApiGet();
    if (consejosP) {
      setConsejosPopulares(consejosP);
    }
  };

  const handleDeleteConsejo = async (id) => {
    try {
      await consejosApiDelete(id); 
      setConsejosPopulares(consejosPopulares.filter((consejo) => consejo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
        message: `Va a eliminar un consjeo popular, ¿está seguro de eliminarlo?`,
        buttons: [
            {
                className: 'cancel-btn ',
                label: 'Cancelar',
                onClick: () => {},
            },
            { className: 'save-btn', label: 'Eliminar', onClick: () => handleDeleteConsejo(id) },
        ],
        className: 'button-group d-flex justify-content-evenly',
    });
};

  return (
    <div className='container-fluid '>
         <div className='row mb-3'>
    <form className='gap-3 d-flex d-flex-inline align-items-center' onSubmit={form.handleSubmit}>

    <input
     type='text'
     className='form-control '
     id='cpname'
     name='name'
     placeholder="Añadir nuevo consejo"
     value={form.values.name}
     onChange={form.handleChange}
     onBlur={form.handleBlur}
     autoFocus
      />
      <button className='save-btn btn' type='submit'>
        Añadir
      </button>

      </form>
      </div>
   
      <div className='row'>
      <Dropdown >
        <Dropdown.Toggle id="dropdown-consejos"  className="cancel-btn w-100">
          Consejos Populares
        </Dropdown.Toggle>

        <Dropdown.Menu  className="w-100 ">
          {consejosPopulares.map((consejo) => (
            <Dropdown.Item key={consejo._id} className='d-flex d-flex-inline justify-content-between'>
              {consejo.name}
              <button className='save-btn btn' onClick={() => confirmDelete(consejo._id)}>
                Eliminar
                </button>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
    </div>
  );
};

export default ConsejosPopularesDropdown;
