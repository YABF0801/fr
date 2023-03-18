import { useSubmisionContext } from '../context/SumisionContext';
import { useEffect, useMemo, useState } from 'react';

import DataTable from '../../../../common/DataTableBase/DataTableBase';
import { PROPUESTAS_LIST } from '../../../../core/config/routes/paths';
import { useNavigate } from 'react-router-dom';
import { usePropuestasContext } from '../../Propuestas/context/PopuestasContext';
import SubmisionWizardForm from '../../NewSubmision/components/SubmisionWizard';


const GeneralListTable = () => {
    const navigate = useNavigate();

    const { submisions, deleteSubmision } = useSubmisionContext();
    const { generarPropuestas } = usePropuestasContext
	const [submisionsLocal, setSubmisionsLocal] = useState([]);
	const [search, setSearch] = useState('')
    const [hideSocialCase, setHideSocialCase] = useState(true);
	const [hidePadre, setHidePadre] = useState(true);
    const [hidePhone, setHidePhone] = useState(true);
    const [hideAddress, setHideAddress] = useState(true);
    const [selectedSubmision, setSelectedSubmision] = useState(null);

    useEffect(() => {
		setSubmisionsLocal(submisions);
		return function cleanUp() {};
	}, [submisions]); 

       /* const submisionsList = submisionsLocal.filter(submision => submision.status !== 'propuesta'); */  

	useEffect(() => {
		if (search.trim() === '') {
			setSubmisionsLocal(submisions)}
		return function cleanUp() {};
	}, [search])

    const handleGenerateProps = async () => {
		/* await generarPropuestas.mutate(); */
        navigate(PROPUESTAS_LIST);
        document.getElementById("props").style.display = "block";
     };

	const deleteSubmisionById = async (id) => {
		await deleteSubmision.mutate(id);
	};

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
            item.child.cPopular.toLowerCase().includes(search.toLowerCase()) ||
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

    const editSubmision = async (id) => {
		const submision = submisions.find((item) => item._id === id);
		if (submision) {
          setSelectedSubmision(submision);
		  showForm();
		}
	  };

	  const handleExport = () => {
		alert('export submisions');
	  }

      const handleHideSocialCase = () => {
		setHideSocialCase(!hideSocialCase)
	  }

      const handleHidePhone = () => {
		setHidePhone(!hidePhone)
	  }

      const handleHidePadre = () => {
		setHidePadre(!hidePadre)
	  }
      
      const handleHideAddress = () => {
		setHideAddress(!hideAddress)
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
            omit:hideSocialCase,
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
            name: 'Dirección',	selector: (row) => row.child.childAdress, grow: 4, omit: hideAddress
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
            name: 'Año', selector: (row) => row.child.year_of_life, 
            sortable: true, center: true, width: '5rem'
        },
        {
            name: 'Madre', selector: (row) => row.child.parents[0].parentName + ' ' + row.child.parents[0].parentLastname , 
            sortable: true, grow:2, width: '9rem'
        },
        {
            name: 'Teléfono', selector: (row) => row.child.parents[0].phoneNumber, 
            grow:2, omit: hidePhone, width: '6rem'
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
            name: 'Padre', cell: (row) => (row.child.parents[1] ? row.child.parents[1].parentName + ' ' + row.child.parents[1].parentLastname : ''), 
                sortable: true, grow:2, omit: hidePadre, width: '10rem'
        },
        {
            name: 'C.Popular', selector: (row) => row.child.cPopular, 
            sortable: true, grow:2, width: '8rem'
        },  
		{
			name: ' ',
            cell: (row) => {
                  if (row.status === 'matricula') {
                    return <h4 className='text-success '>Matrícula</h4>} 
                  else if (row.status === 'pendiente') {
                    return <h4 className='text-secondary '>Pendiente</h4>} 
                  else if (row.status === 'baja') {
                    return <h4 className='text-danger '>Baja</h4>} 
                }, 
			sortable: true, center: true, 
		},
		{
			name: '', // action buttons
			cell: (row) => (
				<div className='action d-flex '>
					<a className='btn btn-sm' href='#submision'
                    onClickCapture={() => editSubmision(row._id)}>
						<i className='action-btn bi bi-pencil-square'></i>
					</a>

					<button
						onClick={() => deleteSubmisionById(row._id)}
						className='btn btn-sm'
					><i className='action-btn bi bi-trash-fill'></i>
					</button>

                    <button
						onClick={() => alert('DAR BAJA')}
						className='btn btn-sm'
					><i className="action-btn bi bi-person-dash"></i>
					</button>
				</div>
			),
			allowOverflow: true,
			button: true,
			width: '9rem'
		},
	], 	[hideSocialCase, hideAddress, hidePhone, hidePadre]);

    function showForm() {
		document.getElementById('submision').style.display = "block";
		}


    return (
    <section className='list '>
        <div className='container-main mt-3 p-2 pb-5'>
            <h2 className='text-center mt-2 p-3'>Listado de Planillas</h2>
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

                            
								<div className="gap-3 m-md-2 form-check form-switch form-range d-flex justify-content-end">
								<input    
									type="checkbox" 
									className="form-check-input m-md-1" 
									id='show_matricula'
									onClick={handleHideSocialCase}
									/>
								<label className='custom-control-label ' htmlFor='show_matricula'>Caso Social</label>
                                <input    
									type="checkbox" 
									className="form-check-input m-md-1" 
									id='show_matricula'
									onClick={handleHidePhone}
									/>
								<label className='custom-control-label ' htmlFor='show_matricula'>Teléfono</label>
                                <input    
									type="checkbox" 
									className="form-check-input m-md-1" 
									id='show_matricula'
									onClick={handleHideAddress}
									/>
								<label className='custom-control-label ' htmlFor='show_matricula'>Dirección</label>
                                <input    
									type="checkbox" 
									className="form-check-input m-md-1" 
									id='show_matricula'
									onClick={handleHidePadre}
									/>
								<label className='custom-control-label ' htmlFor='show_matricula'>Padre</label>
                                
								</div>

                            <div className="gap-3 form-check form-switch form-check-inline d-flex justify-content-between">

                            <a 
                                href='#submision'
                                onClickCapture={showForm}
 								className='btn customize-btn'>
								<i className='bi bi-plus-lg'></i>
							</a>

                            <button
                                type='excel'
                                onClick={handleExport}
                                className='btn export-btn'>
                                Exportar
                            </button>

                            <button
                                type='button'
                                onClick={handleGenerateProps}
                                className='btn prop-btn'>
                                Generar propuestas
                            </button>

                            
                            </div>

                            </div>

                        <DataTable
                            columns={columns}
                            data={submisionsLocal}
                            autoWidth={true}
                            
                        />

<div className='text-secondary d-flex justify-conten-evenly gap-3'>
							<h4>Leyenda: </h4>
							<h6>OM: Otorgamiento masivo |</h6>  
							<h6>OS: Otorgamiento sistemático | </h6>
							<h6>CS: Caso social  </h6></div>
                </div>
            </div>
            <SubmisionWizardForm submision={selectedSubmision} />
        </div>
      
    </section>
);
};

export default GeneralListTable;