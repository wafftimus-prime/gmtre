import { EnterpriseCoreModule, Module, ModuleNames } from "@gmtre-datagrid/core";
import { AdvancedFilterComp } from "./advancedFilter/advancedFilterComp";
import { AdvancedFilterExpressionService } from "./advancedFilter/advancedFilterExpressionService";
import { AdvancedFilterService } from "./advancedFilter/advancedFilterService";
import { VERSION } from "./version";

export const AdvancedFilterModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.AdvancedFilterModule,
    beans: [AdvancedFilterService, AdvancedFilterExpressionService],
    agStackComponents: [
        { componentName: 'agAdvancedFilter', componentClass: AdvancedFilterComp }
    ],
    dependantModules: [
        EnterpriseCoreModule
    ]
};
