import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from '../../datagrid/angular';
import { ClientSideRowModelModule } from '../../datagrid/client-side-row-model';
import { ClipboardModule } from '../../datagrid/clipboard';
import { ColumnsToolPanelModule } from '../../datagrid/column-tool-panel';
import { ColDef, GridApi, GridOptions } from '../../datagrid/core';
import { CsvExportModule } from '../../datagrid/csv-export';
import { ExcelExportModule } from '../../datagrid/excel-export';
import { FiltersToolPanelModule } from '../../datagrid/filter-tool-panel';
import { InfiniteRowModelModule } from '../../datagrid/infinite-row-model';
import { MasterDetailModule } from '../../datagrid/master-detail';
import { MenuModule } from '../../datagrid/menu';
import { MultiFilterModule } from '../../datagrid/multi-filter';
import { RichSelectModule } from '../../datagrid/rich-select';
import { RowGroupingModule } from '../../datagrid/row-grouping';
import { ServerSideRowModelModule } from '../../datagrid/server-side-row-model';
import { SideBarModule } from '../../datagrid/side-bar';
import { StatusBarModule } from '../../datagrid/status-bar';
import { ViewportRowModelModule } from '../../datagrid/viewport-row-model';
import { BehaviorSubject } from 'rxjs';
import { DEFAULTGRIDOPTIONS } from './default-col-defs';

@Component({
  selector: 'gmtre-grid',
  templateUrl: './gmtre-grid.component.html',
  styleUrls: ['./gmtre-grid.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    AgGridModule,
  ]
})
export class GmtreGridComponent {
  // -----------------------------------------------------------------------------------------------------
  // @ Public Variables
  // -----------------------------------------------------------------------------------------------------
  @ViewChild('AgGrid') AgGrid!: AgGridAngular;
  @Input() class!: string;
  @Input() rowData$!: BehaviorSubject<any[]>;
  @Input() gridOptions: GridOptions = DEFAULTGRIDOPTIONS;

  @Output() gridReady = new EventEmitter()

  GridApi!: GridApi;

  modules = [
    ClientSideRowModelModule,
    MenuModule,
    ColumnsToolPanelModule,
    StatusBarModule,
    InfiniteRowModelModule,
    CsvExportModule,
    ClipboardModule,
    SideBarModule,
    RowGroupingModule,
    ExcelExportModule,
    FiltersToolPanelModule,
    // RangeSelectionModule,
    MultiFilterModule,
    RichSelectModule,
    MasterDetailModule,
    ViewportRowModelModule,
    ServerSideRowModelModule,];

  // -----------------------------------------------------------------------------------------------------
  // @ Private Variables
  // -----------------------------------------------------------------------------------------------------

  /**
   * Constructor
   */
  constructor(
    private _cdr: ChangeDetectorRef,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Value Accessor
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  // GRID API Configuration
  onGridReady(params) {
    this.GridApi = params.api;

    this.gridReady.emit(params)
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

}

