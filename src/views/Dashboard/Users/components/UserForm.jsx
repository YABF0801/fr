import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { renderSwitchSelect } from '../../../../common/uiForms/imputSwitch';
import { USERS } from '../../../../core/config/routes/paths';
import { userInitialValues } from '../../../../utils/initialValues/userInitialValues';
import { UserSchema } from '../../../../utils/yupValidations/userYupValidations';
import { useUserContext } from '../context/UserContext';

function UserForm({ user }) {
	const { addUser, updateUser } = useUserContext();
	const navigate = useNavigate();

	const form = useFormik({
		initialValues: userInitialValues(user),

		onSubmit: async (values, { resetForm }) => {
			const formData = {
				...values,
			};
			if (user) {
				await updateUser.mutate({ ...values });
			} else {
				await addUser.mutate(formData);
			}
			resetForm();
			navigate(USERS);
		},
		onReset: async () => {
			document.getElementById('user').style.display = 'none';
		},
		validationSchema: UserSchema,
	});

	useEffect(() => {
		if (user) {
			form.setValues(user);
		}
	}, [user]);

	   
	const handleChange = (event) => {
		const isChecked = event.target.checked;
		if (isChecked) form.setFieldValue('role', 'admin');
		if (!isChecked) {
			form.setFieldValue('role', 'guest');
		}
	};

	return (
		<div className='show-form container list mt-3 col-6' id='user'>
			<div className=' p-5'>
			{user ? <h2 className='text-center mt-5 p-3'>Editar usuario</h2> : <h2 className='text-center mt-5 p-3'>Nuevo usuario</h2>}
				<div className='card'>
					<form className='f-modal p-3 gap-3 justify-content-between ' onSubmit={form.handleSubmit}>
						<h3 className='text-secondary mb-5'>Datos del usuario</h3>
						<div className='form-group'>
							<div className='row align-items-center'>
								<div className='col-md-5 mb-3'>
									<input
										type='text'
										className='form-control'
										name='name'
										id='name'
										placeholder='Nombre *'
										onChange={form.handleChange}
										value={form.values.name}
										onBlur={form.handleBlur}
									/>
									{form.errors.name && form.touched.name ? (
										<p className='text-danger'>{form.errors.name}</p>
									) : null}
								</div>

								<div className='col-md-7 mb-3'>
									<input
										type='text'
										className='form-control'
										name='lastname'
										id='lastname'
										placeholder='Apellidos *'
										onChange={form.handleChange}
										value={form.values.lastname}
										onBlur={form.handleBlur}
									/>
									{form.errors.lastname && form.touched.lastname ? (
										<p className='text-danger'>{form.errors.lastname}</p>
									) : null}
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
										placeholder='Cargo que ocupa en la empresa *'
										onChange={form.handleChange}
										value={form.values.position}
										onBlur={form.handleBlur}
									/>
									{form.errors.position && form.touched.position ? (
										<p className='text-danger'>{form.errors.position}</p>
									) : null}
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
										placeholder='Usuario *'
										onChange={form.handleChange}
										value={form.values.nickname}
										onBlur={form.handleBlur}
									/>
									{form.errors.nickname && form.touched.nickname ? (
										<p className='text-danger'>{form.errors.nickname}</p>
									) : null}
								</div>

								<div className='col-md-4 mb-3'>
									<input
										type='password'
										className='form-control'
										name='password'
										id='password'
										placeholder={user ? 'Contraseña nueva' : 'Contraseña *'}
										onChange={form.handleChange}
										value={form.values.password}
										onBlur={form.handleBlur}
									/>
									{form.errors.password && form.touched.password ? (
										<p className='text-danger'>{form.errors.password}</p>
									) : null}
								</div>

								<div className='col-md-4 mb-3 form-check form-switch '>

								{renderSwitchSelect('role', 'Administrador', form, 
								form.values.role === 'admin', handleChange)}

								</div>
							</div>
						</div>

						<article className=' m-4 d-flex w-100 justify-content-center align-items-center gap-5'>
							<a href='#top' className='btn cancel-btn' onClick={form.handleReset}>
								{' '}
								Cancelar
							</a>

							<button type='submit' className='btn save-btn' >
								{' '}
								{user ? 'Actualizar' : 'Guardar'}
								
							</button>
						</article>
					</form>
				</div>
			</div>
		</div>
	);
}

UserForm.propTypes = {
	user: PropTypes.object,
};

export default UserForm;
