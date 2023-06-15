import { Tooltip } from 'leaflet';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import { exportExcel } from '../../../../common/Export';
import ExportBtn from '../../../../common/ExportBtn';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useAuthContext } from '../../../../core/context/authContext';
import { useSubmisionContext } from '../../../../core/context/SumisionContext';
import SubmisionForm from '../../NewSubmision/components/SubmisionWizard';
import { FiltersRow } from './Filters';
import GeneralListColumns from './GeneralListColumns';
import OfCanvasToOm from './OfCanvasToOm';

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
	const { isAuthenticated } = useAuthContext();

	useEffect(() => {
		setSubmisionsLocal(querySubmision.data);
		return function cleanUp() {};
	}, [querySubmision.data]);
	
	const handleFilter = (search, selected) => {
		if (submisionsLocal.length > 0) {
			const filter = submisionsLocal.filter(
			  (submision) => submision[search] === selected
			);
			setSubmisionsLocal(filter);
		  }
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

	useEffect(() => {
		if (search.trim() === '') {
			setSubmisionsLocal(querySubmision.data);
		}
		return function cleanUp() {};
	}, [search]);

	const handleSearch = (event) => {
		const hasWorkName = (item) => item.workName !== undefined && item.workName !== '';
		const hasParentName = (item) => item.parentName !== undefined && item.parentName !== '';
		const hasParentLastname = (item) => item.parentLastname !== undefined && item.parentLastname !== '';
		const hasPhone = (item) => item.phoneNumber !== undefined;
		setSearch(event.target.value);

		const elements = submisionsLocal.filter((item) => {
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
			showForm();
		}
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

	function showForm() {
		document.getElementById('submision').style.display = 'block';
	}

	function showFilters() {
		const filtersElement = document.getElementById('filters');
		if (filtersElement.style.display === 'none') {
			filtersElement.style.display = 'block';
		} else {
			filtersElement.style.display = 'none';
		}
	}

	return (
		<section className='list '>
			<div className='  p-2 pb-5'>
				<h2 className='text-center mt-3'>Listado de planillas</h2>

<button onClick={() => handleFilter('status','baja')}>DSKJBFDKJSBV</button>

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
										onClick={handleHideSocialCase}
									/>
									<label className='custom-control-label ' htmlFor='show_matricula'>
										Caso Social
									</label>
									<input
										type='checkbox'
										className='form-check-input m-md-1'
										id='show_matricula'
										onClick={handleHidePhone}
									/>
									<label className='custom-control-label ' htmlFor='show_matricula'>
										Teléfono
									</label>
									<input
										type='checkbox'
										className='form-check-input m-md-1'
										id='show_matricula'
										onClick={handleHideAddress}
									/>
									<label className='custom-control-label ' htmlFor='show_matricula'>
										Dirección
									</label>
									<input
										type='checkbox'
										className='form-check-input m-md-1'
										id='show_matricula'
										onClick={handleHidePadre}
									/>
									<label className='custom-control-label ' htmlFor='show_matricula'>
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
										<a href='#submision' onClickCapture={showForm} className='btn customize-btn'>
											<i className='bi bi-plus-lg'></i>
										</a>
									)}

									<ExportBtn handleExport={handleExport} />

									{isAuthenticated.user?.role === 'admin' && <OfCanvasToOm />}
								</div>
							</div>
						</div>
					</div>

					<div className='snow-glass '>
						<FiltersRow />
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
					<SubmisionForm submision={selectedSubmision} />
				</div>
			</div>
		</section>
	);
};

export default GeneralListTable;
