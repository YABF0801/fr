import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import { circulosFullDataset, exportExcel } from '../../../../utils/Export';
import ExportBtn from '../../../../common/ExportBtn';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useAuthContext } from '../../../../core/context/authContext';
import { useCirculoContext } from '../context/CirculoContext';
import CirculoForm from './CirculoForm';
import CirculoColumns from './CirculoTableColumns';
import { FiltersRow } from './Filters';
import YearMenu, { HistoricTable } from './Historic';
import Proyeccion, { ProyeccionTable } from './Proyeccion';

const CirculosList = () => {
	const { queryCirculos, deleteCirculo } = useCirculoContext();
	const [search, setSearch] = useState('');
	const [hideMatricula, setHideMatricula] = useState(true);
	const [hideActive, setHideActive] = useState(true);
	const [selectedCirculo, setSelectedCirculo] = useState(null);
	const [showAttendance, setShowAttendance] = useState(false);
	const [circulosLocal, setCirculosLocal] = useState([]);
	const [searchData, setSearchData] = useState([]);
	const [selectedYear, setSelectedYear] = useState(null);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [filterOption, setFilterOption] = useState('includes');
	const [showForm, setShowForm] = useState(false);
	const [showHistoric, setShowHistoric] = useState(false);

	const { isAuthenticated } = useAuthContext();

	useEffect(() => {
		setCirculosLocal(queryCirculos.data);
		setSearchData(queryCirculos.data)
		return function cleanUp() {};
	}, [queryCirculos.data]);

	useEffect(() => {
		if (selectedFilters.length > 0) {
			const filteredSubmissions = queryCirculos.data.filter((circulo) =>
				filterOption === 'includes'
					? selectedFilters.includes(circulo.circulotype) ||
					  (selectedFilters.includes('isCiActive') && circulo.isCiActive === true)
					: selectedFilters.every(
							(filter) =>
								filter === circulo.circulotype ||
								(filter === 'isCiActive' && circulo.isCiActive === true)
					  )
			);
			setCirculosLocal(filteredSubmissions);
		} else {
			setCirculosLocal(queryCirculos.data);
		}
	}, [selectedFilters, queryCirculos.data, filterOption]);

	useEffect(() => {
		if (search.trim() === '') {
			setCirculosLocal(queryCirculos.data);
			setSearchData(queryCirculos.data)
		}
		return function cleanUp() {};
	}, [search]);

	const handleToggleFilterOption = () => {
		setFilterOption((prevOption) => (prevOption === 'includes' ? 'every' : 'includes'));
	};

	const handleFilter = (filter, isChecked) => {
		setSelectedFilters((prevSelectedFilters) => {
			if (isChecked) {
				return [...prevSelectedFilters, filter];
			} else {
				return prevSelectedFilters.filter((selectedFilter) => selectedFilter !== filter);
			}
		});
	};

	const handleExport = () => {
		const dataset = circulosFullDataset(circulosLocal);
		exportExcel(dataset, 'Circulos', 'Listado de Circulos');
		confirmAlert({
			message: `Circulos exportados con éxito`,
			buttons: [
				{
					className: 'save-btn',
					label: 'Aceptar',
					onClick: () => {},
				},
			],
		});
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
		const elements = searchData.filter((item) => {
			if (item.name.toLowerCase().includes(search.toLowerCase())) {
				return item;
			}
			return undefined;
		});
		setCirculosLocal(elements);
	};

	const confirmDelete = (row) => {
		confirmAlert({
			message: `Va a eliminar el circulo ${row.name}, ¿está seguro de eliminarlo?`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				{ className: 'save-btn', label: 'Eliminar', onClick: () => deleteCirculoById(row._id) },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const deleteCirculoById = async (id) => {
		await deleteCirculo.mutate(id);
	};

	const editCirculo = async (id) => {
		const circulo = queryCirculos.data.find((item) => item._id === id);
		if (circulo) {
			setShowAttendance(true);
			setSelectedCirculo(circulo);
			handleShowForm();
		}
	};

	const handleShowMatricula = () => {
		setHideMatricula(!hideMatricula);
	};

	const handleShowActive = () => {
		setHideActive(!hideActive);
	};

	const handleShowForm = () => {
		setShowForm(true);
	  };
	
	  const handleHideForm = () => {
		setShowForm(false);
	  };

	  const handleShowHistoric = () => {
		setShowHistoric(true);
	  };

	  const handleHideHistoric = () => {
		setShowHistoric(false);
	  };

	function showFilters() {
		const filtersElement = document.getElementById('filters');
		if (filtersElement.style.display === 'none') {
			filtersElement.style.display = 'block';
		} else {
			filtersElement.style.display = 'none';
		}
	}

	const { columns } = CirculoColumns({
		isAuthenticated,
		hideMatricula,
		hideActive,
		editCirculo,
		confirmDelete,
	});

	return (
		<section className='list '>
			<div className='  p-2 pb-5'>
				<div className='row'>
					<h2 className='text-center mt-3'>Listado de círculos</h2>
				</div>
							
				<div className='card-t'>
					<div className='card-top'>
						<div className='card-body '>
							<div className='pb-3 mt-2 p-2 gap-3 d-flex justify-content-between '>
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

								<div className='gap-3 m-md-2 form-check form-switch form-range d-flex justify-content-end'>
									<input
										type='checkbox'
										className='form-check-input m-md-1'
										id='show_matricula'
										onClick={handleShowMatricula}
									/>
									<label className='custom-control-label ' htmlFor='show_matricula'>
										Matrícula
									</label>
									<input
										type='checkbox'
										className='form-check-input m-md-1'
										id='show_active'
										onClick={handleShowActive}
									/>
									<label className='custom-control-label ' htmlFor='show_active'>
										Tipo
									</label>
								</div>

								<div className='gap-3 form-check form-switch form-check-inline d-flex justify-content-between'>
									<div className='gap-1  justify-content-end'>
										<a className='btn btn-sm' onClick={showFilters}>
											<i
												className='bi action-btn bi-funnel-fill'
												data-tooltip-id='tooltip'
												data-tooltip-content='Filtrar'
											></i>
										</a>
									</div>

									{isAuthenticated.user?.role === 'admin' && (
										<a href='#circulo' onClickCapture={handleShowForm} 
										className='btn customize-btn'>
											<i className='bi bi-plus-lg'></i>
										</a>
									)}

									<ExportBtn handleExport={handleExport} />

									<Proyeccion />

									<YearMenu onSelectYear={setSelectedYear} showHistoric={handleShowHistoric}/>

								</div>
							</div>
						</div>
					</div>

					<div className='snow-glass '>
						<FiltersRow onFilterChange={handleFilter} handleChange={handleToggleFilterOption} />
					</div>

					<div className='card-bottom '>
						<div className='card-body '>
							{queryCirculos.isLoading ? (
								<div className='row m-5'>
									<SmallSpinner className='m-4 mx-auto' data={'circulos'} color={'#36616c'} />
								</div>
							) : (
								<DataTable columns={columns} data={circulosLocal} />
							)}

							<div className='text-secondary d-flex justify-conten-evenly gap-3'>
								<h4>Leyenda: </h4>
								<h6>C: Capacidad total por año |</h6>
								<h6>M: Matrícula real por año | </h6>
								<h6>H: Cantidad de niñas por año | </h6>
								<h6>V: Cantidad de niños por año </h6>
							</div>
						</div>
					</div>
				</div>

				{showForm && <CirculoForm circulo={selectedCirculo} showAttendance={showAttendance} 
				onHideForm={handleHideForm} />}

				<ProyeccionTable />

				{showHistoric && <HistoricTable year={selectedYear} onHide={handleHideHistoric} />}

			</div>
		</section>
	);
};

export default CirculosList;
