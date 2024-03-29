import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DatePicker from 'react-datepicker';
import { Tooltip } from 'react-tooltip';
import { useOtorgamientoContext } from '../../../../core/context/OtorgamientoContext';
<Tooltip id='tooltip' effect='solid' className='diff-arrow' />;

const DatePickerToOm = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [existingDate, setExistingDate] = useState(null);
	const [delDateIcon, setDelDateIcon] = useState(true)
	const { queryFechaOm, guardarFecha, resetearFecha, queryContadorPropGeneradas } = useOtorgamientoContext();

	useEffect(() => {
		queryFechaOm.data !== null && queryFechaOm.data !== undefined && setExistingDate(queryFechaOm.data);
	}, []);

	useEffect(() => {
		if (queryContadorPropGeneradas.data !== 0) {
			setDelDateIcon(false)
		} else {
			setDelDateIcon(true)
		}
	}, [delDateIcon]);
	

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const handleSave = async () => {
		await guardarFecha.mutate(selectedDate);
		setExistingDate(selectedDate);
	};

	const confirmDelete = () => {
		confirmAlert({
			message: `Está seguro de eliminar la fecha límite para el otorgamiento`,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				{
					className: 'save-btn',
					label: 'Eliminar',
					onClick: () => handleDelete(),
				},
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

	const handleDelete = async () => {
		await resetearFecha.mutate();
		setExistingDate(null);
	};

	const date = existingDate ? new Date(existingDate).toLocaleDateString() : null;

	return (

			<div className='d-flex flex-column align-items-center ms-2 me-2 w-100'>
				{existingDate ? (
					<>
						<p className='text-secondary'>Próximo otorgamiento masivo</p>
						<div className='d-flex d-flex-inline'>
							<h3 >{date}</h3>

							<button onClick={confirmDelete} className='btn del btn-sm ' 
							disabled={!delDateIcon}
							>
								<i
									className='action-btn bi bi-trash-fill '
									data-tooltip-id='tooltip'
									data-tooltip-content='Eliminar fecha'
									
								></i>
							</button>
						</div>
					</>
				) : (
					<>
					<label htmlFor='curso' className='p-2 mb-2 text-secondary align-self-start'>
						Establecer fecha de otorgamiento masivo
					</label>
						<div className='d-flex d-flex-inline w-100'>
						
							<DatePicker
								id='datePicker'
								selected={selectedDate}
								onChange={handleDateChange}
								dateFormat='dd/MM/yyyy'
								className='form-control '
								placeholderText='Nueva Fecha de otorgamimento'
								// minDate={new Date()} 
							/>

							<button id='icon' onClick={() => handleSave()} className='btn btn-sm '>
								<i
									className='action-btn bi bi-check2-square'
									data-tooltip-id='tooltip'
									data-tooltip-content='Guardar fecha'
								></i>
							</button>
						</div>
					</>
				)}
			</div>

	);
};

export default DatePickerToOm;
