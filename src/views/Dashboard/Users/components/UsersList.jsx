import { useUserContext } from '../context/UserContext';
import { useEffect, useState } from 'react';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import UserForm from './UserForm';

const UsersList = () => {
	const { users, deleteUser } = useUserContext();
	const [usersLocal, setUsersLocal] = useState([]);
	const [search, setSearch] = useState('')
	const [selectedUser, setSelectedUser] = useState(null);

	useEffect(() => {
		setUsersLocal(users);
		return function cleanUp() {};
	}, [users]);

	useEffect(() => {
		if (search.trim() === '') {
			setUsersLocal(users)}
		return function cleanUp() {};
	}, [search])

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
			if (  item.nickname.toLowerCase().includes(search.toLowerCase()) ||item.name.toLowerCase().includes(search.toLowerCase())|| item.lastname.toLowerCase().includes(search.toLowerCase())|| item.position.toLowerCase().includes(search.toLowerCase()))
			   {return item}
				return undefined});
            setUsersLocal(elements);
	};

	const columns = [
		{
			name: 'Usuario',
			id:1,
			selector: row => <h4 className='fw-bold'>{row.nickname}</h4>,
			sortable: true,
			center:true,
		},
		{
			name: 'Nombre',
			selector: row => row.name + ' ' + row.lastname,
			sortable: true,
		},
        {
			name: 'Cargo',
			selector: row => row.position,
			sortable: true,
            grow: 2,
/*             left:true */
		},
		{
			name: '',
			cell: (row) => (row.role === 'admin' ? <h4 className='text-active' >Admin</h4> : <p className='text-inactive'>Invitado</p>),
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

					<button
						onClick={() => deleteUsersById(row._id)}
						className='btn btn-sm'
					>
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
		document.getElementById("user").style.display = "block";
		}

	return (
		<section className='list '>
			<div className='container-main mt-3 p-2 pb-5'>
				<h2 className='text-center mt-2 p-3'>Listado de Usuarios</h2>
				<div className='card '>
					<div className='card-body '>

							<div className='pb-3 mb-4 gap-3 d-flex justify-content-between'>
							<div className="searchbar">
									<input 
									className="search_input " 
									id='search'
									placeholder="Búsqueda..."
									value={search} 
									onChange={handleSearch}
									/>
									<a className="search_icon"><i className="bi bi-search"></i></a>
							</div> 

							<div className="gap-3 form-check form-switch form-check-inline d-flex justify-content-between">
							
								<a href='#user' onClickCapture={showForm}
								className='btn customize-btn'>
								<i className='bi bi-plus-lg'></i>
								</a>

							</div>
					</div>

							<DataTable
								columns={columns}
								data={usersLocal}
							/>

					</div>
				</div>
				<UserForm user={selectedUser}/>
			</div>

		</section>
	);
};

export default UsersList;