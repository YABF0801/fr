// import Dropdown from 'react-bootstrap/Dropdown';

function ExportBtn({ handleExport , exportPage}) {

	return (
		<>
				<button className='btn export-btn' onClick={handleExport}>
					Exportar
				</button>

{/* 
			<Dropdown>
				
				<Dropdown.Menu>
					<Dropdown.Item onClick={exportPage}>Página actual</Dropdown.Item>
					<Dropdown.Item onClick={handleExport}>Todo</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>						 */}

		</>
	);
}

export default ExportBtn;
