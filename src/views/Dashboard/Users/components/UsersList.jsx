import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import UserForm from './UserForm';
import { confirmAlert } from 'react-confirm-alert';

const UsersList = () => {
	const { queryUsers, deleteUser } = useUserContext();
	const [usersLocal, setUsersLocal] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);

	useEffect(() => {
		setUsersLocal(queryUsers.data);
		return function cleanUp() {};
	}, [queryUsers.data]);

	useEffect(() => {
		if (search.trim() === '') {
			setUsersLocal(queryUsers.data);
		}
		return function cleanUp() {};
	}, [search]);

	const confirmDelete = (row) => {
		confirmAlert({
			message: `Va a eliminar el usuario ${row.nickname}, ¿está seguro de eliminarlo?`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
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
		const user = queryUsers.data.find((item) => item._id === id);
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
			selector: (row) => <h4 className='fw-bold'>{row.nickname}</h4>,
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
					<a className='btn btn-sm' href='#user' onClickCapture={() => editUser(row._id)}>
						<i className='action-btn bi bi-pencil-square'></i>
					</a>

					<button onClick={() => confirmDelete(row)} className='btn btn-sm'>
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
									value={search}
									onChange={handleSearch}
								/>
								<a className='search_icon'>
									<i className='bi bi-search'></i>
								</a>
							</div>

							<div className='gap-3 form-check form-switch form-check-inline d-flex justify-content-between'>
								<a href='#user' onClickCapture={showForm} className='btn customize-btn'>
									<i className='bi bi-plus-lg'></i>
								</a>
							</div>
						</div>
						{queryUsers.isLoading ? (
							<span>Loading...</span>
						) : (
							<DataTable columns={columns} data={usersLocal} />
						)}
					</div>
				</div>

				<UserForm user={selectedUser} />
			</div>
		</section>
	);
};

export default UsersList;
