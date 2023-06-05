
const OrganismoColumns = ({ isAuthenticated, editOrganismo, confirmDelete }) => {
  return [
    {
      name: 'Nombre',
      id: 1,
      selector: (row) => <h4 className='fw-bold'>{row.name}</h4>,
      sortable: true,
      center: true,
    },
    {
      name: 'Descripción',
      selector: (row) => row.description,
      sortable: true,
      grow: 2,
    },
    {
      name: 'Priorizado',
      selector: (row) => row.priorizado,
      cell: (row) => (row.priorizado ? <i className='fs-5 listcheck bi bi-check-lg'></i> : ''),
      sortable: true,
      center: true,
    },
    
    isAuthenticated.user?.role === 'admin' && {
      name: '', // action buttons
      cell: (row) => (
        <div className='d-flex gap-1 justify-content-center'>
          <a className='btn btn-sm' href='#organismo' onClickCapture={() => editOrganismo(row._id)}>
            <i className='action-btn bi bi-pencil-square'></i>
          </a>

          <button onClick={() => confirmDelete(row)} className='btn btn-sm'>
            <i className='action-btn bi bi-trash-fill'></i>
          </button>
        </div>
      ),

      allowOverflow: true,
      button: true,
      width: '100px',
    },
  ];
};

export default OrganismoColumns;
