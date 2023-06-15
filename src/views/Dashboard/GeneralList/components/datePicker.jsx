import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import DatePicker from 'react-datepicker';
import { Tooltip } from 'react-tooltip';
import { useOtorgamientoContext } from '../../../../core/context/OtorgamientoContext';
<Tooltip id='tooltip' effect='solid' className='diff-arrow' />;

const DatePickerToOm = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [existingDate, setExistingDate] = useState(null);

	const { queryFechaOm, guardarFecha, resetearFecha } = useOtorgamientoContext();

	useEffect(() => {
		queryFechaOm.data !== null && queryFechaOm.data !== undefined && setExistingDate(queryFechaOm.data);
	}, []);

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
		<div className='d-flex justify-content-end '>
			<div className='form-check form-switch form-check-inline d-flex flex-column align-items-center'>
				{existingDate ? (
					<>
						<p className='text-secondary'>Próximo otorgamiento masivo</p>
						<div className='d-flex d-flex-inline'>
							<h3 >{date}</h3>

							<button onClick={confirmDelete} className='btn btn-sm '>
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
						<div className='d-flex d-flex-inline'>
							<DatePicker
								id='datePicker'
								selected={selectedDate}
								onChange={handleDateChange}
								dateFormat='dd/MM/yyyy'
								className='form-control '
								placeholderText='Nueva Fecha de otorgamimento'
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
		</div>
	);
};

export default DatePickerToOm;
