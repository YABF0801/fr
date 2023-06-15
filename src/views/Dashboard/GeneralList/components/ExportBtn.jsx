import Dropdown from 'react-bootstrap/Dropdown';

function ExportBtn({handleExport}) {
  return (
    <Dropdown>
      <Dropdown.Toggle className='btn export-btn' id="dropdown-basic">
        Exportar
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleExport}>Todo</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ExportBtn;