import { Module, ModuleNames } from "@gmtre-datagrid/core";
import { EnterpriseCoreModule } from "@gmtre-datagrid/core";
import { PrimaryColsHeaderPanel } from "./columnToolPanel/primaryColsHeaderPanel";
import { PrimaryColsListPanel } from "./columnToolPanel/primaryColsListPanel";
import { ColumnToolPanel } from "./columnToolPanel/columnToolPanel";
import { PrimaryColsPanel } from "./columnToolPanel/primaryColsPanel";

import { RowGroupingModule } from "@gmtre-datagrid/row-grouping";
import { SideBarModule } from "@gmtre-datagrid/side-bar";
import { ModelItemUtils } from "./columnToolPanel/modelItemUtils";
import { VERSION } from "./version";

export const ColumnsToolPanelModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.ColumnsToolPanelModule,
    beans: [ModelItemUtils],
    agStackComponents: [
        { componentName: 'AgPrimaryColsHeader', componentClass: PrimaryColsHeaderPanel },
        { componentName: 'AgPrimaryColsList', componentClass: PrimaryColsListPanel },
        { componentName: 'AgPrimaryCols', componentClass: PrimaryColsPanel }
    ],
    userComponents: [
        { componentName: 'agColumnsToolPanel', componentClass: ColumnToolPanel },
    ],
    dependantModules: [
        EnterpriseCoreModule,
        RowGroupingModule,
        SideBarModule
    ]
};
