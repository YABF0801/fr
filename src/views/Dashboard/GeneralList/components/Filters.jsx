import DatePicker from 'react-datepicker';
import { renderCheckboxGroup } from '../../../../common/uiForms/CheckboxGroup';
// import { DateRangePicker } from "@tremor/react";

export function FiltersRow({ onFilterChange, handleToogleChange, selectedDate, handleDateChange,handleCancelDate }) {
	const filterOptions = [
		{ label: 'Matrícula', value: 'matricula' },
		{ label: 'Baja', value: 'baja' },
		{ label: 'Pendiente', value: 'pendiente' },
		{ label: 'Caso Social', value: 'socialCase' },
		{ label: 'Niños', value: 'masculino' },
		{ label: 'Niñas', value: 'femenino' },
	];

	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;
		onFilterChange(value, checked);
		console.log('Checkbox value:', value);
	};

	const DateRangePicker = () => {
		return (
			<div className='date-range-picker'>
				<DatePicker
					id='datePicker-export'
					selected={selectedDate}
					onChange={handleDateChange}
					dateFormat='dd/MM/yyyy'
					className='form-control'
					placeholderText='Seleccione fecha de inicio o rango de fechas'
					maxDate={new Date()}
				/>
			</div>
		);
	};

	return (
		<div id='filters' >
			<div className='gap-3 m-md-2 d-flex align-items-center justify-content-end'>
				<div className='form-check form-switch'>
					<input
						type='checkbox'
						className='form-check-input m-md-1'
						id='show_matricula'
						onClick={handleToogleChange}
					/>
					<label className='custom-control-label ' htmlFor='show_matricula'>
						Coincidencia completa
					</label>
				</div>

				<div className='gap-3 justify-content-end d-flex'>
				<div className='date-picker-container d-flex'>
					<DateRangePicker />
				{selectedDate && (
					<a onClick={handleCancelDate} className='btn btn-sm '>
						<i className='action-btn bi bi-x'></i>
					</a>
				)}
				</div>
				{renderCheckboxGroup(filterOptions, 'filter-options', handleCheckboxChange)}
			</div>

			</div>
		</div>
	);
}
