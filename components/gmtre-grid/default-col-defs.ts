import { ColDef, GridOptions } from "../../datagrid/core";

export const DEFAULT_HEADER_CLASS: string[] = ['px-2']
export const DEFAULT_CELL_CLASS: string[] = ['px-2', 'flex', 'items-center', 'text-sm']

export const DEFAULTCOLDEF: ColDef = {
    filter: true,
    headerClass: DEFAULT_HEADER_CLASS,
    cellClass: DEFAULT_CELL_CLASS,
    sortable: true,
    suppressMovable: true,
    enableRowGroup: false,
    suppressColumnsToolPanel: true,
    menuTabs: ['filterMenuTab'],
};


export const DEFAULTGRIDOPTIONS: GridOptions = {
    defaultColDef: DEFAULTCOLDEF,
    pagination: true,
    paginationAutoPageSize: true,
    animateRows: true,
    suppressCellFocus: true,
    suppressRowClickSelection: true,
    rowSelection: 'single',
}
