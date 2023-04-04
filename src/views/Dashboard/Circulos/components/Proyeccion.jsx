import { useMemo, useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Tooltip } from 'react-tooltip';
import DataTableBase from '../../../../common/DataTableBase/DataTableBase';
import { proyeccionApiGet } from '../service/circulo.services';
<Tooltip id="tooltip" effect='solid' className="diff-arrow" />

const Proyeccion = () => {
  
   const confirmProyectar = () => {
    confirmAlert({
      message: `Haga click en aceptar para mostrar la proyección de matrículas para el próximo curso`,
      buttons: [
        {
          className: 'cancel-btn ',
          label: 'Cancelar',
          onClick: () => { },
        },
        {
          className: 'save-btn',
          label: 'Aceptar',
          onClick: () => handleProyectar(),
        },
      ],
      className: 'button-group d-flex justify-content-evenly'
    });
  };

  const handleProyectar = async () => {
    document.getElementById("table").style.display = "block";
  };

  return (
    <div className='pb-3 mb-4  gap-3 d-flex justify-content-end '>
      <div className='gap-3 form-check form-switch form-check-inline d-flex '>


            <p className='text-secondary'>Proyección del próximo curso</p>

            <a href='#table' onClickCapture={confirmProyectar}
								className='btn btn-sm'>
								<i className='action-btn bi bi-arrow-bar-right' data-tooltip-id="tooltip" data-tooltip-content="Ver proyección"></i>
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

  useEffect(() => {
    const fetchData = async () => {
      const newProyeccion = await proyeccionApiGet();
      if (newProyeccion) {
        setProyeccion(newProyeccion);
      }
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
		name: 'Numero',	id:1, selector: (row) => row.number, sortable: true, center: true, width: '8rem'
		},
		
		{
		name: 'Nombre',	selector: (row) => <h4 className='fw-bold'>{row.name}</h4>, sortable: true, center: true, grow: 2,
		},
		{
		name: 'C 2', selector: (row) => row.normed_capacity2, sortable: true,	center: true, 
		},
		{
			name: 'M', selector: (row) => <h4 className='text-info'>{row.matricula2}</h4>, center: true,  width: '5rem'
		},
		{
			name: 'H', selector: (row) => <h4 className='text-success'>{row.girls2}</h4>, center: true,  width: '5rem'
		},
		{
			name: 'V', selector: (row) => <h4 className='text-success'>{row.matricula2 - row.girls2 }</h4>, center: true,  width: '5rem'
		},
		
		{
		name: 'C 3', selector: (row) => row.normed_capacity3, sortable: true, center: true, 
		},
		{
			name: 'M', selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>, center: true,  width: '5rem'
		},
		{
			name: 'H', selector: (row) => <h4 className='text-success'>{row.girls3}</h4>, center: true,  width: '5rem'
		},
		{
			name: 'V', selector: (row) => <h4 className='text-success'>{row.matricula3 - row.girls3 }</h4>, center: true,  width: '5rem'
		},

		{
		name: 'C 4',selector: (row) => row.normed_capacity4, sortable: true, center: true, 
		},
		{
			name: 'M', selector: (row) => <h4 className='text-info'>{row.matricula3}</h4>, center: true,	 width: '5rem'
		},
		{
			name: 'H', selector: (row) => <h4 className='text-success'>{row.girls4}</h4>, center: true,  width: '5rem'
		},
		{
			name: 'V', selector: (row) => <h4 className='text-success'>{row.matricula4 - row.girls4 }</h4>, center: true,  width: '5rem'
		},

		{
		name: 'C 5', selector: (row) => row.normed_capacity5, sortable: true, center: true, 
		},
		{
			name: 'M', selector: (row) => <h4 className='text-info'>{row.matricula5}</h4>, center: true,	 width: '5rem'
		},
		{
			name: 'H', selector: (row) => <h4 className='text-success'>{row.girls5}</h4>, center: true, width: '5rem'
		},
		{
			name: 'V', selector: (row) => <h4 className='text-success'>{row.matricula5 - row.girls5 }</h4>, center: true, width: '5rem'
		},

		{
		name: 'C 6', selector: (row) => row.normed_capacity6,  sortable: true, center: true, 
		},
		{
			name: 'M', selector: (row) => <h4 className='text-info'>{row.matricula6}</h4>, center: true,	width: '5rem'
		},
		{
			name: 'H', selector: (row) => <h4 className='text-success'>{row.girls6}</h4>, center: true, width: '5rem'
		},
		{
			name: 'V', selector: (row) => <h4 className='text-success'>{row.matricula6 - row.girls6 }</h4>, center: true, width: '5rem'
		},
		
	], 	[ ]);

  return (
  <div id='table' className='container-main show-form mt-3 p-2 pb-5'>
  <h2  className='text-center mt-5 p-3'>Proyección de matrículas para el próximo curso</h2>
    
  <div className='card '>
					<div className='card-body '>

          <DataTableBase
								columns={columns}
								data={circulosProyectados}
							/>

              <div className='text-secondary d-flex justify-conten-evenly gap-3'>
							<h4>Leyenda: </h4>
							<h6>C: Capacidad total por año |</h6>  
							<h6>M: Matrícula por año | </h6>
							<h6>H: Cantidad de niñas por año | </h6>
							<h6>V: Cantidad de niños por año </h6></div>
 </div>
 </div>
 </div>
  )
}