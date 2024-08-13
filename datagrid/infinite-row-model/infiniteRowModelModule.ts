import { Module, ModuleNames } from "@gmtre-datagrid/core";
import { InfiniteRowModel } from "./infiniteRowModel/infiniteRowModel";
import { VERSION } from "./version";

export const InfiniteRowModelModule: Module = {
    version: VERSION,
    moduleName: ModuleNames.InfiniteRowModelModule,
    rowModel: 'infinite',
    beans: [InfiniteRowModel],
};
