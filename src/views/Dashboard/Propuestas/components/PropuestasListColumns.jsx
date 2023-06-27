
const PropuestasListColumns = ({seeSubmision, hideData}) => {

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
					name: 'Tipo',
					selector: (row) => row.submisiontype,
					sortable: true,
					center: true,
					width: '4.5rem',
					omit: hideData,
				},
				{
					name: 'CS',
					selector: (row) => row.socialCase,
					cell: (row) => (row.socialCase ? <i className='fs-5 listcheck bi bi-check-lg'></i> : ''),
					sortable: true,
					center: true,
					width: '4rem',
					omit: hideData,
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
					name: 'Ci solicitado',
					cell: (row) =>
					row.ciPedido
						? row.ciPedido
						: '',
					sortable: true,
					center: true,
					width: '10rem',
					omit: hideData,
				},
				{
					name: 'Dirección',
					selector: (row) => row.child.childAddress,
					grow: 2,
				},
				{
					name: 'Consejo P',
					selector: (row) => row.child.cPopular,
					grow: 2,
				},
				{
					name: 'Madre',
					selector: (row) => row.child.parents[0].parentName + ' ' + row.child.parents[0].parentLastname,
					sortable: true,
					grow: 2,
					width: '9rem',
				},
				{
					name: 'Otros niños',
					cell: (row) =>
						row.child.parents[0].numberOfOtherChildrenInCi
							? row.child.parents[0].numberOfOtherChildrenInCi
							: '',
					grow: 2,
					center: true,
					width: '6.5rem',
					omit: hideData,
				},

				{
				name: 'Centro',
				cell: (row) =>
					row.child.parents[0].otherChildrenCenter
						? row.child.parents[0].otherChildrenCenter
						: '',
				grow: 2,
				width: '6.5rem',
				center: true,
				omit: hideData,
				},

				{
					name: 'Embarazada',
					cell: (row) =>
						row.child.parents[0].pregnant
							? 'Embarazada'
							: '',
					grow: 2,
					width: '6.5rem',
					center: true,
					omit: hideData,
					},

					{
						name: 'Hipoacúsica',
						cell: (row) =>
							row.child.parents[0].deaf
								? 'Hipoacúsica'
								: '',
						grow: 2,
						width: '6.5rem',
						center: true,
						omit: hideData,
						},


				{
					name: 'Ocupación',
					selector: (row) => row.child.parents[0].occupation,
					grow: 2,
					width: '6.5rem',
					center: true,
					omit: hideData,
				},
				{
					name: 'Centro de Trabajo',
					cell: (row) => {
						if (row.child.parents[0].workName) {
							return row.child.parents[0].workName;
						} else if (!row.child.parents[0].workName && row.child.parents[0].occupation === 'jubilado') {
							return <p className="text-secondary">Jubilado</p>;
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
					name: 'Organismo',
					cell: (row) =>
						row.child.parents[0].organismo
							? row.child.parents[0].organismo.name
							: '',
					grow: 2,
					width: '6.5rem',
				},

			{
					name: 'Cargo',
					cell: (row) =>
						row.child.parents[0]
							? row.child.parents[0].jobTitle
							: '',
					grow: 2,
					width: '7rem',
					omit: hideData,
				},
				{
					name: 'Teléfono',
					selector: (row) => row.child.parents[0].phoneNumber,
					grow: 2,
					width: '6rem',
					omit: hideData,
				},
				{
					name: 'Padre',
					cell: (row) =>
						row.child.parents[1]
							? row.child.parents[1].parentName + ' ' + row.child.parents[1].parentLastname
							: '',
					sortable: true,
					grow: 2,
					width: '12rem',
					omit: hideData,
				},
				{
					name: 'Ocupación',
					cell: (row) =>
						row.child.parents[1]
							? row.child.parents[1].occupation
							: '',
					grow: 2,
					width: '6.5rem',
					center: true,
					omit: hideData,
				},
				{
					name: 'Centro de trabajo',
					cell: (row) =>
						row.child.parents[1]
							? row.child.parents[1].workName
							: '',
					sortable: true,
					grow: 2,
					width: '10rem',
					omit: hideData,
				},
				{
					name: 'Cargo',
					cell: (row) =>
						row.child.parents[1]
							? row.child.parents[1].jobTitle
							: '',
					grow: 2,
					width: '6.5rem',
					omit: hideData,
				},
				{
					name: 'Teléfono 2',
					cell: (row) =>
						row.child.parents[1]
							? row.child.parents[1].phoneNumber
							: '',
					sortable: true,
					grow: 2,
					width: 'auto',
					omit: hideData,
				},
				{
					name: ' ',
					cell: (row) => {
						if (row.status === 'propuesta') {
							return <h4 className='text-info text-propuesta'>Propuesta</h4>;
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
					width: '8rem',
					center: true,
				},
				{name: '', // action buttons
					cell: (row) => (
						<div className='d-flex justify-content-center'>
							<a className='btn btn-sm' href='#submision' onClickCapture={ () => seeSubmision(row._id) }>
								<i className='action-btn bi bi-eye-fill'></i>
							</a> 
						</div>
					),

					allowOverflow: true,
					button: true,
					width: '3rem',
				},
			];
		
return {columns}

};

export default PropuestasListColumns
