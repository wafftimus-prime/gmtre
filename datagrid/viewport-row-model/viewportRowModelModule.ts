import { Module, ModuleNames } from "@gmtre-datagrid/core";
import { EnterpriseCoreModule } from "@gmtre-datagrid/core";
import { VERSION } from "./version";
import { ViewportRowModel } from "./viewportRowModel/viewportRowModel";

export const ViewportRowModelModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.ViewportRowModelModule,
    rowModel: 'viewport',
    beans: [ViewportRowModel],
    dependantModules: [
        EnterpriseCoreModule
    ]
};
