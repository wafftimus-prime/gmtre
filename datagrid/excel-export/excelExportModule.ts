import { Module, ModuleNames } from "@gmtre-datagrid/core";
import { EnterpriseCoreModule } from "@gmtre-datagrid/core";
import { ExcelCreator } from "./excelExport/excelCreator";
import { CsvCreator, GridSerializer } from "@gmtre-datagrid/csv-export";
import { CsvExportModule } from "@gmtre-datagrid/csv-export";
import { VERSION } from "./version";

export const ExcelExportModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.ExcelExportModule,
    beans: [
        // beans in this module
        ExcelCreator,

        // these beans are part of CSV Export module
        GridSerializer, CsvCreator
    ],
    dependantModules: [
        CsvExportModule,
        EnterpriseCoreModule
    ]
};
