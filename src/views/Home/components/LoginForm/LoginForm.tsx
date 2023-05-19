import React from "react";
import  * as Yup from 'yup'

import { useLogin } from "../../hooks/useLogin";
import "./styles/LoginFormStyle.scss";
import {  useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../../../core/config/routes/paths";

const LoginForm = () => {
	const { loginUser } = useLogin();
	const navigate = useNavigate()


	const LoginSchema = Yup.object().shape({
		nickname: Yup.string().required('El nombre es requerido'),
		password: Yup.string().required('La descripción es requerida'),
	});

	const formik = useFormik({
		initialValues: {
			nickname: "",
			password: "",
		},
		validationSchema:LoginSchema,
		onSubmit:  async ({ nickname, password }) => {
				await loginUser({ nickname, password });			
				navigate(DASHBOARD, {replace:true});			
		},
	});

	return (
		<div className="container ">
			<div className="d-flex justify-content-end h-100">
				<div className="card login-card">
					<form onSubmit={formik.handleSubmit}>
						<div className="input-group form-group mt-3">
							<div className="input-group-login ">
								<span className="text-light gap-3 m-3 ">
									<i className="bi bi-person-fill" />
								</span>
							</div>
							<input
								type="text"
								id="nick_name"
								name="nickname"
								value={formik.values.nickname}
								onChange={formik.handleChange}
								className="loginput mb-3 text-center"
								placeholder="Usuario"
							/>
							{formik.errors.nickname && formik.touched.nickname ? <p className='text-danger'>{formik.errors.nickname}</p> : null}
						</div>

						<div className="input-group form-group">
							<div className="input-group-login">
								<span className="text-light gap-3 m-3">
									<i className="bi bi-key-fill" />
								</span>
							</div>
							<input
								type="password"
								id="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								className="loginput mb-3 text-center"
								placeholder="Contraseña"
							/>
							{formik.errors.password && formik.touched.password ? <p className='text-danger'>{formik.errors.password}</p> : null}
						</div>

						<div>
							<button className='btn login-btn btn-light mb-3' type="submit">
								Entrar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
