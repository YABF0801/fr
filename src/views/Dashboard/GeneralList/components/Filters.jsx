import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { renderCheckboxGroup } from '../../../../common/uiForms/CheckboxGroup';
// import { DateRangePicker } from "@tremor/react";

export function FiltersRow({ onFilterChange, handleChange }) {
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
		const [startDate, setStartDate] = useState(null);
		const [endDate, setEndDate] = useState(null);

		const handleDateChange = (dates) => {
			const [start, end] = dates;
			setStartDate(start);
			setEndDate(end);
		};

		return (
			<div className='date-range-picker col-3'>
				<DatePicker
					id='datePicker-export'
					selected={startDate}
					onChange={handleDateChange}
					startDate={startDate}
					endDate={endDate}
					dateFormat='dd/MM/yyyy'
					className='form-control'
					placeholderText='Seleccione fecha de inicio o rango de fechas'
					selectsRange
				/>
			</div>
		);
	};

	return (
		<div id='filters'>
			<div className='gap-3 m-md-2 form-check form-switch d-flex justify-content-end'>
			<input type='checkbox' className='form-check-input m-md-1' id='show_matricula' onClick={handleChange} />
			<label className='custom-control-label ' htmlFor='show_matricula'>
			Coincidencia completa
			</label>
			</div>
			

			<div className='gap-3 justify-content-end d-flex'>
				<DateRangePicker />
				{/* <DateRangePicker className="max-w-sm mx-auto" /> */}

				{renderCheckboxGroup(filterOptions, 'filter-options', handleCheckboxChange)}
			</div>
		</div>
	);
}
