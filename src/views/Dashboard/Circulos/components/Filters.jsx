
import { renderCheckboxGroup } from "../../../../common/uiForms/CheckboxGroup";

export function FiltersRow() {

	const filterOptions = [
		{ label: 'Urbano', value: 'urbano' },
		{ label: 'Rural', value: 'rural' },
		{ label: 'Activo', value: 'isCiActive' },
	  ];

	return (
		<div id='filters'  >
			<div className='gap-3 justify-content-end d-flex'>

				{renderCheckboxGroup(filterOptions, 'filter-options')}
			</div>
		</div>
	);
}
