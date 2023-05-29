import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import UserForm from './UserForm';
import { confirmAlert } from 'react-confirm-alert';
import {
	FechaOmApiGet,
	resetContadorGp,
	setContadorGp,
	resetFechaOm,
	resetToolsArrays,
	getContadorGp,
	setContadorCc,
	getContadorCc,
} from '../../../../utils/utiles.sevices';
import { useNavigate } from 'react-router-dom';
import { PROPUESTAS_LIST } from '../../../../core/config/routes/paths';
import DatePickerToOm from './datePicker';
import { propuestaApiGenerar } from '../../Propuestas/service/propuestas.services';
import { nuevoCursoApiGet } from '../../Circulos/service/circulo.services';
import { consecustiveApiReset } from '../../GeneralList/service/submision.services';

const UsersList = () => {
	const { users, deleteUser } = useUserContext();
	const [usersLocal, setUsersLocal] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);
	const [botonComenzarHabilitado, setBotonComenzarHabilitado] = useState(false);
	const [botonCambioDeCursoHabilitado, setBotonCambioDeCursoHabilitado] = useState(false);
	const [botonGenerarPropuestaHabilitado, setBotonGenerarPropuestaHabilitado] = useState(false);
	const [botonFinalizarHabilitado, setBotonFinalizarHabilitado] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const intervalId = setInterval(() => {
			UsersList();
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const storedDate = await FechaOmApiGet();
			const date = new Date(storedDate);
			const fechaActual = new Date();

			const compare = date.getTime() <= fechaActual.getTime();
			if (storedDate && compare) {
				setBotonComenzarHabilitado(true);
				/* 				await consecustiveApiReset(); */
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const contadorGP = await getContadorGp();

			if (contadorGP !== 0) {
				setBotonCambioDeCursoHabilitado(true);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const contadorCC = await getContadorCc();
			if (contadorCC !== 0) {
				setBotonGenerarPropuestaHabilitado(true);
				setBotonFinalizarHabilitado(true);
				setBotonComenzarHabilitado(false);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		setUsersLocal(users);
		return function cleanUp() { };
	}, [users]);

	useEffect(() => {
		if (search.trim() === '') {
			setUsersLocal(users);
		}
		return function cleanUp() { };
	}, [search]);

	const confirmFinalizarOms = () => {
		confirmAlert({
			message: `Va a dar por finalizado el otorgamiento masivo de este año. ¿Está seguro?`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => { },
				},
				{ className: 'save-btn', label: 'Aceptar', onClick: () => handleFinalizar() },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const handleGenerateProps = async () => {
		await propuestaApiGenerar();
		await setContadorGp(1); // Actualizar contador en la base de datos
		navigate(PROPUESTAS_LIST);
		document.getElementById('props').style.display = 'block';
	};

	const confirmCambioDeCurso = () => {
		confirmAlert({
			message: (
				<>
					<div>
						<p>Va a ejecutar el cambio de curso, esta acción modificará su base de datos </p>
					</div>
					<div>
						<p>Está seguro? </p>
					</div>
				</>
			),
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => { },
				},

				{ className: 'save-btn', label: 'Aceptar', onClick: () => handleCambioDeCurso() },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const handleResetConsecutivo = async () => {
		// TODO: para cuando llegue la fecha del otorgamiento
		await consecustiveApiReset();
	};

	const handleCambioDeCurso = async () => {
		await setContadorCc(1);
		setBotonComenzarHabilitado(false);
		await nuevoCursoApiGet();
	};

	const handleFinalizar = async () => {
		await resetContadorGp();
		await resetFechaOm();
		await resetToolsArrays();
	};

	const confirmDelete = (row) => {
		confirmAlert({
			message: `Va a eliminar el usuario ${row.nickname}, ¿está seguro de eliminarlo?`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => { },
				},
				{ className: 'save-btn', label: 'Eliminar', onClick: () => deleteUsersById(row._id) },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const deleteUsersById = async (id) => {
		await deleteUser.mutate(id);
	};

	const editUser = async (id) => {
		const user = users.find((item) => item._id === id);
		if (user) {
			setSelectedUser(user);
			showForm();
		}
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
		const elements = usersLocal.filter((item) => {
			if (
				item.nickname.toLowerCase().includes(search.toLowerCase()) ||
				item.name.toLowerCase().includes(search.toLowerCase()) ||
				item.lastname.toLowerCase().includes(search.toLowerCase()) ||
				item.position.toLowerCase().includes(search.toLowerCase())
			) {
				return item;
			}
			return undefined;
		});
		setUsersLocal(elements);
	};

	const columns = [
		{
			name: 'Usuario',
			id: 1,
			selector: (row) => <h4 className='fw-bold'>{ row.nickname }</h4>,
			sortable: true,
			center: true,
		},
		{
			name: 'Nombre',
			selector: (row) => row.name + ' ' + row.lastname,
			sortable: true,
		},
		{
			name: 'Cargo',
			selector: (row) => row.position,
			sortable: true,
			grow: 2,
			/*             left:true */
		},
		{
			name: '',
			cell: (row) =>
				row.role === 'admin' ? (
					<h4 className='text-active'>Admin</h4>
				) : (
					<p className='text-inactive'>Invitado</p>
				),
			sortable: true,
			center: true,
		},
		{
			name: '', // action buttons
			cell: (row) => (
				<div className='d-flex gap-1 justify-content-center'>
					<a className='btn btn-sm' href='#user' onClickCapture={ () => editUser(row._id) }>
						<i className='action-btn bi bi-pencil-square'></i>
					</a>

					<button onClick={ () => confirmDelete(row) } className='btn btn-sm'>
						<i className='action-btn bi bi-trash-fill'></i>
					</button>
				</div>
			),
			allowOverflow: true,
			button: true,
			width: '100px',
		},
	];

	function showForm() {
		document.getElementById('user').style.display = 'block';
	}

	return (
		<section className='list '>
			<div className=' mt-3 p-2 pb-4'>
				<h2 className='text-center mt-2 p-3'>Otorgamiento masivo</h2>
				<div className='card '>
					<div className='card-body '>
						<div className='gap-3 mt-5 form-check d-flex justify-content-between'>
							<DatePickerToOm />

							<button
								type='button'
								id='generar-btn'
								className='btn prop-btn'
								data-tooltip-id='tooltip'
								onClick={ handleGenerateProps }
								data-tooltip-content='Comenzar otorgamiento'
								disabled={ !botonComenzarHabilitado }
							>
								Comenzar
							</button>

							<button
								type='button'
								id='cambio-btn'
								onClick={ confirmCambioDeCurso }
								data-tooltip-id='tooltip'
								className='btn prop-btn'
								data-tooltip-content='Cambio de Curso'
								disabled={ !botonCambioDeCursoHabilitado }
							>
								Cambio de Curso
							</button>

							<button
								type='button'
								id='generar-btn'
								className='btn prop-btn'
								data-tooltip-id='tooltip'
								onClick={ handleGenerateProps }
								data-tooltip-content='Generar nueva propuesta '
								disabled={ !botonGenerarPropuestaHabilitado }
							>
								Generar propuesta
							</button>

							<button
								type='button'
								id='finalizar-btn'
								className='btn prop-btn'
								data-tooltip-id='tooltip'
								onClick={ confirmFinalizarOms }
								data-tooltip-content='Finalizar otorgamiento'
								disabled={ !botonFinalizarHabilitado }
							>
								Finalizar
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className=' mt-3 p-2 pb-5'>
				<h2 className='text-center p-3'>Administración de usuarios</h2>
				<div className='card '>
					<div className='card-body '>
						<div className='pb-3 mb-4 gap-3 d-flex justify-content-between '>
							<div className='searchbar'>
								<input
									className='search_input '
									id='search'
									placeholder='Búsqueda...'
									value={ search }
									onChange={ handleSearch }
								/>
								<a className='search_icon'>
									<i className='bi bi-search'></i>
								</a>
							</div>

							<div className='gap-3 form-check form-switch form-check-inline d-flex justify-content-between'>
								<a href='#user' onClickCapture={ showForm } className='btn customize-btn'>
									<i className='bi bi-plus-lg'></i>
								</a>
							</div>
						</div>

						<DataTable columns={ columns } data={ usersLocal } />
					</div>
				</div>

				<UserForm user={ selectedUser } />
			</div>
		</section>
	);
};

export default UsersList;
