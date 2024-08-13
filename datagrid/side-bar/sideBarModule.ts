import { Module, ModuleNames } from "@gmtre-datagrid/core";
import { EnterpriseCoreModule } from "@gmtre-datagrid/core";
import { HorizontalResizeComp } from "./sideBar/horizontalResizeComp";
import { SideBarComp } from "./sideBar/sideBarComp";
import { SideBarButtonsComp } from "./sideBar/sideBarButtonsComp";
import { ToolPanelColDefService } from "./sideBar/common/toolPanelColDefService";
import { VERSION } from "./version";
import { SideBarService } from "./sideBar/sideBarService";

export const SideBarModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.SideBarModule,
    beans: [ToolPanelColDefService, SideBarService],
    agStackComponents: [
        { componentName: 'AgHorizontalResize', componentClass: HorizontalResizeComp },
        { componentName: 'AgSideBar', componentClass: SideBarComp },
        { componentName: 'AgSideBarButtons', componentClass: SideBarButtonsComp },
    ],
    dependantModules: [
        EnterpriseCoreModule
    ]
};
