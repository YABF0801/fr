
import { renderCheckboxGroup } from "../../../../common/uiForms/CheckboxGroup";

export function FiltersRow({ onFilterChange, handleChange }) {

	const filterOptions = [
		{ label: 'Urbano', value: 'urbano' },
		{ label: 'Rural', value: 'rural' },
		// { label: 'Activo', value: 'isCiActive' },
	  ];

	  const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;
		onFilterChange(value, checked);
	};

	return (
		<div id='filters'  >
			<div className='gap-3 m-md-2 d-flex align-items-center justify-content-end'>
 			{/* <div className='form-check form-switch'>
 			<input type='checkbox' className='form-check-input m-md-1' id='show_matricula' onClick={handleChange} />
 			<label className='custom-control-label ' htmlFor='show_matricula'>
 			Coincidencia completa
 			</label>
 			</div> */}

			<div className='gap-3 justify-content-end d-flex'>

			{renderCheckboxGroup(filterOptions, 'filter-options', handleCheckboxChange)}
				</div>
			 </div>
 		</div>
	);
}
