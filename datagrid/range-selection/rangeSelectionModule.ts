import { Module, ModuleNames } from "@gmtre-datagrid/core";
import { EnterpriseCoreModule } from "@gmtre-datagrid/core";
import { RangeService } from "./rangeSelection/rangeService";
import { FillHandle } from "./rangeSelection/fillHandle";
import { RangeHandle } from "./rangeSelection/rangeHandle";
import { SelectionHandleFactory } from "./rangeSelection/selectionHandleFactory";
import { VERSION } from "./version";

export const RangeSelectionModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.RangeSelectionModule,
    beans: [RangeService, SelectionHandleFactory],
    agStackComponents: [
        { componentName: 'AgFillHandle', componentClass: FillHandle },
        { componentName: 'AgRangeHandle', componentClass: RangeHandle }
    ],
    dependantModules: [
        EnterpriseCoreModule
    ]
};
