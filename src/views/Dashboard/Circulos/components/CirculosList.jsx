import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import { circulosFullDataset, exportExcel } from '../../../../common/Export';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useAuthContext } from '../../../../core/context/authContext';
import { useCirculoContext } from '../context/CirculoContext';
import CirculoForm from './CirculoForm';
import CirculoColumns from './CirculoTableColumns';
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
	const [selectedYear, setSelectedYear] = useState(null);

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
		setCirculosLocal(queryCirculos.data);
		return function cleanUp() {};
	}, [queryCirculos.data]);

	useEffect(() => {
		if (search.trim() === '') {
			setCirculosLocal(queryCirculos.data);
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
			showForm();
		}
	};

	const handleShowMatricula = () => {
		setHideMatricula(!hideMatricula);
	};

	const handleShowActive = () => {
		setHideActive(!hideActive);
	};

	const { columns } = CirculoColumns({
		isAuthenticated,
		hideMatricula,
		hideActive,
		editCirculo,
		confirmDelete,
	});

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
								<YearMenu onSelectYear={setSelectedYear} />

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
				<CirculoForm circulo={selectedCirculo} showAttendance={showAttendance} />
				<ProyeccionTable />
				<HistoricTable year={selectedYear} />
			
			</div>
		</section>
	);
};

export default CirculosList;
