import { useSubmisionContext } from '../../GeneralList/context/SumisionContext';
import { usePropuestasContext } from '../../Propuestas/context/PopuestasContext'; 

import { useEffect, useMemo, useState } from 'react';
import { GENERAL_LIST } from '../../../../core/config/routes/paths';

import DataTable from '../../../../common/DataTableBase/DataTableBase';
import { useNavigate } from 'react-router-dom'; 


const PropuestasListTable = () => {
    const navigate = useNavigate();

    const { submisions } = useSubmisionContext();
	const [submisionsLocal, setSubmisionsLocal] = useState([]);
    const {aceptarPropuestas, rechazarPropuestas} = usePropuestasContext();

	const [search, setSearch] = useState('')

    useEffect(() => {
          setSubmisionsLocal(submisions);
		return function cleanUp() {};
	}, []); 

    const submisionsProps = submisionsLocal.filter(submision => submision.status === 'propuesta'); 

	useEffect(() => {
		if (search.trim() === '') {
			setSubmisionsLocal(submisions)}
		return function cleanUp() {};
	}, [search])

	const handleSearch = (event) => {
        const hasWorkName = item => item.workName !== undefined && item.workName !== '';
        const hasParentName = item => item.parentName !== undefined && item.parentName !== '';
        const hasParentLastname = item => item.parentLastname !== undefined && item.parentLastname !== '';
        const hasPhone = item => item.phoneNumber !== undefined;
        setSearch(event.target.value);
        const elements = submisionsLocal.filter((item) => { 
          if (
            item.child.childAdress.toLowerCase().includes(search.toLowerCase()) ||
            item.child.childName.toLowerCase().includes(search.toLowerCase()) ||
            String(item.child.carnet).includes(search) ||
            (item.child.parents.every(hasWorkName) && item.child.parents.some(parent => parent.workName.toLowerCase().includes(search.toLowerCase()))) ||
            (item.child.parents.every(hasParentName) && item.child.parents.some(parent => parent.parentName.toLowerCase().includes(search.toLowerCase()))) ||
            (item.child.parents.every(hasParentLastname) && item.child.parents.some(parent => parent.parentLastname.toLowerCase().includes(search.toLowerCase()))) ||
            (item.child.parents.every(hasPhone) && item.child.parents.some(parent => String(parent.phoneNumber).includes(search)))
          ) {
            return item;
          }
          return undefined;
        });
        setSubmisionsLocal(elements);
      };

	const handleAceptar = async (id) => {
        try {
        /* await aceptarPropuestas.mutate(id); */
        navigate(GENERAL_LIST);
    } catch (error) {
        console.error(error);
      }
	};
  
	  const handleExport = () => {
		alert('export submisions');
	  }

         
      const columns = useMemo(
		() => [
		{
		name: 'No.', id:1, selector: (row) => row.entryNumber, 
        sortable: true, center: true, width: '4.5rem'
		},
        {
            name: ' ',
			cell: (row) => (row.finality === 'om' ? <h4 className='text-info' >OM</h4> : <h4 className='text-warning'>OS</h4>),
			sortable: true, center: true, width: '3.5rem'
        },
        {
			name: 'CS',
			selector: row => row.socialCase,
			cell: row => row.socialCase ? <i className="fs-5 listcheck bi bi-check-lg"></i> :'',
			sortable: true,
			center:true,
            width: '4rem'
		},
		{
		name: 'Nombre',	selector: (row) => <h4 className='fw-bold'>{row.child.childName} {row.child.childLastname}</h4>, 
        sortable: true, grow: 2, width: '12rem'
		},
		{
        name: 'Carnet',	selector: (row) => row.child.carnet, 
        sortable: true, center: true, width: '7rem'
        },
        {
        name: 'Direcci??n',	selector: (row) => row.child.childAdress, grow: 4, 
        },
        {
            name: 'Sexo', cell: (row) => { 
            if (row.child.sex === 'masculino') {
                return <h4 className='text-info '>M</h4>} 
            if (row.child.sex === 'femenino') {
                return <h4 className='text-danger '>F</h4>} 
            },
             
            sortable: true, center: true, width: '6rem'
        },
        {
            name: 'Edad', selector: (row) => row.child.age, 
            sortable: true, center: true, width: '5rem'
        },
        {
            name: 'A??o', selector: (row) => row.child.year_of_life, 
            sortable: true, center: true, width: '5rem'
        },
        {
            name: 'Madre', selector: (row) => row.child.parents[0].parentName + ' ' + row.child.parents[0].parentLastname , 
            sortable: true, grow:2, width: '9rem'
        },
        {
            name: 'Tel??fono', selector: (row) => row.child.parents[0].phoneNumber, 
            grow:2, width: '6rem'
        },
        {
            name: 'Centro de Trabajo', 
            cell: (row) => {
                if (row.child.parents[0].workName) {
                  return row.child.parents[0].workName} 
                else if (!row.child.parents[0].workName && row.child.parents[0].occupation === 'jubilado') {
                  return <p>Jubilado</p>} 
                else if (!row.child.parents[0].workName && row.child.parents[0].occupation === 'asistenciado') {
                  return <p className='text-secondary'>Asistenciado</p>} 
              }, 
            sortable: true, grow:2, width: '9rem'
        },
		{
			name: ' ',
            cell: (row) => {
                  if (row.status === 'matricula') {
                    return <h4 className='text-success '>Matr??cula</h4>} 
                  else if (row.status === 'pendiente') {
                    return <h4 className='text-secondary '>Pendiente</h4>} 
                  else if (row.status === 'baja') {
                    return <h4 className='text-danger '>Baja</h4>} 
                  else if (row.status === 'propuesta') {
                    return <h4 className='text-info '>Propuesta</h4>} 
                }, 
			sortable: true, center: true, 
		},
		{
			name: 'Aceptar', // action buttons
			cell: (row) => (
				<div className='action d-flex '>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={row.status}             
                    />
				</div>
			),
			allowOverflow: true,
			button: true,
			width: '9rem'
		},
	], 	[]);

    return (
    <section className='prop-list'>
        <div className='container-main mt-3 p-2 pb-5'>
            <h2 className='text-center mt-2 p-3'>Propuestas de matr??cula</h2>
            <div className='card '>
                <div className='card-body '>
                        
                    <div className='pb-3 mb-4 gap-3 d-flex justify-content-between '>
                            
                                    <div className="searchbar">
									<input 
									className="search_input " 
									id='search'
									placeholder="B??squeda..."
									value={search} 
									onChange={handleSearch}
									/>
									<a className="search_icon"><i className="bi bi-search"></i></a>
									</div> 

                            
					<div className="gap-3 form-check form-switch form-check-inline d-flex justify-content-between">

                            <button
                                type='excel'
                                onClick={handleExport}
                                className='btn export-btn'>
                                Exportar
                            </button>

                            <a 
                                onClick={ handleAceptar }
								className='btn prop-btn'>
								Aceptar propuestas
							</a>

                            </div>

                            </div>

                        <DataTable
                            columns={columns}
                            data={submisionsProps}
                            selectableRows
                            autoWidth={true}
                            
                        />

<div className='text-secondary d-flex justify-conten-evenly gap-3'>
							<h4>Leyenda: </h4>
							<h6>OM: Otorgamiento masivo |</h6>  
							<h6>OS: Otorgamiento sistem??tico | </h6>
							<h6>CS: Caso social  </h6></div>
                </div>
            </div>
        </div>
    </section>
);
};

export default PropuestasListTable;