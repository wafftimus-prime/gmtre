export enum ModuleNames {

    CommunityCoreModule = "@gmtre-datagrid/core",

    // community modules
    InfiniteRowModelModule = "@gmtre-datagrid/infinite-row-model",
    ClientSideRowModelModule = "@gmtre-datagrid/client-side-row-model",
    CsvExportModule = "@gmtre-datagrid/csv-export",

    // enterprise core - users don't need to import on this, but other enterprise modules do
    EnterpriseCoreModule = "@gmtre-datagrid/core",

    // enterprise modules
    RowGroupingModule = "@gmtre-datagrid/row-grouping",
    ColumnsToolPanelModule = "@gmtre-datagrid/column-tool-panel",
    FiltersToolPanelModule = "@gmtre-datagrid/filter-tool-panel",
    MenuModule = "@gmtre-datagrid/menu",
    SetFilterModule = "@gmtre-datagrid/set-filter",
    MultiFilterModule = "@gmtre-datagrid/multi-filter",
    StatusBarModule = "@gmtre-datagrid/status-bar",
    SideBarModule = "@gmtre-datagrid/side-bar",
    RangeSelectionModule = "@gmtre-datagrid/range-selection",
    MasterDetailModule = "@gmtre-datagrid/master-detail",
    RichSelectModule = "@gmtre-datagrid/rich-select",
    GridChartsModule = "@gmtre-datagrid/charts",
    ViewportRowModelModule = "@gmtre-datagrid/viewport-row-model",
    ServerSideRowModelModule = "@gmtre-datagrid/server-side-row-model",
    ExcelExportModule = "@gmtre-datagrid/excel-export",
    ClipboardModule = "@gmtre-datagrid/clipboard",
    SparklinesModule = "@gmtre-datagrid/sparklines",
    AdvancedFilterModule = "@gmtre-datagrid/advanced-filter",

    // framework wrappers currently don't provide beans, comps etc, so no need to be modules,
    // however i argue they should be as in theory they 'could' provide beans etc
    AngularModule = "@gmtre-datagrid/angular",
    // ReactModule = "@gmtre-datagrid/react",
    // VueModule = "@gmtre-datagrid/vue",

    // and then this, which is definitely not a grid module, as it should not have any dependency
    // on the grid (ie shouldn't even reference the Module interface)
    // ChartsModule = "@gmtre-datagrid/charts-core",
}
