import { useCirculoContext } from '../context/CirculoContext';
import { useEffect, useMemo, useState } from 'react';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import CirculoForm from './CirculoForm';
import { confirmAlert } from 'react-confirm-alert';
import { circulosFullDataset, exportExcel } from '../../../../common/Export';
import Proyeccion, { ProyeccionTable } from './Proyeccion';
import { useAuthContext } from '../../../../core/context/authContext';

const CirculosList = () => {
	const { circulos, deleteCirculo /* changeStatusCirculo */ } = useCirculoContext();
	const [circulosLocal, setCirculosLocal] = useState([]);
	const [search, setSearch] = useState('');
	const [hideMatricula, setHideMatricula] = useState(true);
	const [hideActive, setHideActive] = useState(true);
	const [selectedCirculo, setSelectedCirculo] = useState(null);
	const [showAttendance, setShowAttendance] = useState(false);

	const { isAuthenticated } = useAuthContext();

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

	useEffect(() => {
		setCirculosLocal(circulos);
		return function cleanUp() {};
	}, [circulos]);

	useEffect(() => {
		if (search.trim() === '') {
			setCirculosLocal(circulos);
		}
		return function cleanUp() {};
	}, [search]);

	const handleSearch = (event) => {
		setSearch(event.target.value);
		const elements = circulosLocal.filter((item) => {
			if (item.name.toLowerCase().includes(search.toLowerCase())) {
				return item;
			}
			return undefined;
		});
		setCirculosLocal(elements);
	};

	/* 	const confirmStatusChange = (row) => {
		confirmAlert({ 
		  message: `Va a descativar el circulo ${row.name}, ¿está seguro de desactivarlo?`, 
		  buttons: [ 
			{
				className: 'cancel-btn ',
			  label: 'Cancelar',
			  onClick: () => {},
			},
			{ className: 'save-btn',
			  label: 'Cambiar',
			  onClick: () => statusChangeCirculoById(row._id),
			},
		  ],
		  className: 'button-group d-flex justify-content-evenly'
		});
	  }; */

	/* 	  const statusChangeCirculoById = async (id) => {
		await changeStatusCirculo.mutate(id);
	}; */

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
		const circulo = circulos.find((item) => item._id === id);
		if (circulo) {
			setShowAttendance(true);
			setSelectedCirculo(circulo);
			showForm();
		}
	};

	const handleShowMatricula = () => {
		setHideMatricula(!hideMatricula);
	};

	const handleShowActive = () => {
		setHideActive(!hideActive);
	};

	const columns = useMemo(
		() => [
			{
				name: 'Numero',
				id: 1,
				selector: (row) => row.number,
				sortable: true,
				center: true,
				width: '8rem',
			},

			{
				name: 'Nombre',
				selector: (row) => <h4 className='fw-bold'>{row.name}</h4>,
				sortable: true,
				center: true,
				grow: 2,
			},
			{
				name: 'C 2',
				selector: (row) => row.normed_capacity2,
				sortable: true,
				center: true,
			},
			{
				name: 'M 2',
				selector: (row) => <h4 className='text-info'>{row.matricula2}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls2}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula2 - row.girls2}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: 'C 3',
				selector: (row) => row.normed_capacity3,
				sortable: true,
				center: true,
			},
			{
				name: 'M 3',
				selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls3}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula3 - row.girls3}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: 'C 4',
				selector: (row) => row.normed_capacity4,
				sortable: true,
				center: true,
			},
			{
				name: 'M 4',
				selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls4}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula4 - row.girls4}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: 'C 5',
				selector: (row) => row.normed_capacity5,
				sortable: true,
				center: true,
			},
			{
				name: 'M 5',
				selector: (row) => <h4 className='text-info'>{row.matricula5}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls5}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula5 - row.girls5}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: 'C 6',
				selector: (row) => row.normed_capacity6,
				sortable: true,
				center: true,
			},
			{
				name: 'M 6',
				selector: (row) => <h4 className='text-info'>{row.matricula6}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls6}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula6 - row.girls6}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: ' ',
				cell: (row) =>
					row.isCiActive ? (
						<h4 className='text-active'>Activo</h4>
					) : (
						<p className='text-inactive'>Inactivo</p>
					),
				sortable: true,
				omit: hideActive,
			},
			isAuthenticated.user?.role === 'admin' && {
				name: '', // action buttons
				cell: (row) => (
					<div className='d-flex gap-1 justify-content-center'>
						<a className='btn btn-sm' href='#circulo' onClickCapture={() => editCirculo(row._id)}>
							<i className='action-btn bi bi-pencil-square'></i>
						</a>

						<button onClick={() => confirmDelete(row)} className='btn btn-sm'>
							<i className='action-btn bi bi-trash-fill'></i>
						</button>
						{/* 
					<button
						onClick={() => confirmStatusChange(row)}
						className='btn btn-sm'
					><i className="action-btn bi bi-house-dash"></i>
					</button>

					 */}
					</div>
				),

				allowOverflow: true,
				button: true,
				width: '100px',
			},
		],
		[hideMatricula, hideActive]
	);

	function showForm() {
		document.getElementById('circulo').style.display = 'block';
	}

	return (
		<section className='list '>
			<div className=' mt-3 p-2 pb-5'>
				<div className='row'>
					<div className='col-md-4 '></div>
					<div className='col-md-4 '>
						<h2 className='text-center mt-2 p-3'>Listado de círculos</h2>
					</div>
					<div className='col-md-4'>
						<Proyeccion />
					</div>
				</div>

				<div className='card '>
					<div className='card-body '>
						<div className='pb-3 mb-4 gap-3 d-flex justify-content-center h-100'>
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
									Estado
								</label>
							</div>

							<div className='gap-3 form-check form-switch form-check-inline d-flex justify-content-between'>
								{isAuthenticated.user?.role === 'admin' && (
									<a href='#circulo' onClickCapture={showForm} className='btn customize-btn'>
										<i className='bi bi-plus-lg'></i>
									</a>
								)}

								<button type='excel' onClick={handleExport} className='btn export-btn'>
									Exportar
								</button>
							</div>
						</div>

						<DataTable columns={columns} data={circulosLocal} />

						<div className='text-secondary d-flex justify-conten-evenly gap-3'>
							<h4>Leyenda: </h4>
							<h6>C: Capacidad total por año |</h6>
							<h6>M: Matrícula real por año | </h6>
							<h6>H: Cantidad de niñas por año | </h6>
							<h6>V: Cantidad de niños por año </h6>
						</div>
					</div>
				</div>
				<CirculoForm circulo={selectedCirculo} showAttendance={showAttendance} />
				<ProyeccionTable />
			</div>
		</section>
	);
};

export default CirculosList;
