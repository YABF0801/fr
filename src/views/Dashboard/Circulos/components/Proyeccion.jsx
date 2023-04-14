import { useMemo, useState, useEffect } from 'react';
/* import { confirmAlert } from 'react-confirm-alert'; */
import { Tooltip } from 'react-tooltip';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import { cursoApiGet, proyeccionApiGet } from '../service/circulo.services';
<Tooltip
	id='tooltip'
	effect='solid'
	className='diff-arrow'
/>;

const Proyeccion = () => {

	const handleProyectar = async () => {
		document.getElementById('table').style.display = 'block';
		document.getElementById("circulo").style.display = "none";
		return function cleanUp() {};
	};

	return (
		<div className='pb-3 mb-4  gap-3 d-flex justify-content-end '>
			<div className='gap-3 form-check form-switch form-check-inline d-flex '>
				<p className='text-secondary'>Proyección del próximo curso</p>

				<a
					href='#table'
					onClickCapture={handleProyectar}
					className='btn btn-sm'
				>
					<i
						className='action-btn bi bi-arrow-bar-right'
						data-tooltip-id='tooltip'
						data-tooltip-content='Ver proyección'
					></i>

				</a>
			</div>
		</div>
	);
};

export default Proyeccion;

// cerrar esto como?

export const ProyeccionTable = () => {
	const [proyeccion, setProyeccion] = useState([]);
	const [circulosProyectados, setCirculosProyectados] = useState([]);
	const [curso, setCurso] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const curso = await cursoApiGet();
			const newProyeccion = await proyeccionApiGet();
			if (newProyeccion) {
				setProyeccion(newProyeccion);
			}
			setCurso(curso +1 )
		};
		fetchData();
	}, []);

	useEffect(() => {
		setCirculosProyectados(proyeccion);
		return function cleanUp() {};
	}, [proyeccion]);

	const columns = useMemo(
		() => [
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
				name: 'M',
				selector: (row) => <h4 className='text-info'>{row.matricula2}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls2}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula2 - row.girls2}</h4>,
				center: true,
				width: '5rem',
			},

			{
				name: 'C 3',
				selector: (row) => row.normed_capacity3,
				sortable: true,
				center: true,
			},
			{
				name: 'M',
				selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls3}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula3 - row.girls3}</h4>,
				center: true,
				width: '5rem',
			},

			{
				name: 'C 4',
				selector: (row) => row.normed_capacity4,
				sortable: true,
				center: true,
			},
			{
				name: 'M',
				selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls4}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula4 - row.girls4}</h4>,
				center: true,
				width: '5rem',
			},

			{
				name: 'C 5',
				selector: (row) => row.normed_capacity5,
				sortable: true,
				center: true,
			},
			{
				name: 'M',
				selector: (row) => <h4 className='text-info'>{row.matricula5}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls5}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula5 - row.girls5}</h4>,
				center: true,
				width: '5rem',
			},

			{
				name: 'C 6',
				selector: (row) => row.normed_capacity6,
				sortable: true,
				center: true,
			},
			{
				name: 'M',
				selector: (row) => <h4 className='text-info'>{row.matricula6}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'H',
				selector: (row) => <h4 className='text-success'>{row.girls6}</h4>,
				center: true,
				width: '5rem',
			},
			{
				name: 'V',
				selector: (row) => <h4 className='text-success'>{row.matricula6 - row.girls6}</h4>,
				center: true,
				width: '5rem',
			},
		],
		[]
	);

	const cerrarProyeccion = async () => {
		document.getElementById('table').style.display = 'none';
		document.getElementById("circulo").style.display = "none";
		return function cleanUp() {};
	};
	return (
		<div
			id='table'
			className='container-main show-form mt-3 p-2 pb-5'
		>
			<div className='row'><div className='col-md-2 '></div>
				<div className='col-md-8 '>
				<h2 className='text-center mt-2 p-3'>Proyección de matrículas para el curso {curso}</h2>
					</div>
					<div className='col-md-2 mt-4'>

					<a
					href='#topCirculos'
					onClickCapture={cerrarProyeccion}
					className='btn btn-sm'>
					<i
						className='action-btn bi  bi-x-lg'
						data-tooltip-id='tooltip'
						data-tooltip-content='Cerrar'
					></i>
					</a>

					</div>
					</div>


			<div className='card '>
				<div className='card-body '>
					<DataTable
						columns={columns}
						data={circulosProyectados}
					/>

					<div className='text-secondary d-flex justify-conten-evenly gap-3'>
						<h4>Leyenda: </h4>
						<h6>C: Capacidad total por año |</h6>
						<h6>M: Matrícula por año | </h6>
						<h6>H: Cantidad de niñas por año | </h6>
						<h6>V: Cantidad de niños por año </h6>
					</div>
				</div>
			</div>
		</div>
	);
};
