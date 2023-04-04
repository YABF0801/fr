import { usePropuestasContext } from '../context/PopuestasContext';
import { useEffect, useMemo, useState } from 'react';
import { GENERAL_LIST } from '../../../../core/config/routes/paths';
import DataTable from '../../../../common/DataTableBase/DataTableBase';
import { useNavigate } from 'react-router-dom'; 
import { confirmAlert } from 'react-confirm-alert';
import { exportExcel } from '../../../../common/Export';

const PropuestasListTable = () => {
    const navigate = useNavigate();

    const { propuestas } = usePropuestasContext();
	const [propuestasLocal, setPropuestasLocal] = useState([]);
    const {aceptarPropuestas, rechazarPropuestas} = usePropuestasContext();
	const [search, setSearch] = useState('')
    const [cambioDeCurso, setCambioDeCurso] = useState(false);

    const confirmCambioDeCurso = () => {
		confirmAlert({
			message: <><div><p>Va a ejecutar el cambio de curso, esta acción modificará su base de datos </p></div>
                <div><p>Está seguro? </p></div></>,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				
                { className: 'save-btn', label: 'Aceptar', onClick: () => handleCambioDeCurso() },

			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

    const handleCambioDeCurso = () => {
        setCambioDeCurso(true);
        document.getElementById("cambio-btn").disabled = true;
       };

    const handleExport = () => { 
        const dataset = propuestasLocal.map((item) => ({
            No: item.entryNumber + ' / ' + new Date(item.createdAt).getFullYear(),
            Nombre: item.child.childName + item.child.childLastname,
            Sexo: item.child.sex,
            Año_de_vida: item.child.year_of_life,
            Madre: item.child.parents[0].parentName,
            Centro_de_Trabajo: item.child.parents[0].workName || '',
            Dirección: item.child.childAdress,
            Consejo_Popular: item.child.cPopular,
            Caso_Social: item.socialCase ? 'X' : '',
            Circulo: item.child.circulo || ''
            }));

 		exportExcel(dataset, 'Propuestas', 'Listado de Propuestas') 
     confirmAlert({ 
      message: `Propuestas exportadas con éxito`,
      buttons: [{ className: 'save-btn',
        label: 'Aceptar',
        onClick: () => {},
      }]});
    }; 

    useEffect(() => {
		setPropuestasLocal(propuestas);
		return function cleanUp() {};
	}, [propuestas]); 
 

	useEffect(() => {
		if (search.trim() === '') {
			setPropuestasLocal(propuestas)}
		return function cleanUp() {};
	}, [search])

	const handleSearch = (event) => {
        const hasWorkName = item => item.workName !== undefined && item.workName !== '';
        const hasParentName = item => item.parentName !== undefined && item.parentName !== '';
        const hasParentLastname = item => item.parentLastname !== undefined && item.parentLastname !== '';
        const hasPhone = item => item.phoneNumber !== undefined;
        setSearch(event.target.value);
        const elements = propuestasLocal.filter((item) => { 
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
        setPropuestasLocal(elements);
      };

      const confirmAceptar = () => {
		confirmAlert({
			message: <><div><p>Opción 1: Aceptar las propuestas que ha seleccionado y
                rechazar las que no ha seleccionado</p></div>
                <div><p>Opción 2: Aceptar las que ha
                    seleccionado y volver luego a revisar las otras</p></div></>,
			buttons: [
				{
					className: 'cancel-btn ',
					label: 'Cancelar',
					onClick: () => {},
				},
				
                { className: 'acept-btn', label: 'Solo Aceptar', onClick: () => handleAceptar() },

                { className: 'acept-btn', label: 'Aceptar / Rechazar', onClick: () => handleAceptarRechazar() },
			],
			className: 'button-group d-flex justify-content-evenly',
		});
	};

    const handleAceptarRechazar = async (id) => {
        try {
        /* await aceptarPropuestas.mutate(id); */
        /* await rechazarPropuestas.mutate(id); */

        navigate(GENERAL_LIST);
        document.getElementById("props").style.display = "none";

    } catch (error) {
        console.error(error);
      }
	};

	const handleAceptar = async (id) => { // un arreglo
        try {
        /* await aceptarPropuestas.mutate(id); */

        navigate(GENERAL_LIST);
        document.getElementById("props").style.display = "none";
       
    } catch (error) {
        console.error(error);
      }
	};

         
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
            name: 'Sexo', cell: (row) => { 
            if (row.child.sex === 'masculino') {
                return <h4 className='text-info '>M</h4>} 
            if (row.child.sex === 'femenino') {
                return <h4 className='text-danger '>F</h4>} 
            },
             
            sortable: true, center: true, width: '6rem'
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
            name: 'Año', selector: (row) => row.child.year_of_life, 
            sortable: true, center: true, width: '5rem'
        },
        {
            name: 'Madre', selector: (row) => row.child.parents[0].parentName + ' ' + row.child.parents[0].parentLastname , 
            sortable: true, grow:2, width: '9rem'
        },
        {
            name: 'Teléfono', selector: (row) => row.child.parents[0].phoneNumber, 
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
            sortable: true, grow:2, width: '9rem', center: true,
        },
		{
			name: ' ',
            cell: (row) => {
                   if (row.status === 'propuesta') {
                    return <h4 className='text-info '>Propuesta</h4>} 
                }, 
			sortable: true, center: true, 
		},
        {
            name: 'Ciculo', selector: (row) => row.child.circulo.name, 
            sortable: true, grow:2, width: '8rem', center: true,
        }, 
		/* {
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
		}, */
	], 	[]);

    return (
    <section className='prop-list'>
        <div className='container-main mt-3 p-2 pb-5'>
            <h2 className='text-center mt-2 p-3'>Propuestas de matrícula</h2>
            <div className='card '>
                <div className='card-body '>
                        
                    <div className='pb-3 mb-4 gap-3 d-flex justify-content-between '>
                            
                                    <div className="searchbar">
									<input 
									className="search_input " 
									id='search'
									placeholder="Búsqueda..."
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

                            <button 
                                id='cambio-btn'
                                onClick={ confirmCambioDeCurso }
								className='btn prop-btn'
                                >
								Cambio de Curso
							</button>

                            <button 
                                 onClick={confirmAceptar}
								className='btn prop-btn'
                                disabled={!cambioDeCurso}
                             >
								Aceptar propuestas
							</button>

                            </div>

                            </div>

                        <DataTable
                            columns={columns}
                            data={propuestasLocal}
                            selectableRows
                            autoWidth={true}
                            
                        />

<div className='text-secondary d-flex justify-conten-evenly gap-3'>
							<h4>Leyenda: </h4>
							<h6>OM: Otorgamiento masivo |</h6>  
							<h6>OS: Otorgamiento sistemático | </h6>
							<h6>CS: Caso social  </h6></div>
                </div>
            </div>
        </div>
    </section>
);
};

export default PropuestasListTable;