import { useSubmisionContext } from '../context/SumisionContext';
import { useEffect, useMemo, useState } from 'react';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import SubmisionForm from '../../NewSubmision/components/SubmisionWizard';
import { confirmAlert } from 'react-confirm-alert';
import { exportExcel } from '../../../../common/Export';
import { useAuthContext } from '../../../../core/context/authContext';


const GeneralListTable = () => {
	const { submisions, deleteSubmision, bajaSubmision } = useSubmisionContext();
	const [submisionsLocal, setSubmisionsLocal] = useState([]);
	const [search, setSearch] = useState('');
	const [hideSocialCase, setHideSocialCase] = useState(true);
	const [hidePadre, setHidePadre] = useState(true);
	const [hidePhone, setHidePhone] = useState(true);
	const [hideAddress, setHideAddress] = useState(true);
	const [selectedSubmision, setSelectedSubmision] = useState(null);

	const { isAuthenticated } = useAuthContext();

	const handleExport = () => {
		const dataset = submisionsLocal.map((item) => ({
			No: item.entryNumber + ' / ' + new Date(item.createdAt).getFullYear(),
			Nombre: item.child.childName + item.child.childLastname,
			Sexo: item.child.sex,
			Año_de_vida: item.child.year_of_life,
			Madre: item.child.parents[0].parentName,
			Centro_de_Trabajo: item.child.parents[0].workName || '',
			Dirección: item.child.childAdress,
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

	useEffect(() => {
		setSubmisionsLocal(submisions);
		return function cleanUp() {};
	}, [submisions]);

	useEffect(() => {
		if (search.trim() === '') {
			setSubmisionsLocal(submisions);
		}
		return function cleanUp() {};
	}, [search]);

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
		const elements = submisionsLocal.filter((item) => {
			if (
				item.child.childAdress.toLowerCase().includes(search.toLowerCase()) ||
				item.child.childName.toLowerCase().includes(search.toLowerCase()) ||
				item.child.cPopular.toLowerCase().includes(search.toLowerCase()) ||
				String(item.child.carnet).includes(search) ||
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
			return undefined;
		});
		setSubmisionsLocal(elements);
	};

	const editSubmision = async (id) => {
		const submision = submisions.find((item) => item._id === id);
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

	const columns = useMemo(
		() => [
			{
				name: 'No.',
				id: 1,
				selector: (row) => row.entryNumber + ' / ' + new Date(row.createdAt).getFullYear(),
				sortable: true,
				center: true,
				width: '6rem',
			},
			{
				name: ' ',
				cell: (row) =>
					row.finality === 'om' ? <h4 className='text-info'>OM</h4> : <h4 className='text-warning'>OS</h4>,
				sortable: true,
				center: true,
				width: '3.5rem',
			},
			{
				name: 'CS',
				selector: (row) => row.socialCase,
				cell: (row) => (row.socialCase ? <i className='fs-5 listcheck bi bi-check-lg'></i> : ''),
				sortable: true,
				center: true,
				omit: hideSocialCase,
				width: '4rem',
			},
			{
				name: 'Nombre',
				selector: (row) => (
					<h4 className='fw-bold'>
						{row.child.childName} {row.child.childLastname}
					</h4>
				),
				sortable: true,
				grow: 2,
				width: '11rem',
			},
			{
				name: 'Carnet',
				selector: (row) => row.child.carnet,
				sortable: true,
				center: true,
				width: '7rem',
			},
			{
				name: 'Dirección',
				selector: (row) => row.child.childAdress,
				grow: 4,
				omit: hideAddress,
			},
			{
				name: 'Sexo',
				cell: (row) => {
					if (row.child.sex === 'masculino') {
						return <h4 className='text-info '>M</h4>;
					}
					if (row.child.sex === 'femenino') {
						return <h4 className='text-danger '>F</h4>;
					}
				},

				sortable: true,
				center: true,
				width: '6rem',
			},
			{
				name: 'Edad',
				cell: (row) => {
					if (row.child.age < 1) {
						return row.child.age / 0.01 + 'm';
					}
					return row.child.age;
				},
				sortable: true,
				center: true,
				width: '5rem',
			},
			{
				name: 'Año',
				selector: (row) => row.child.year_of_life,
				sortable: true,
				center: true,
				width: '5rem',
			},
			{
				name: 'Madre',
				selector: (row) => row.child.parents[0].parentName + ' ' + row.child.parents[0].parentLastname,
				sortable: true,
				grow: 2,
				width: '10rem',
			},
			{
				name: 'Teléfono',
				selector: (row) => row.child.parents[0].phoneNumber,
				grow: 2,
				omit: hidePhone,
				width: '6rem',
			},
			{
				name: 'Centro de Trabajo',
				cell: (row) => {
					if (row.child.parents[0].workName) {
						return row.child.parents[0].workName;
					} else if (!row.child.parents[0].workName && row.child.parents[0].occupation === 'jubilado') {
						return <p>Jubilado</p>;
					} else if (!row.child.parents[0].workName && row.child.parents[0].occupation === 'asistenciado') {
						return <p className='text-secondary'>Asistenciado</p>;
					}
				},
				sortable: true,
				grow: 2,
				width: '9rem',
			},
			{
				name: 'Padre',
				cell: (row) =>
					row.child.parents[1]
						? row.child.parents[1].parentName + ' ' + row.child.parents[1].parentLastname
						: '',
				sortable: true,
				grow: 2,
				omit: hidePadre,
				width: '10rem',
			},
			{
				name: 'C.Popular',
				selector: (row) => row.child.cPopular,
				sortable: true,
				grow: 2,
				width: '8rem',
			},
			{
				name: ' ',
				cell: (row) => {
					if (row.status === 'matricula') {
						return <h4 className='text-success '>Matrícula</h4>;
					} else if (row.status === 'pendiente') {
						return <h4 className='text-secondary '>Pendiente</h4>;
					} else if (row.status === 'baja') {
						return <h4 className='text-danger '>Baja</h4>;
					}
				},
				sortable: true,
				center: true,
			},
			{
				name: 'Ciculo',
				cell: (row) => {
					if (row.child.circulo) {
						return row.child.circulo.name;
					} else {
						return '';
					}
				},
				sortable: true,
				grow: 2,
				width: '8rem',
				center: true,
			},
			{
				name: '', // action buttons
				cell: (row) => {
					isAuthenticated.user?.role === 'admin' && (
						<div className='action d-flex '>
							<a className='btn btn-sm' href='#submision' onClickCapture={() => editSubmision(row._id)}>
								<i className='action-btn bi bi-pencil-square'></i>
							</a>

							<button onClick={() => confirmDelete(row)} className='btn btn-sm'>
								<i className='action-btn bi bi-trash-fill'></i>
							</button>

							<button onClick={() => confirmBaja(row)} className='btn btn-sm'>
								<i className='action-btn bi bi-person-dash'></i>
							</button>
						</div>
					);
				},
				allowOverflow: true,
				button: true,
				width: '9rem',
			},
		],
		[hideSocialCase, hideAddress, hidePhone, hidePadre]
	);

	function showForm() {
		document.getElementById('submision').style.display = 'block';
	}

	return (
		<section className='list '>
			<div className='container-main mt-3 p-2 pb-5'>
				<h2 className='text-center mt-2 p-3'>Listado de Planillas</h2>

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
							{
								isAuthenticated.user?.role === 'admin' && (<a href='#submision' onClickCapture={showForm} className='btn customize-btn'>
									<i className='bi bi-plus-lg'></i>
								</a>)}

								<button type='excel' onClick={handleExport} className='btn export-btn'>
									Exportar
								</button>
							</div>
						</div>
						<DataTable columns={columns} data={submisionsLocal} autoWidth={true} />

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
		</section>
	);
};

export default GeneralListTable;
