import DataTable from 'react-data-table-component';

function DataTableBase(props) {
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
            noDataComponent='No hay datos para mostrar'
            {...props}
            
        />
    );
}

export default DataTableBase;

								
								
								
								