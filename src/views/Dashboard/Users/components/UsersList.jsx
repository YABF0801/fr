import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useSubmisionContext } from '../../../../core/context/SumisionContext';
import { useUserContext } from '../context/UserContext';
import AdministrationUtils from './AdministrationUtils';
import UserForm from './UserForm';
import UserColumns from './UserTableColumns';

const UsersList = () => {
	const { queryUsers, deleteUser } = useUserContext();
	const { querySubmision } = useSubmisionContext();
	const [usersLocal, setUsersLocal] = useState([]);
	const [searchData, setSearchData] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);

	const submisions = querySubmision.data ? querySubmision.data : [];

	useEffect(() => {
		setUsersLocal(queryUsers.data);
		setSearchData(queryUsers.data);
		return function cleanUp() {};
	}, [queryUsers.data]);

	useEffect(() => {
		if (search.trim() === '') {
			setUsersLocal(queryUsers.data);
			setSearchData(queryUsers.data);
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
		const elements = searchData.filter((item) => {
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

	const countSubmisionsByUser = (submisions) => {
		const countByUser = submisions.reduce((count, submision) => {
			const { createdBy } = submision;
			count[createdBy] = (count[createdBy] || 0) + 1;
			return count;
		}, {});

		return countByUser;
	};

	const countByUser = countSubmisionsByUser(submisions);

	const columns = UserColumns({ editUser, confirmDelete });

	function showForm() {
		document.getElementById('user').style.display = 'block';
	}

	const userColors = [
		'rgba(54, 162, 205, 0.4)',
		'rgba(255, 159, 104, 0.4)',
		'rgba(185, 149, 162, 0.4)',
		'rgba(123, 122, 225, 0.4)',
		'rgba(75, 192, 192, 0.4)',
	];

	return (
		<section className='list '>
			<div className='row p-2 pb-5'>
				<div className='col-8'>
					<h2 className='text-center mt-3'>Administración de usuarios</h2>
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
								<div className='row m-5'>
									<SmallSpinner className='m-4 mx-auto' data={'usuarios'} color={'#36616c'} />
								</div>
							) : (
								<DataTable columns={columns} data={usersLocal} />
							)}
						</div>
					</div>
					<div className='m-5'>
						<p className='text-start text-secondary t mt-2'>Cantidad de planillas creadas por usuarios</p>
						<div className='legend-bar-container'>
							{Object.entries(countByUser).map(([user, count], index) => (
								<div
									key={user}
									className='legend-bar'
									style={{
										width: `${(count / submisions.length) * 100}%`,
										backgroundColor: userColors[index % userColors.length],
									}}
								>
									<p className='legend-text text-secondary'>
										{user}: {count}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='col-4 mt-5'>
					<div className='card '>
						<div className='card-body '>
								<AdministrationUtils />
						</div>
					</div>
				</div>

				<UserForm user={selectedUser} />
			</div>
		</section>
	);
};

export default UsersList;
