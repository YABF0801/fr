import Dropdown from 'react-bootstrap/Dropdown';

function ExportBtn({ handleExport }) {

	return (
		<>
			<Dropdown>
				<Dropdown.Toggle className='btn export-btn' id='dropdown-export' drop='down-centered'>
					Exportar
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item href='#/action-3'>Página actual</Dropdown.Item>
					<Dropdown.Item onClick={handleExport}>Todo</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>						

		</>
	);
}

export default ExportBtn;
