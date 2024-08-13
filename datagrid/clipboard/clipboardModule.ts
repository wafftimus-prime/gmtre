import { Module, ModuleNames } from "@gmtre-datagrid/core";
import { EnterpriseCoreModule } from "@gmtre-datagrid/core";
import { CsvExportModule } from "@gmtre-datagrid/csv-export";
import { ClipboardService } from "./clipboard/clipboardService";
import { VERSION } from "./version";

export const ClipboardModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.ClipboardModule,
    beans: [ClipboardService],
    dependantModules: [
        EnterpriseCoreModule,
        CsvExportModule
    ]
};
