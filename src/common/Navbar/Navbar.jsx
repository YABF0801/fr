// FIX THIS NAVBAR AND TRY TO FIX TOGGLE TOO
import { Tooltip } from 'react-tooltip';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

import {
	DASHBOARD,
	CIRCULOS,
	GENERAL_LIST,
	NEW_SUBMISISON,
	ORGANISMOS,
	PROPUESTAS_LIST,
	USERS,
	HELP,
} from '../../core/config/routes/paths';

import './Navbar.scss';
import { confirmAlert } from 'react-confirm-alert';
import { useAuthContext } from '../../core/context/authContext';

const Navbar = () => {
	const navigate = useNavigate();
	const { logout } = useAuthContext();
	const { isAuthenticated } = useAuthContext();
	
	const confirmExit = (row) => {
		confirmAlert({
			title: `Cerrar sesión`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				{
					className: 'save-btn',
					label: 'Salir',
					onClick: () => {
						logout();
						navigate('/');
					},
				},
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	return (
		<nav className='navbar navbar-expand-sm sticky-top bg-light shadow-sm '>
			<Tooltip id='tooltip' effect='solid' className='diff-arrow' />
			<div className='container-fluid'>
				<div className='navbar-brand'>
					<h1 className='d-inline-block m-3 '>
						<Link to={DASHBOARD} className='ociIcon'>
							<img src='/favicon_io/favicon.ico' alt='Icono de OCI' /> OCI
						</Link>
					</h1>
				</div>

				<div className='navbar navbar-expand-sm justify-content-end' id='navbarNav'>
					<ul className='navbar-nav align-center gap-2'>
						<li className='nav-item props' id='props'>
							<NavLink className='nav-link link text-dark ' to={PROPUESTAS_LIST}>
								<i
									className='inav bi bi-list-check'
									data-tooltip-id='tooltip'
									data-tooltip-content='Listado de Propuestas'
								/>
							</NavLink>
						</li>

						<li className='nav-item plus' id='plus'>
							<NavLink className='nav-link link text-dark ' to={NEW_SUBMISISON}>
								<i
									className='inav bi bi-plus-lg'
									data-tooltip-id='tooltip'
									data-tooltip-content='Nueva Solicitud'
								/>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink className='nav-link link text-dark ' to={GENERAL_LIST}>
								<i
									className='inav bi bi-file-earmark-text'
									data-tooltip-id='tooltip'
									data-tooltip-content='Listado de Planillas'
								/>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink className='nav-link link text-dark' to={DASHBOARD}>
								<i
									className='inav bi bi-bar-chart-fill'
									data-tooltip-id='tooltip'
									data-tooltip-content='Estadisticas'
								/>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink className='nav-link link text-dark' to={CIRCULOS}>
								<i
									className='inav bi bi-house-gear'
									data-tooltip-id='tooltip'
									data-tooltip-content='Listado de Circulos'
								/>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink className='nav-link link text-dark' to={ORGANISMOS}>
								<i
									className='inav bi bi-building-gear'
									data-tooltip-id='tooltip'
									data-tooltip-content='Listado de Organismos'
								/>
							</NavLink>
						</li>

						{
								isAuthenticated.user?.role === 'admin' && (<li className='nav-item'>
							<NavLink className='nav-link link text-success text-primary' to={USERS}>
								<i
									className='inav bi bi-gear-fill'
									data-tooltip-id='tooltip'
									data-tooltip-content='Administración'
								/>
							</NavLink>
						</li>)}

						<Link className='nav-link link text-success text-primary ' to={HELP}>
							<i
								className='inav bi-question-lg'
								data-tooltip-id='tooltip'
								data-tooltip-content='Ayuda'
							></i>
						</Link>

						<a className='nav-link link text-success text-primary ' onClick={() => confirmExit()}>
							<i
								className='inav bi bi-box-arrow-in-right'
								data-tooltip-id='tooltip'
								data-tooltip-content='Cerrar Sesión'
							></i>
						</a>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
