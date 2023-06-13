import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useAuthContext } from '../../../../core/context/authContext';
import { useOrganismoContext } from '../context/OrganismoContext';
import OrganismoForm from './OrganismoForm';
import OrganismoColumns from './OrganismoTableColumns';

const OrganismosList = () => {
	const { queryOrganismos, deleteOrganismo } = useOrganismoContext();
	const [organismosLocal, setOrganismosLocal] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedOrganismo, setSelectedOrganismo] = useState(null);

	const { isAuthenticated } = useAuthContext();

	useEffect(() => {
		setOrganismosLocal(queryOrganismos.data);
		return function cleanUp() {};
	}, [queryOrganismos.data]);

	useEffect(() => {
		if (search.trim() === '') {
			setOrganismosLocal(queryOrganismos.data);
		}
		return function cleanUp() {};
	}, [search]);

	const confirmDelete = (row) => {
		confirmAlert({
			message: `Va a eliminar el organismo ${row.name}, ¿está seguro de eliminarlo?`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				{ className: 'save-btn', label: 'Eliminar', onClick: () => deleteOrganismoById(row._id) },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const deleteOrganismoById = async (id) => {
		await deleteOrganismo.mutate(id);
	};

	const editOrganismo = async (id) => {
		const organismo = queryOrganismos.data.find((item) => item._id === id);
		if (organismo) {
			setSelectedOrganismo(organismo);
			showForm();
		}
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
		const elements = organismosLocal.filter((item) => {
			if (
				item.name.toLowerCase().includes(search.toLowerCase()) ||
				item.description.toLowerCase().includes(search.toLowerCase())
			) {
				return item;
			}
			return undefined;
		});
		setOrganismosLocal(elements);
	};

	const columns = OrganismoColumns({ isAuthenticated, editOrganismo, confirmDelete });

	function showForm() {
		document.getElementById('organismo').style.display = 'block';
	}

	return (
		<section className='list '>
			<div id='top' className=' mt-3 p-2 pb-5'>
				<h2 className='text-center mt-2 p-3'>Listado de organismos</h2>
				<div className='card '>
					<div className='card-body '>
						<div className='pb-3 mb-4 gap-3 d-flex justify-content-between'>
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
								{isAuthenticated.user?.role === 'admin' && (
									<a href='#organismo' onClickCapture={showForm} className='btn customize-btn'>
										<i className='bi bi-plus-lg'></i>
									</a>
								)}
							</div>
						</div>

						{queryOrganismos.isLoading ? (
							<div className='row m-5'>
							<SmallSpinner className='m-4 mx-auto' data={'organismos'} color={'#36616c'}/>
							</div>
						) : (
							<DataTable columns={columns} data={organismosLocal} />
						)}

					</div>
				</div>
				<OrganismoForm organismo={selectedOrganismo} />
			</div>
		</section>
	);
};

export default OrganismosList;
