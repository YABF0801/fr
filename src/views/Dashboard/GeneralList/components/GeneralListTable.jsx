import { Tooltip } from 'leaflet';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import { exportExcel } from '../../../../utils/Export';
import ExportBtn from '../../../../common/ExportBtn';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useAuthContext } from '../../../../core/context/authContext';
import { useSubmisionContext } from '../../../../core/context/SumisionContext';
import SubmisionForm from '../../NewSubmision/components/SubmisionWizard';
import { FiltersRow } from './Filters';
import GeneralListColumns from './GeneralListColumns';

<Tooltip id='tooltip' effect='solid' className='diff-arrow' />;

const GeneralListTable = () => {
	const { querySubmision, deleteSubmision, bajaSubmision } = useSubmisionContext();
	const [search, setSearch] = useState('');
	const [hideSocialCase, setHideSocialCase] = useState(true);
	const [hidePadre, setHidePadre] = useState(true);
	const [hidePhone, setHidePhone] = useState(true);
	const [hideAddress, setHideAddress] = useState(true);
	const [selectedSubmision, setSelectedSubmision] = useState(null);
	const [submisionsLocal, setSubmisionsLocal] = useState([]);
	const [searchData, setSearchData] = useState([]);
	const { isAuthenticated } = useAuthContext();
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [filterOption, setFilterOption] = useState('includes');
	const [selectedDate, setSelectedDate] = useState(null);
	const [disabledAll, setDisabledAll] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [showAllChecked, setShowAllChecked] = useState(false);

	useEffect(() => {
		setSubmisionsLocal(querySubmision.data);
		setSearchData(querySubmision.data);
		return function cleanUp() {};
	}, [querySubmision.data]);

	useEffect(() => {
		if (selectedFilters.length > 0 || selectedDate) {
			const filteredSubmissions = querySubmision.data.filter((submision) =>
				filterOption === 'includes'
					? new Date(submision.createdAt) >= selectedDate && selectedFilters.includes(submision.status) ||
					  selectedFilters.includes(submision.child.sex) ||
					  (selectedFilters.includes('socialCase') && submision.socialCase === true)
					: new Date(submision.createdAt) >= selectedDate &&
					  selectedFilters.every(
							(filter) =>
								filter === submision.status ||
								filter === submision.child.sex ||
								(filter === 'socialCase' && submision.socialCase === true)
					  )
			);

			setSubmisionsLocal(filteredSubmissions);
		} else {
			setSubmisionsLocal(querySubmision.data);
		}
	}, [selectedFilters, querySubmision.data, filterOption, selectedDate]);

	useEffect(() => {
		if (search.trim() === '') {
			setSubmisionsLocal(querySubmision.data);
			setSearchData(querySubmision.data);
		}
		return function cleanUp() {};
	}, [search]);

	const handleToggleFilterOption = () => {
		setFilterOption((prevOption) => (prevOption === 'includes' ? 'every' : 'includes'));
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleCancelDate = (date) => {
		setSelectedDate(null);
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
		const dataset = submisionsLocal.map((item) => ({
			No: item.entryNumber + ' / ' + new Date(item.createdAt).getFullYear(),
			Nombre: item.child.childName + item.child.childLastname,
			Sexo: item.child.sex,
			Año_de_vida: item.child.year_of_life,
			Madre: item.child.parents[0].parentName,
			Centro_de_Trabajo: item.child.parents[0].workName || '',
			Dirección: item.child.childAddress,
			Consejo_Popular: item.child.cPopular,
			Caso_Social: item.socialCase ? 'X' : '',
			Estado: item.status,
			Circulo: item.child.circulo || '',
		}));

		exportExcel(dataset, 'Planillas', 'Listado de Planillas');
		confirmAlert({
			message: `Planillas exportadas con éxito`,
			buttons: [{ className: 'save-btn', label: 'Aceptar', onClick: () => {} }],
		});
	};

	const confirmDelete = (row) => {
		confirmAlert({
			message: `Va a eliminar la planilla ${row.entryNumber}, ¿está seguro de eliminarla?`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				{ className: 'save-btn', label: 'Eliminar', onClick: () => deleteSubmisionById(row._id) },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const deleteSubmisionById = async (id) => {
		await deleteSubmision.mutate(id);
	};

	const confirmBaja = (row) => {
		confirmAlert({
			message: `Va a dar baja de la matricula a ${row.child.childName} ${row.child.childLastname}, ¿está seguro?`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				{ className: 'save-btn', label: 'Dar Baja', onClick: () => bajaSubmisionById(row._id) },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const bajaSubmisionById = async (id) => {
		await bajaSubmision.mutate(id);
	};

	const handleSearch = (event) => {
		const hasWorkName = (item) => item.workName !== undefined && item.workName !== '';
		const hasParentName = (item) => item.parentName !== undefined && item.parentName !== '';
		const hasParentLastname = (item) => item.parentLastname !== undefined && item.parentLastname !== '';
		const hasPhone = (item) => item.phoneNumber !== undefined;
		setSearch(event.target.value);

		const elements = searchData.filter((item) => {
			if (
				item.child.childAddress.toLowerCase().includes(search.toLowerCase()) ||
				item.child.childName.toLowerCase().includes(search.toLowerCase()) ||
				item.child.cPopular.toLowerCase().includes(search.toLowerCase()) ||
				item.child.carnet.toString().includes(search) ||
				(item.child.parents.every(hasWorkName) &&
					item.child.parents.some((parent) =>
						parent.workName.toLowerCase().includes(search.toLowerCase())
					)) ||
				(item.child.parents.every(hasParentName) &&
					item.child.parents.some((parent) =>
						parent.parentName.toLowerCase().includes(search.toLowerCase())
					)) ||
				(item.child.parents.every(hasParentLastname) &&
					item.child.parents.some((parent) =>
						parent.parentLastname.toLowerCase().includes(search.toLowerCase())
					)) ||
				(item.child.parents.every(hasPhone) &&
					item.child.parents.some((parent) => String(parent.phoneNumber).includes(search)))
			) {
				return item;
			}
			return null;
		});
		setSubmisionsLocal(elements);
	};

	const editSubmision = (id) => {
		const submision = submisionsLocal.find((item) => item._id === id);
		if (submision) {
			setSelectedSubmision(submision);
			handleShowForm();
		}
	};

	const handleShowAll = () => {
		setShowAllChecked(!showAllChecked);
		setHideSocialCase(!hideSocialCase);
		setHidePhone(!hidePhone);
		setHidePadre(!hidePadre);
		setHideAddress(!hideAddress);
		setDisabledAll(!showAllChecked);
	  };

	const handleHideSocialCase = () => {
		setHideSocialCase(!hideSocialCase);
	};

	const handleHidePhone = () => {
		setHidePhone(!hidePhone);
	};

	const handleHidePadre = () => {
		setHidePadre(!hidePadre);
	};

	const handleHideAddress = () => {
		setHideAddress(!hideAddress);
	};

	const handleShowForm = () => {
		setShowForm(true);
	  };
	
	  const handleHideForm = () => {
		setShowForm(false);
	  };

	function showFilters() {
		const filtersElement = document.getElementById('filters');
		if (filtersElement.style.display === 'none') {
			filtersElement.style.display = 'block';
		} else {
			filtersElement.style.display = 'none';
		}
	}

	const { columns } = GeneralListColumns({
		isAuthenticated,
		hideSocialCase,
		hideAddress,
		hidePhone,
		hidePadre,
		editSubmision,
		confirmDelete,
		confirmBaja,
	});


	return (
		<section className='list '>
			<div className='  p-2 pb-5'>
				<h2 className='text-center mt-3'>Listado de planillas</h2>
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
										id='show_all'
										checked={showAllChecked}
										onChange={handleShowAll}
									/>
									<label className='custom-control-label ' htmlFor='show_all'>
										Mostrar todo
									</label>
									
									<input
										type='checkbox'
										className='form-check-input m-md-1'
										id='show_social'
										onClick={handleHideSocialCase}
										disabled={disabledAll}
									/>
									<label className='custom-control-label ' htmlFor='show_social'>
										Caso Social
									</label>
									<input
										type='checkbox'
										className='form-check-input m-md-1'
										id='show_phones'
										onClick={handleHidePhone}
										disabled={disabledAll}
									/>
									<label className='custom-control-label ' htmlFor='show_phones'>
										Teléfonos
									</label>
									<input
										type='checkbox'
										className='form-check-input m-md-1'
										id='show_address'
										onClick={handleHideAddress}
										disabled={disabledAll}
									/>
									<label className='custom-control-label ' htmlFor='show_address'>
										Dirección
									</label>
									<input
										type='checkbox'
										className='form-check-input m-md-1'
										id='show_father'
										onClick={handleHidePadre}
										disabled={disabledAll}
									/>
									<label className='custom-control-label ' htmlFor='show_father'>
										Padre
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
										<a href='#submision' onClickCapture={handleShowForm} className='btn customize-btn'>
											<i className='bi bi-plus-lg'></i>
										</a>
									)}

									<ExportBtn handleExport={handleExport} />

								</div>
							</div>
						</div>
					</div>

					<div className='snow-glass '>
						<FiltersRow
							onFilterChange={handleFilter}
							handleToogleChange={handleToggleFilterOption}
							handleDateChange={handleDateChange}
							handleCancelDate={handleCancelDate}
							selectedDate={selectedDate}
						/>
					</div>

					<div className='card-bottom '>
						<div className='card-body '>
							{querySubmision.isLoading ? (
								<div className='row m-5'>
									<SmallSpinner className='m-4 mx-auto' data={'planillas'} color={'#36616c'} />
								</div>
							) : (
								<DataTable columns={columns} data={submisionsLocal} autoWidth={true} />
							)}

							<div className='text-secondary d-flex justify-conten-evenly gap-3'>
								<h4>Leyenda: </h4>
								<h6>OM: Otorgamiento masivo |</h6>
								<h6>OS: Otorgamiento sistemático | </h6>
								<h6>CS: Caso social </h6>
							</div>
						</div>
					</div>
					{showForm && <SubmisionForm submision={selectedSubmision} onHideForm={handleHideForm} />}
					
				</div>
			</div>
		</section>
	);
};

export default GeneralListTable;
