
const useGeneralListColumns = ({
	isAuthenticated,
	hideSocialCase,
	hideAddress,
	hidePhone,
	hidePadre,
	editSubmision,
	confirmDelete,
	confirmBaja }) => {

	const columns = [
		{
			name: 'No.',
			id: 1,
			selector: (row) => row.entryNumber + ' / ' + new Date(row.createdAt).getFullYear(),
			sortable: true,
			center: true,
			width: '6rem',
		},
		{
			name: ' ',
			cell: (row) =>
				row.finality === 'om' ? <h4 className='text-info'>OM</h4> : <h4 className='text-warning'>OS</h4>,
			sortable: true,
			center: true,
			width: '3.5rem',
		},
		{
			name: 'CS',
			selector: (row) => row.socialCase,
			cell: (row) => (row.socialCase ? <i className='fs-5 listcheck bi bi-check-lg'></i> : ''),
			sortable: true,
			center: true,
			omit: hideSocialCase,
			width: '4rem',
		},
		{
			name: 'Nombre',
			selector: (row) => (
				<h4 className='fw-bold'>
					{ row.child.childName } { row.child.childLastname }
				</h4>
			),
			sortable: true,
			grow: 2,
			width: '12rem',
		},
		{
			name: 'Carnet',
			selector: (row) => row.child.carnet,
			sortable: true,
			center: true,
			width: 'auto',
		},
		{
			name: 'Dirección',
			selector: (row) => row.child.childAddress,
			grow: 2,
			omit: hideAddress,
		},
		{
			name: 'Sexo',
			cell: (row) => {
				if (row.child.sex === 'masculino') {
					return <h4 className='text-info '>M</h4>;
				}
				if (row.child.sex === 'femenino') {
					return <h4 className='text-danger '>F</h4>;
				}
			},

			sortable: true,
			center: true,
			width: '5rem',
		},
		{
			name: 'Edad',
			cell: (row) => {
				if (row.child.age < 1) {
					return row.child.age / 0.01 + 'm';
				}
				return row.child.age;
			},
			sortable: true,
			center: true,
			width: '5rem',
		},
		{
			name: 'Año',
			selector: (row) => row.child.year_of_life,
			sortable: true,
			center: true,
			width: '5rem',
		},
		{
			name: 'Madre',
			selector: (row) => row.child.parents[0].parentName + ' ' + row.child.parents[0].parentLastname,
			sortable: true,
			grow: 2,
			width: '12rem',
		},
		{
			name: 'Teléfono',
			selector: (row) => row.child.parents[0].phoneNumber,
			grow: 2,
			omit: hidePhone,
			width: 'auto',
		},
		{
			name: 'Centro de Trabajo',
			cell: (row) => {
				if (row.child.parents[0].workName) {
					return row.child.parents[0].workName;
				} else if (!row.child.parents[0].workName && row.child.parents[0].occupation === 'jubilado') {
					return <p>Jubilado</p>;
				} else if (!row.child.parents[0].workName && row.child.parents[0].occupation === 'asistenciado') {
					return <p className='text-secondary'>Asistenciado</p>;
				}
			},
			sortable: true,
			grow: 2,
			width: 'auto',
		},
		{
			name: 'Padre',
			cell: (row) =>
				row.child.parents[1]
					? row.child.parents[1].parentName + ' ' + row.child.parents[1].parentLastname
					: '',
			sortable: true,
			grow: 2,
			omit: hidePadre,
			width: '12rem',
		},
		{
			name: 'Centro de trabajo',
			cell: (row) =>
				row.child.parents[1]
					? row.child.parents[1].workName
					: '',
			sortable: true,
			grow: 2,
			omit: hidePadre,
			width: 'auto',
		},
		{
			name: 'Teléfono 2',
			cell: (row) =>
				row.child.parents[1]
					? row.child.parents[1].phoneNumber
					: '',
			sortable: true,
			grow: 2,
			omit: hidePhone,
			width: 'auto',
		},
		{
			name: 'C.Popular',
			selector: (row) => row.child.cPopular,
			sortable: true,
			grow: 2,
			width: 'auto',
		},
		{
			name: 'Estado',
			cell: (row) => {
				if (row.status === 'matricula') {
					return <h4 className='text-success text-matricula'>Matrícula</h4>;
				} else if (row.status === 'pendiente') {
					return <h4 className='text-secondary text-pendiente'>Pendiente</h4>;
				} else if (row.status === 'baja') {
					return <h4 className='text-danger text-baja'>Baja</h4>;
				}
			},
			sortable: true,
			center: true,
			width: '8rem',
		},
		{
			name: 'Ciculo',
			cell: (row) => {
				if (row.child.circulo) {
					return row.child.circulo.name;
				} else {
					return '';
				}
			},
			sortable: true,
			grow: 2,
			width: 'auto',
			center: true,
		},
		
		isAuthenticated.user?.role === 'admin' && {
			name: '', // action buttons
			cell: (row) => (
				<div className='d-flex gap-1 justify-content-center'>
					<a className='btn btn-sm' href='#submision' onClickCapture={ () => editSubmision(row._id) }>
						<i className='action-btn bi bi-pencil-square'></i>
					</a>

					<button onClick={ () => confirmDelete(row) } className='btn btn-sm'>
						<i className='action-btn bi bi-trash-fill'></i>
					</button>

					<button onClick={ () => confirmBaja(row) } className='btn btn-sm'>
						<i className='action-btn bi bi-person-dash'></i>
					</button>
				</div>
			),

			allowOverflow: true,
			button: true,
			width: '9rem',
		},
	]

	return { columns }

};

export default useGeneralListColumns
