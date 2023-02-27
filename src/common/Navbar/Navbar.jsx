// FIX THIS NAVBAR AND TRY TO FIX TOGGLE TOO
import { Tooltip } from 'react-tooltip';
import { Link, NavLink } from 'react-router-dom';
// import { useState } from 'react';

import {
	/* HOME */ DASHBOARD,
	CIRCULOS,
	GENERAL_LIST,
	NEW_SUBMISISON,
	ORGANISMOS,
	PROPUESTAS_LIST,
	USERS,
	HELP,
} from '../../core/config/routes/paths';

import './Navbar.scss';

const Navbar = () => {

	return (
		<nav className='navbar navbar-expand-sm sticky-top bg-light shadow-sm '>

			<Tooltip id="tooltip" effect='solid' className="diff-arrow" />
			<div className='container-fluid'>
				<div className='navbar-brand'>
					<h1 className='d-inline-block m-3 '>
						<Link
							to={DASHBOARD}
							className='ociIcon'
						  >	
							<img src='/favicon_io/favicon.ico' />
							{' '}OCI
						</Link>
					</h1>
				</div> 

				<div
					className='navbar navbar-expand-sm justify-content-end'
					id='navbarNav'
				>

					<ul className='navbar-nav align-center gap-2'>
						<li className='nav-item props'  id='props'>
							<NavLink
								className='nav-link link text-dark '
								to={PROPUESTAS_LIST}
							>
								<i className='inav bi bi-ui-checks-grid' data-tooltip-id="tooltip" data-tooltip-content="Listado de Propuestas"></i>

							</NavLink>
						</li>

						<li className='nav-item plus' id='plus'>
							<NavLink
								className='nav-link link text-dark '
								to={NEW_SUBMISISON}
								
							>
								<i className='inav bi bi-plus-lg' data-tooltip-id="tooltip" data-tooltip-content="Nueva Solicitud"></i>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink
								className='nav-link link text-dark '
								to={GENERAL_LIST}
							>
								<i className='inav bi bi-files' data-tooltip-id="tooltip" data-tooltip-content="Listado de Planillas" ></i>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink
								className='nav-link link text-dark'
								to={DASHBOARD}
								
							>
								<i className='inav bi bi-bar-chart-fill' data-tooltip-id="tooltip" data-tooltip-content="Estadisticas"></i>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink
								className='nav-link link text-dark'
								to={CIRCULOS}
								
							>
								<i className='inav bi bi-house-gear' data-tooltip-id="tooltip" data-tooltip-content="Listado de Circulos"></i>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink
								className='nav-link link text-dark'
								to={ORGANISMOS}
								
							>
								<i className='inav bi bi-building-gear' data-tooltip-id="tooltip" data-tooltip-content="Listado de Organismos"></i>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink
								className='nav-link link text-success text-primary'
								to={USERS}
							>
								<i
									className='inav bi bi-person-fill-gear' data-tooltip-id="tooltip" data-tooltip-content="Listado de Usuarios"
								></i>
							</NavLink>
						</li>

						<Link
							className='nav-link link text-success text-primary '
							to={HELP}
						>
							<i className='inav bi-question-lg' data-tooltip-id="tooltip" data-tooltip-content="Ayuda"></i>
						</Link>

						<Link
							className='nav-link link text-success text-primary '
							to='/'
						>
							<i className='inav bi bi-box-arrow-in-right' data-tooltip-id="tooltip" data-tooltip-content="Cerrar Sesión" ></i>
						</Link>
					</ul>
				</div>
			</div>
		</nav>
	);
};



export default Navbar;
