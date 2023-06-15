import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { renderCheckboxGroup } from '../../../../common/uiForms/CheckboxGroup';
// import { DateRangePicker } from "@tremor/react";

export function FiltersRow() {
	const filterOptions = ['matrículas', 'bajas', 'pendientes', 'niños', 'niñas'];

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
					placeholderText='Seleccione fecha '
					selectsRange
				/>
			</div>
		);
	};


return (
<div id='filters'>
	<div className='gap-3 pb-3 mb-4 justify-content-end d-flex'>
        <DateRangePicker />
{/* <DateRangePicker className="max-w-sm mx-auto" /> */}
		
        {renderCheckboxGroup(filterOptions, 'filter-options')}
	</div>
      </div>
  );
};

