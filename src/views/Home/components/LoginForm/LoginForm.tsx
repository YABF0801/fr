import React from 'react';
import './styles/LoginFormStyle.scss';
import { useNavigate } from 'react-router-dom';
import { PRIVATE } from '../../../../core/config/routes/paths';

const LoginForm = () => {
	const navigate = useNavigate();
	const handleClick = async () => {
		navigate(PRIVATE);
	};

	return (



		<div className="container ">
		<div className="d-flex justify-content-end h-100">


		<div className="card login-card">

				<form>
					<div className="input-group form-group mt-3">

						<div className="input-group-login ">
							<span className="text-light gap-3 m-3 "><i className="bi bi-person-fill"></i></span>
						</div>
						<input type="text" id="nick_name" className="loginput mb-3 text-center" 
						placeholder="Usuario"/>
					</div>

					<div className="input-group form-group">
						<div className="input-group-login">
							<span className="text-light gap-3 m-3"><i className="bi bi-key-fill"></i></span>
						</div>
						<input type="password" id="password" className="loginput mb-3 text-center" 
						placeholder="Contraseña"/>
					</div>

					<div >
						<button

						className='btn login-btn btn-light mb-3'
						onClick={handleClick}
					>
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

