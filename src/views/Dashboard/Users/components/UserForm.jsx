import { useFormik } from 'formik';
import PropTypes from 'prop-types'
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

import {USERS} from '../../../../core/config/routes/paths';
import { useEffect } from "react";

const REQUIRED = 'Este campo es requerido';

const UserSchema = Yup.object().shape({
	nick_name: Yup.string().required(REQUIRED),
	first_name: Yup.string().required(REQUIRED),
	last_name: Yup.string().required(REQUIRED),
	password: Yup.string().required(REQUIRED),
	position: Yup.string().required(REQUIRED),
	role: Yup.string().required(REQUIRED),
	
});

function UserForm({ user }) {

	const { addUser } = useUserContext();
	const navigate = useNavigate();
	const form = useFormik({
		initialValues: {
			nick_name: user ? user?.nick_name:'',
			first_name: user ? user?.first_name:'',
			last_name: user ? user?.last_name:'',
			password: user ? user?.password:'',
			position: user ? user?.position:'',
			role: user ? user?.role:'guest',

		},
		onSubmit: async (newUser, { resetForm }) => {
			await addUser.mutate({
			  ...newUser
			});
			resetForm();
			navigate(USERS)
		} ,
		onReset: async ( )  => {
			document.getElementById("user").style.display = "none";
		},
		validationSchema: UserSchema
	});
	  
	useEffect(() => {

	}, [user]);

  return (

  <div
      className='show-form container mt-3 col-6'  id="user"  >
	  <div className=' p-5'>
        <div className='card-form'>
          <form  className="f-modal p-3 gap-3 justify-content-between " onSubmit={form.handleSubmit}>      
		 
		  <h3 className='text-secondary mb-5'>Datos del usuario</h3>
						<div className='form-group'>
						
							<div className='row align-items-center'>           

								<div className='col-md-5 mb-3'>
									<input
										type='text'
										className='form-control'
										name='first_name'
										id='first_name'
										placeholder='Nombre'
										required
                    onChange={form.handleChange}
										value={form.values.first_name}
									/>
									{form.errors.first_name ? <p>{form.errors.first_name}</p> : null}
								</div>

             				   <div className='col-md-7 mb-3'>
									<input
										type='text'
										className='form-control'
										name='last_name'
										id='last_name'
										placeholder='Apellidos'
										required
                   				 onChange={form.handleChange}
										value={form.values.last_name}
									/>
									{form.errors.last_name ? <p>{form.errors.last_name}</p> : null}
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
										name='nick_name'
										id='nick_name'
										placeholder='Usuario'
										required
										onChange={form.handleChange}
										value={form.values.nick_name}
									/>
									{form.errors.nick_name ? <p>{form.errors.nick_name}</p> : null}
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
										onChange={form.handleChange}
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
