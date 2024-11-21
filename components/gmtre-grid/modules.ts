
import { ClientSideRowModelModule } from '../../datagrid/client-side-row-model';
import { ClipboardModule } from '../../datagrid/clipboard';
import { ColumnsToolPanelModule } from '../../datagrid/column-tool-panel';
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

export const MODULES = [
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
  ServerSideRowModelModule,
];
