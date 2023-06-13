import { useEffect, useState } from 'react';
import { DropdownButton } from 'react-bootstrap';
import { useCirculoContext } from '../context/CirculoContext';
// import DataTable from '../../../../common/DataTableBase/DataTableBase';

const YearMenu = () => {
    const { queryPastCirculos } = useCirculoContext();
    const pastCirculos = queryPastCirculos.data ? queryPastCirculos.data : [];
    const [years, setYears] = useState([]);
    const [courseArray, setCourseArray] = useState([]);

    useEffect(() => {
        const fetchYears = async () => {
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
        alert(`Año seleccionado: ${year}`);
        console.log(courseArray);


        const selectedCourse = pastCirculos.find((pastCirculos) => pastCirculos.year === year);
        if (selectedCourse) {
          setCourseArray(selectedCourse.circulos);
        //   showTable();
        } else {
         alert(`No hay datos disponibles para el año: ${year}`);
        }
	};

    // function showTable() {
    //     document.getElementById('historic-table').style.display = 'block';
    //     document.getElementById("table").style.display = "none";
	// }

    return (
        <DropdownButton title="Histórico" id="year-historic">
          {years.length > 0 ? (
        years.map((year) => (
          <button
            type="button"
            key={year}
            className="btn mx-1 my-1 year-btn"
            onClick={() => handleYearSelection(year)}
          >
            {year}
          </button>
        ))
      ) : (
        <p className='text-center text-secondary'>No hay datos disponibles</p>
      )}
        </DropdownButton>
      );
    };
    
        export default YearMenu;

        
// export const HistoricTable = ({ year, courseArray }) => {
	
// 	const cerrarHistorico = async () => {
// 		document.getElementById('historic-table').style.display = 'none';
// 		document.getElementById("table").style.display = "none";
// 		return function cleanUp() {};
// 	};

//     const columns = useMemo(
// 		() => [
// 			{
// 				name: 'Numero',
// 				id: 1,
// 				selector: (row) => row.number,
// 				sortable: true,
// 				center: true,
// 				width: '8rem',
// 			},

// 			{
// 				name: 'Nombre',
// 				selector: (row) => <h4 className='fw-bold'>{row.name}</h4>,
// 				sortable: true,
// 				center: true,
// 				grow: 2,
// 			},
// 			{
// 				name: 'C 2',
// 				selector: (row) => row.normed_capacity2,
// 				sortable: true,
// 				center: true,
// 			},
// 			{
// 				name: 'M',
// 				selector: (row) => <h4 className='text-info'>{row.matricula2}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'H',
// 				selector: (row) => <h4 className='text-success'>{row.girls2}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'V',
// 				selector: (row) => <h4 className='text-success'>{row.matricula2 - row.girls2}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},

// 			{
// 				name: 'C 3',
// 				selector: (row) => row.normed_capacity3,
// 				sortable: true,
// 				center: true,
// 			},
// 			{
// 				name: 'M',
// 				selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'H',
// 				selector: (row) => <h4 className='text-success'>{row.girls3}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'V',
// 				selector: (row) => <h4 className='text-success'>{row.matricula3 - row.girls3}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},

// 			{
// 				name: 'C 4',
// 				selector: (row) => row.normed_capacity4,
// 				sortable: true,
// 				center: true,
// 			},
// 			{
// 				name: 'M',
// 				selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'H',
// 				selector: (row) => <h4 className='text-success'>{row.girls4}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'V',
// 				selector: (row) => <h4 className='text-success'>{row.matricula4 - row.girls4}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},

// 			{
// 				name: 'C 5',
// 				selector: (row) => row.normed_capacity5,
// 				sortable: true,
// 				center: true,
// 			},
// 			{
// 				name: 'M',
// 				selector: (row) => <h4 className='text-info'>{row.matricula5}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'H',
// 				selector: (row) => <h4 className='text-success'>{row.girls5}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'V',
// 				selector: (row) => <h4 className='text-success'>{row.matricula5 - row.girls5}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},

// 			{
// 				name: 'C 6',
// 				selector: (row) => row.normed_capacity6,
// 				sortable: true,
// 				center: true,
// 			},
// 			{
// 				name: 'M',
// 				selector: (row) => <h4 className='text-info'>{row.matricula6}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'H',
// 				selector: (row) => <h4 className='text-success'>{row.girls6}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 			{
// 				name: 'V',
// 				selector: (row) => <h4 className='text-success'>{row.matricula6 - row.girls6}</h4>,
// 				center: true,
// 				width: '5rem',
// 			},
// 		],
// 		[]
// 	);

// 	return (      
// 		<div
// 			id='historic-table'
// 			className=' show-form mt-3 p-2 pb-5'
// 		>
// 			<div className='row'><div className='col-md-2 '></div>
// 				<div className='col-md-8 '>
// 				<h2 className='text-center mt-2 p-3'>Histórico de matrículas para el curso {selectedYear}</h2>
// 					</div>
// 					<div className='col-md-2 mt-4'>

// 					<a
// 					href='#topCirculos'
// 					onClickCapture={cerrarHistorico}
// 					className='btn btn-sm'>
// 					<i
// 						className='action-btn bi  bi-x-lg'
// 						data-tooltip-id='tooltip'
// 						data-tooltip-content='Cerrar'
// 					></i>
// 					</a>

// 					</div>
// 					</div>


// 			<div className='card '>
// 				<div className='card-body '>
// 					<DataTable
// 						columns={columns}
// 						data={courseArray}
// 					/>

// 					<div className='text-secondary d-flex justify-conten-evenly gap-3'>
// 						<h4>Leyenda: </h4>
// 						<h6>C: Capacidad total por año |</h6>
// 						<h6>M: Matrícula por año | </h6>
// 						<h6>H: Cantidad de niñas por año | </h6>
// 						<h6>V: Cantidad de niños por año </h6>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
        
// 	);

// };
