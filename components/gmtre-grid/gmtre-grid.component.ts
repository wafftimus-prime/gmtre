import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgGridAngular, AgGridModule } from '@gmtre-datagrid/angular';
import { ClientSideRowModelModule } from '@gmtre-datagrid/client-side-row-model';
import { ClipboardModule } from '@gmtre-datagrid/clipboard';
import { ColumnsToolPanelModule } from '@gmtre-datagrid/column-tool-panel';
import { ColDef, GridApi, GridOptions } from '@gmtre-datagrid/core';
import { CsvExportModule } from '@gmtre-datagrid/csv-export';
import { ExcelExportModule } from '@gmtre-datagrid/excel-export';
import { FiltersToolPanelModule } from '@gmtre-datagrid/filter-tool-panel';
import { InfiniteRowModelModule } from '@gmtre-datagrid/infinite-row-model';
import { MasterDetailModule } from '@gmtre-datagrid/master-detail';
import { MenuModule } from '@gmtre-datagrid/menu';
import { MultiFilterModule } from '@gmtre-datagrid/multi-filter';
import { RichSelectModule } from '@gmtre-datagrid/rich-select';
import { RowGroupingModule } from '@gmtre-datagrid/row-grouping';
import { ServerSideRowModelModule } from '@gmtre-datagrid/server-side-row-model';
import { SideBarModule } from '@gmtre-datagrid/side-bar';
import { StatusBarModule } from '@gmtre-datagrid/status-bar';
import { ViewportRowModelModule } from '@gmtre-datagrid/viewport-row-model';
import { BehaviorSubject } from 'rxjs';

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

