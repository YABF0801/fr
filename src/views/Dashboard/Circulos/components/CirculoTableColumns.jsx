
const CirculoColumns = ({ 
    isAuthenticated, 
    hideMatricula, 
    hideActive, 
    editCirculo, 
    confirmDelete }) => {

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
			{
				name: 'C 2',
				selector: (row) => row.normed_capacity2,
				sortable: true,
				center: true,
			},
			{
				name: 'M 2',
				selector: (row) => <h4 className='text-info'>{row.matricula2}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls2}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula2 - row.girls2}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: 'C 3',
				selector: (row) => row.normed_capacity3,
				sortable: true,
				center: true,
			},
			{
				name: 'M 3',
				selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls3}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula3 - row.girls3}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: 'C 4',
				selector: (row) => row.normed_capacity4,
				sortable: true,
				center: true,
			},
			{
				name: 'M 4',
				selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls4}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula4 - row.girls4}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: 'C 5',
				selector: (row) => row.normed_capacity5,
				sortable: true,
				center: true,
			},
			{
				name: 'M 5',
				selector: (row) => <h4 className='text-info'>{row.matricula5}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls5}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula5 - row.girls5}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: 'C 6',
				selector: (row) => row.normed_capacity6,
				sortable: true,
				center: true,
			},
			{
				name: 'M 6',
				selector: (row) => <h4 className='text-info'>{row.matricula6}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls6}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula6 - row.girls6}</h4>,
				center: true,
				omit: hideMatricula,
				width: '5rem',
			},

			{
				name: ' ',
				cell: (row) =>
					row.isCiActive ? (
						<h4 className='text-active'>Activo</h4>
					) : (
						<p className='text-inactive'>Inactivo</p>
					),
				sortable: true,
				omit: hideActive,
			},

			isAuthenticated.user?.role === 'admin' && ({
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
            }),
		];
		
	return {columns};
};

export default CirculoColumns;
