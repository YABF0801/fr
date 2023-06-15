
import { renderCheckboxGroup } from "../../../../common/uiForms/CheckboxGroup";

export function FiltersRow() {
	const filterOptions = ['urbano', 'rural', 'activo'];
	return (
		<div id='filters'  >
			<div className='gap-3 justify-content-end d-flex'>

				{renderCheckboxGroup(filterOptions, 'filter-options')}
			</div>
		</div>
	);
}
