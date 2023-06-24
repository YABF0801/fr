const CirculoColumns = ({
	isAuthenticated,
	hideMatricula,
	hideActive,
	hideAttendance,
	hideCalculatedCapacity,
	editCirculo,
	confirmDelete,
}) => {
	const columns = [
		{
			name: 'Numero',
			id: 1,
			selector: (row) => row.number,
			sortable: true,
			center: true,
			width: '8rem',
		},

		{
			name: 'Nombre',
			selector: (row) => <h4 className='fw-bold'>{row.name}</h4>,
			sortable: true,
			center: true,
			grow: 2,
		},

		...[2, 3, 4, 5, 6].flatMap((index) => [
			{
				name: `C ${index}`,
				selector: (row) => row[`normed_capacity${index}`],
				sortable: true,
				center: true,
			},
			{
				name: `% A ${index}`,
				selector: (row) => row[`attendance${index}`],
				sortable: true,
				center: true,
				omit: hideAttendance,
			},
			{
				name: `Cc ${index}`,
				selector: (row) => row[`attendance${index}`],
				sortable: true,
				center: true,
				omit: hideCalculatedCapacity,
			},
			{
				name: `M ${index}`,
				selector: (row) => <h4 className='text-info'>{row[`matricula${index}`]}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row[`girls${index}`]}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row[`matricula${index}`] - row[`girls${index}`]}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
		]),

		{
			name: 'Tipo',
			cell: (row) =>
				row.circulotype === 'urbano' ? (
					<h4 className='text-active'>Urbano</h4>
				) : (
					<p className='text-inactive'>Rural</p>
				),
			sortable: true,
			omit: hideActive,
			center: true,
		},

		isAuthenticated.user?.role === 'admin' && {
			name: '', // action buttons
			cell: (row) => (
				<div className='d-flex gap-1 justify-content-center'>
					<a className='btn btn-sm' href='#circulo' onClickCapture={() => editCirculo(row._id)}>
						<i className='action-btn bi bi-pencil-square'></i>
					</a>

					<button onClick={() => confirmDelete(row)} className='btn btn-sm'>
						<i className='action-btn bi bi-trash-fill'></i>
					</button>
					{/* 
                <button
                    onClick={() => confirmStatusChange(row)}
                    className='btn btn-sm'
                ><i className="action-btn bi bi-house-dash"></i>
                </button>

                 */}
				</div>
			),

			allowOverflow: true,
			button: true,
			width: '100px',
		},
	];

	return { columns };
};

export default CirculoColumns;
