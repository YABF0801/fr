import DataTable from 'react-data-table-component';


function DataTableBase(props) {

  const NoData = () => (
      <div>
        <img src='../../../public/documents.png' alt="noData" style={{width:'250px'}} className='img-nodata'/>
        <h4 className='text-secondary p-4'>No hay datos para mostrar</h4>
      </div>
    );

      
    return (
        <DataTable
            defaultSortFieldId={1}
            highlightOnHover
            responsive
			pagination
            paginationComponentOptions={{
                rowsPerPageText: 'Filas por pagina',
                rangeSeparatorText: 'de',
                selectAllRowsItem: true,
                selectAllRowsItemText: 'Todos',
            }}
            selectableRowsHighlight
            noDataComponent={<NoData />}
            {...props}
            
        />
    );
}

export default DataTableBase;

								
								
								
								