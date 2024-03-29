import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import ModalBase from '../../../../common/Modal/Modal';
import Progress from '../../../../common/Progress/ProgressBar';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useAuthContext } from '../../../../core/context/authContext';
import { useOtorgamientoContext } from '../../../../core/context/OtorgamientoContext';
import { usePropuestasContext } from '../../../../core/context/PopuestasContext';
import { exportExcel } from '../../../../utils/Export';
import SubmisionForm from '../../NewSubmision/components/SubmisionWizard';
import PropuestasListColumns from './PropuestasListColumns';

const PropuestasListTable = ({botonAceptar}) => {
	const { queryPropuestas, aceptarPropuestas, rechazarPropuestas } = usePropuestasContext();
	const [search, setSearch] = useState('');
	const [rowsSelected, setRowsSelected] = useState([]);
	const [propuestasLocal, setPropuestasLocal] = useState([]);
	const [searchData, setSearchData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showProgressBar, setShowProgressBar] = useState(false);
	const [selectedSubmision, setSelectedSubmision] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [hideData, setHideData] = useState(true);
	const { isAuthenticated } = useAuthContext();


	useEffect(() => {
		setPropuestasLocal(queryPropuestas.data);
		setSearchData(queryPropuestas.data);
		return function cleanUp() {};
	}, [queryPropuestas.data]);
	
	useEffect(() => {
		if (search.trim() === '') {
			setPropuestasLocal(queryPropuestas.data);
			setSearchData(queryPropuestas.data);
		}
		return function cleanUp() {};
	}, [search]);
	
	const handleExport = () => {
		const dataset = propuestasLocal.map((item) => ({
			No: item.entryNumber + ' / ' + new Date(item.createdAt).getFullYear(),
			Nombre: item.child.childName + item.child.childLastname,
			Sexo: item.child.sex,
			Año_de_vida: item.child.year_of_life,
			Madre: item.child.parents[0].parentName,
			Centro_de_Trabajo: item.child.parents[0].workName || '',
			Dirección: item.child.childAddress,
			Consejo_Popular: item.child.cPopular,
			Caso_Social: item.socialCase ? 'X' : '',
			Circulo: item.child.circulo || '',
		}));

		exportExcel(dataset, 'Propuestas', 'Listado de Propuestas');
		confirmAlert({
			message: `Propuestas exportadas con éxito`,
			buttons: [{ className: 'save-btn', label: 'Aceptar', onClick: () => {} }],
		});
		
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
		setPropuestasLocal(elements);
	};

	const seeSubmision = (id) => {
		const submision = propuestasLocal.find((item) => item._id === id);
		if (submision) {
			setSelectedSubmision(submision);
			handleShowForm();
		}
	};

	const handleShowForm = () => {
		setShowForm(true);
	  };
	
	  const handleHideForm = () => {
		setShowForm(false);
	  };

	const confirmAceptar = () => {
		confirmAlert({
			message: (
				<>
					<div>
						<p>
							Opción 1: Aceptar las propuestas que ha seleccionado y rechazar las que no ha seleccionado
						</p>
					</div>
					<div>
						<p>Opción 2: Aceptar las que ha seleccionado y volver luego a revisar las otras</p>
					</div>
				</>
			),
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},

				{ className: 'acept-btn', label: 'Solo Aceptar', onClick: () => handleAceptar() },

				{ className: 'acept-btn', label: 'Aceptar / Rechazar', onClick: () => handleAceptarRechazar() },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const handleRowSelected = (rows) => {
		setRowsSelected(rows.selectedRows);
	};

	const handleAceptarRechazar = async () => {
		try {
			const allRows = [...propuestasLocal];
			const notSelectedRows = allRows.filter((row) => !rowsSelected.includes(row));
			setIsModalOpen(true);
			setShowProgressBar(true);

			setTimeout(async () => {
				if (rowsSelected.length > 0) {
					await aceptarPropuestas.mutate(rowsSelected);
				}
				await rechazarPropuestas.mutate(notSelectedRows);
				setIsModalOpen(false);
				setShowProgressBar(false);
				// navigate(GENERAL_LIST);
			},500);

		

		} catch (error) {
			console.error(error);
		}
	};

	const handleAceptar = async () => {
		try {
			setIsModalOpen(true); // Mostrar el modal
			setShowProgressBar(true);

			setTimeout(async () => {
			  
			  await aceptarPropuestas.mutate(rowsSelected);
		
			  setShowProgressBar(false);
			  setIsModalOpen(false); // Cerrar el modal después de cierto tiempo
			}, 500);
			
		} catch (error) {
			console.error(error);
		}
	};

	const handleHideData = () => {
		setHideData(!hideData);
	};

	const { columns } = PropuestasListColumns({
		seeSubmision,
		hideData
	});

	return (
		
		<section className='prop-list'>
			<div className='  p-2 pb-5'>
			{/* {isAuthenticated.user?.role === 'admin' && <OmAdministration/>} */}
					<h2 className='text-center p-3'>Propuestas de matrícula</h2>
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
										id='show_social'
										onClick={handleHideData}
									/>
									<label className='custom-control-label ' htmlFor='show_social'>
										Mostrar detalles
									</label>
									
								</div>

							<div className='gap-3 form-check form-switch form-check-inline d-flex justify-content-between'>
								<button type='excel' onClick={handleExport} className='btn export-btn'>
									Exportar
								</button>

								{isAuthenticated.user?.role === 'admin' &&  <button onClick={confirmAceptar} className='btn prop-btn' disabled={!botonAceptar}>
									Aceptar propuestas
								</button>}
							</div>
						</div>

						{queryPropuestas.isLoading ? (
							<div className='row m-5'>
								<SmallSpinner className='m-4 mx-auto' data={'propuestas'} color={'#36616c'} />
							</div>
						) : (
							<DataTable
								columns={columns}
								data={propuestasLocal}
								autoWidth={true}
								selectableRows
								selectableRowsHighlight
								onSelectedRowsChange={handleRowSelected}
							/>
						)}

						<div className='text-secondary d-flex justify-conten-evenly gap-3'>
							<h4>Leyenda: </h4>
							<h6>OM: Otorgamiento masivo |</h6>
							<h6>OS: Otorgamiento sistemático | </h6>
							<h6>CS: Caso social </h6>
						</div>
					</div>
					<ModalBase
						show={isModalOpen}
						onHide={() => setIsModalOpen(false)}
						ModalBody={
							<div>
								{showProgressBar && <Progress id={'progress-bar'} label={'Procesando...'} />}
							</div>
						}
					/>

				{showForm && <SubmisionForm submision={selectedSubmision} onHideForm={handleHideForm} />}
				</div>
			</div>
		</section>
	);
};

export default PropuestasListTable;
