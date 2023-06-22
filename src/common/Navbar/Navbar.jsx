// FIX TOGGLE 
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link, NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import {
	CIRCULOS, DASHBOARD, GENERAL_LIST, HELP,
	ORGANISMOS,
	PROPUESTAS_LIST,
	USERS
} from '../../core/config/routes/paths';
import { useAuthContext } from '../../core/context/authContext';
import { usePropuestasContext } from '../../core/context/PopuestasContext';
import './Navbar.scss';
import Pill from './PillBadge';

const Navbar = () => {
	
	const { logout } = useAuthContext();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { isAuthenticated } = useAuthContext();
	const { queryPropuestas } = usePropuestasContext();
	const [propsIcon, setPropsIcon] = useState(false);
	const [user, setUser] = useState();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	  };

	  console.log(propsIcon)
	  useEffect(() => {
		if (queryPropuestas.data && queryPropuestas.data.length) {
			setPropsIcon(true);
		} else {
			setPropsIcon(false);
		  }
		}, [queryPropuestas.data], );
		
	useEffect(() => {
		const user = isAuthenticated.user?.nickname
		setUser(user);
		}, []);

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
					<h1 className='d-inline-block '>
						<Link to={DASHBOARD} className='ociIcon'>
							<img src='/favicon_io/favicon.ico' alt='Icono de OCI' /> OCI
						</Link>
					</h1>
				</div>

				<button
          className={`navbar-toggler ${isMenuOpen ? 'collapsed' : ''}`}
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          aria-label='Toggle navigation'
          onClick={toggleMenu}
        >
          <span className='navbar-toggler-icon'></span>
        </button>

		<div className={`navbar-collapse ${isMenuOpen ? 'collapse show' : 'collapse navbar-expand-sm justify-content-end'}`} id='navbarNav'>
					<ul className='navbar-nav align-center gap-2'>
					<li className='nav-item props' id='props'>
						<NavLink className='nav-link link text-dark ' to={PROPUESTAS_LIST}>
								<i
									className='inav bi-list-task'
									data-tooltip-id='tooltip'
									data-tooltip-content='Otorgamiento masivo'
								/>
								
							<Pill id={'props-badge'} />
        
							</NavLink>
						</li>


						<li className='nav-item'>
							<NavLink className='nav-link link text-dark ' to={GENERAL_LIST}>
								<i
									className='inav bi bi-file-earmark-text'
									data-tooltip-id='tooltip'
									data-tooltip-content='Planillas'
								/>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink className='nav-link link text-dark' to={DASHBOARD}>
								<i
									className='inav bi bi-bar-chart-fill'
									data-tooltip-id='tooltip'
									data-tooltip-content='Estadísticas'
								/>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink className='nav-link link text-dark' to={CIRCULOS}>
								<i
									className='inav bi bi-house-gear'
									data-tooltip-id='tooltip'
									data-tooltip-content='Círculos'
								/>
							</NavLink>
						</li>

						<li className='nav-item'>
							<NavLink className='nav-link link text-dark' to={ORGANISMOS}>
								<i
									className='inav bi bi-building-gear'
									data-tooltip-id='tooltip'
									data-tooltip-content='Organismos'
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

						{isAuthenticated.user && (
						<a className='nav-link link text-secondary text-center mt-4' >
								<h4>Hola {user}!</h4>
						</a>)}
								
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
