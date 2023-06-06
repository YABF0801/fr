
const PropuestasListColumns = () => {

		const columns = [
				{
					name: 'No.',
					id: 1,
					selector: (row) => row.entryNumber,
					sortable: true,
					center: true,
					width: '4.5rem',
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
					width: '4rem',
				},
				{
					name: 'Nombre',
					selector: (row) => (
						<h4 className='fw-bold'>
							{row.child.childName} {row.child.childLastname}
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
					width: '7rem',
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
					width: '6rem',
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
					width: '9rem',
				},
				{
					name: 'Teléfono',
					selector: (row) => row.child.parents[0].phoneNumber,
					grow: 2,
					width: '6rem',
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
					width: '9rem',
					center: true,
				},
				{
					name: ' ',
					cell: (row) => {
						if (row.status === 'propuesta') {
							return <h4 className='text-info '>Propuesta</h4>;
						}
					},
					sortable: true,
					center: true,
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
					width: '8rem',
					center: true,
				},
			];
		
return {columns}

};

export default PropuestasListColumns
