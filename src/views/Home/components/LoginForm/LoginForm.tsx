import React from "react";

import { useLogin } from "../../hooks/useLogin";
import "./styles/LoginFormStyle.scss";
import { replace, useFormik } from "formik";
import { useAuthContext } from "../../../../core/context/authContext";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../../../core/config/routes/paths";

const LoginForm = () => {
	const { loginUser } = useLogin();
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			nickname: "",
			password: "",
		},
		onSubmit: async ({ nickname, password }) => {
			loginUser({ nickname, password });			
			navigate(DASHBOARD, {replace:true})
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
