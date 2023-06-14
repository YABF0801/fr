import { useEffect, useState } from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import SmallSpinner from '../../../../common/Spinners/smallSpinner';
import { useCirculoContext } from '../context/CirculoContext';
import { pastCirculosSetArray } from '../service/circulo.services';
<Tooltip
	id='tooltip'
	effect='solid'
	className='diff-arrow'
/>;

const YearMenu = ({ onSelectYear }) => {
	const { queryPastCirculos } = useCirculoContext();
	const pastCirculos = queryPastCirculos.data ? queryPastCirculos.data : [];
	const [years, setYears] = useState([]);

	useEffect(() => {
		const fetchYears = () => {
			try {
				const years = pastCirculos.map((pastCirculos) => pastCirculos.year);
				setYears(years);
			} catch (error) {
				console.error(error);
			}
		};
		fetchYears();
	}, [pastCirculos]);

	const handleYearSelection = async (year) => {
		onSelectYear(year);
		document.getElementById('table').style.display = 'none';
		document.getElementById('circulo').style.display = 'none';
		document.getElementById('historic').style.display = 'block';
		return function cleanUp() {};
	};

	return (
		<DropdownButton title='Histórico' id='year-historic' data-tooltip-id='tooltip'
		data-tooltip-content='Datos de años anteriores'>
			{years.length > 0 ? (
				years.map((year) => (
					<a
						href='#historic'
						type='button'
						key={year}
						className='btn mx-1 my-1 year-btn'
						onClick={() => handleYearSelection(year)}
						
					>
						{year}
					</a>
				))
			) : (
				<p className='text-center text-secondary'>No hay datos disponibles</p>
			)}
		</DropdownButton>
	);
};

export default YearMenu;

export const HistoricTable = ({ year }) => {
	const [courseArray, setCourseArray] = useState([]);

  useEffect(() => {
    const setArray = async () => {
      try {
        const circulos = await pastCirculosSetArray(year);
        setCourseArray(circulos);
      } catch (error) {
        console.error(error);
      }
    };
    setArray();
  }, [year]); 
     
	const cerrarHistorico = async () => {
		document.getElementById('historic').style.display = 'none';
		document.getElementById('table').style.display = 'none';
		document.getElementById('circulo').style.display = 'none';
		return function cleanUp() {};
	};

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
	];

	return (
		<div id='historic' className=' show-form mt-3 p-2 pb-5'>
			<div className='row'>
				<div className='col-md-2 '></div>
				<div className='col-md-8 '>
					<h2 className='text-center mt-2 p-3'>Histórico de matrículas para el curso {year}</h2>
				</div>
				<div className='col-md-2 mt-4'>
					<a href='#topCirculos' onClickCapture={cerrarHistorico} className='btn btn-sm'>
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
        {!courseArray || courseArray.length === 0 ? (
        <div className='row m-5'>
          <SmallSpinner className='m-4 mx-auto' data={'histórico de matrículas'} color={'#36616c'} />
          </div>
        ) : (
          <DataTable columns={columns} data={courseArray} />
           )}
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
