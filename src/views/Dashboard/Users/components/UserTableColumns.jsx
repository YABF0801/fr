
const UserColumns = ({ editUser, confirmDelete }) => {

return [
		{
			name: 'Usuario',
			id: 1,
			selector: (row) => <h4 className='fw-bold'>{row.nickname}</h4>,
			sortable: true,
			center: true,
		},
		{
			name: 'Nombre',
			selector: (row) => row.name + ' ' + row.lastname,
			sortable: true,
		},
		{
			name: 'Cargo',
			selector: (row) => row.position,
			sortable: true,
			grow: 2,

		},
		{
			name: 'Solicitudes recibidas',
			selector: (row) => row.submisions,
			sortable: true,
			grow: 2,
			center: true,
		},
		{
			name: '',
			cell: (row) =>
				row.role === 'admin' ? (
					<h4 className='text-active'>Admin</h4>
				) : (
					<p className='text-inactive'>Invitado</p>
				),
			sortable: true,
			center: true,
		},
		{
			name: '', // action buttons
			cell: (row) => (
				<div className='d-flex gap-1 justify-content-center'>
					<a className='btn btn-sm' href='#user' onClickCapture={() => editUser(row._id)}>
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

export default UserColumns;
