import { useOrganismoContext } from '../context/OrganismoContext';
import { useEffect, useState } from 'react';
import DataTable from '../../../../common/DataTableBase/DataTableBase';

import OrganismoForm from './OrganismoForm';

const OrganismosList = () => {
	const { organismos, deleteOrganismo } = useOrganismoContext();
	const [organismosLocal, setOrganismosLocal] = useState([]);
	const [search, setSearch] = useState('')

	useEffect(() => {
		setOrganismosLocal(organismos);
		return function cleanUp() {};
	}, [organismos]);

	useEffect(() => {
		if (search.trim() === '') {
			setOrganismosLocal(organismos)}
		return function cleanUp() {};
	}, [search])

	const deleteOrganismosById = async (id) => {
		await deleteOrganismo.mutate(id);
	};

	const editOrganismo = async (id) => {
		const organismo = await organismos.filter((item) => item._id === id);
		alert(`vas a editar${organismo}`); // abrir modal cargando el organismo de aqui arriba
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
		const elements = organismosLocal.filter((item) => {
			if (  item.name.toLowerCase().includes(search.toLowerCase()) ||item.description.toLowerCase().includes(search.toLowerCase()))
			   {return item}
				return undefined});
		setOrganismosLocal(elements);
	};

	  const handleExport = () => {
		alert('export organismos');
	  }

	const columns = [
		{
			name: 'Nombre',
			id:1,
			selector: row => <h4 className='fw-bold'>{row.name}</h4>,
			sortable: true,
			center:true,
		},
		{
			name: 'Descripción',
			selector: row => row.description,
			sortable: true,
			grow:2,
		},
		{
			name: 'Priorizado',
			selector: row => row.priorizado,
			cell: row => row.priorizado ? <i className="fs-5 listcheck bi bi-check-lg"></i> :'',
			sortable: true,
			center:true
		},
		{
			name: '', // action buttons
			cell: (row) => (
				<div className='d-flex gap-1 justify-content-center'>
					
					<button className='btn btn-sm'
						onClick={editOrganismo}>
						<i className='action-btn bi bi-pencil-square'></i>
					</button>

					<button
						onClick={() => deleteOrganismosById(row._id)}
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
		document.getElementById("organismo").style.display = "block";
		}
	
	return (
		<section className='list '>
			<div className='container-main mt-3 p-2 pb-5'>
				<h2 className='text-center mt-2 p-3'>Listado de Organismos</h2>
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
								<a href='#organismo' onClickCapture={showForm}
								className='btn customize-btn'>
								<i className='bi bi-plus-lg'></i>
								</a>

								<button
									type='excel'
									onClick={handleExport}
									className='btn export-btn'
								> Exportar
								</button>
							</div>
					</div>

							<DataTable
								columns={columns}
								data={organismosLocal}
							/>

					</div>
				</div>
			</div>
			<OrganismoForm />
		</section>
	);
};

export default OrganismosList;