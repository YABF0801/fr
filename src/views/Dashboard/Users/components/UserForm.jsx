import { useFormik } from 'formik';
import PropTypes from 'prop-types'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

import {USERS} from '../../../../core/config/routes/paths';
import { useEffect } from "react";

const UserSchema = Yup.object().shape({
	nickname: Yup.string().required('El usuario es requerido'),
	name: Yup.string().required('El nombre es requerido'),
	lastname: Yup.string().required('El apellido es requerido'),
	password: Yup.string().required('El password es requerido'),
	position: Yup.string().required('El cargo es requerido'),
	role: Yup.string(),
});

function UserForm({ user }) {

	const { addUser, updateUser } = useUserContext();
	const navigate = useNavigate();
	  
	const form = useFormik({
		initialValues: {
			nickname: user ? user.nickname: '',
			name: user ? user.name: '',
			lastname: user ? user.lastname: '',
			password: user ? user.password: '',
			position: user ? user.position: '',
			role: user ? user.role: 'guest',
		},
		
		onSubmit: async (values, { resetForm }) => {
			const formData = {
			  ...values
			};
			
			if (user) {
			  await updateUser.mutate({id: user._id, formData});
			} else {
			  await addUser.mutate(formData);
			}
			resetForm();
			navigate(USERS)
		} ,
		onReset: async ( )  => {
			document.getElementById("user").style.display = "none";
		},
		validationSchema: UserSchema
	});

	const handleChange = (event) => {
		const isChecked = event.target.checked;
		if (isChecked)
			form.values.role = 'admin'
		if (!isChecked) {
			form.values.role = 'guest'
		}
	  };
	  
	  
	useEffect(() => {
	if (user) {
		form.setValues(user);
	}
	}, [user]);

  return (

  <div
      className='show-form container mt-3 col-6'  id="user"  >
	  <div className=' p-5'>
        <div className='card'>
          <form  className="f-modal p-3 gap-3 justify-content-between " onSubmit={form.handleSubmit}>      
		 
		  <h3 className='text-secondary mb-5'>Datos del usuario</h3>
						<div className='form-group'>
						
							<div className='row align-items-center'>           

								<div className='col-md-5 mb-3'>
									<input
										type='text'
										className='form-control'
										name='name'
										id='name'
										placeholder='Nombre'
										required
                    onChange={form.handleChange}
										value={form.values.name}
									/>
									{form.errors.name ? <p>{form.errors.name}</p> : null}
								</div>

             				   <div className='col-md-7 mb-3'>
									<input
										type='text'
										className='form-control'
										name='lastname'
										id='lastname'
										placeholder='Apellidos'
										required
                   				 onChange={form.handleChange}
										value={form.values.lastname}
									/>
									{form.errors.lastname ? <p>{form.errors.lastname}</p> : null}
								</div>

							</div>
						</div>

						<div className='form-group'>
            				<div className='row align-items-center'>

							<div className='col-md-12 mb-3'>
								<input
									type='text'
									className='form-control'
									name='position'
									id='position'
									placeholder='Cargo que ocupa en la empresa'
									required
								onChange={form.handleChange}
								value={form.values.position}
								/>
								{form.errors.position ? <p>{form.errors.position}</p> : null}
							</div>

								</div>

            
						</div>

	 					<div className='form-group'>
							<div className='row align-items-center'>

							<div className='col-md-4 mb-3 '>
									<input
										type='text'
										className='form-control'
										name='nickname'
										id='nickname'
										placeholder='Usuario'
										required
										onChange={form.handleChange}
										value={form.values.nickname}
									/>
									{form.errors.nickname ? <p>{form.errors.nickname}</p> : null}
								</div>

								<div className='col-md-4 mb-3'>
									<input
										type='password'
										className='form-control'
										name='password'
										id='password'
										placeholder='Contraseña'
									onChange={form.handleChange}
									value={form.values.password}
									/>
									{form.errors.password ? <p>{form.errors.password}</p> : null}
								</div>

								<div className='col-md-4 mb-3 form-check form-switch '>

									<input    
										type="checkbox" 
										className="form-check-input m-md-1"
										id='role'
										name='role'
										onClickCapture={handleChange}
										value={form.values.role}
										
										/>
										<label className='custom-control-label text-secondary' >Administrador</label>

									</div>

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

UserForm.propTypes = {
  user: PropTypes.object
}

export default UserForm;
