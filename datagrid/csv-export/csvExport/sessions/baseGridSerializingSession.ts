import {
    Column,
    ColumnModel,
    GridOptionsService,
    ProcessCellForExportParams,
    ProcessGroupHeaderForExportParams,
    ProcessHeaderForExportParams,
    ProcessRowGroupForExportParams,
    RowNode,
    ValueFormatterService,
    ValueService,
    ValueParserService
} from "@gmtre-datagrid/core";

import { GridSerializingParams, GridSerializingSession, RowAccumulator, RowSpanningAccumulator } from "../interfaces";

export abstract class BaseGridSerializingSession<T> implements GridSerializingSession<T> {
    public columnModel: ColumnModel;
    public valueService: ValueService;
    public gos: GridOptionsService;
    public valueFormatterService: ValueFormatterService;
    public valueParserService: ValueParserService;
    public processCellCallback?: (params: ProcessCellForExportParams) => string;
    public processHeaderCallback?: (params: ProcessHeaderForExportParams) => string;
    public processGroupHeaderCallback?: (params: ProcessGroupHeaderForExportParams) => string;
    public processRowGroupCallback?: (params: ProcessRowGroupForExportParams) => string;

    private groupColumns: Column[] = [];

    constructor(config: GridSerializingParams) {
        const {
            columnModel,
            valueService,
            gos,
            valueFormatterService,
            valueParserService,
            processCellCallback,
            processHeaderCallback,
            processGroupHeaderCallback,
            processRowGroupCallback,
        } = config;

        this.columnModel = columnModel;
        this.valueService = valueService;
        this.gos = gos;
        this.valueFormatterService = valueFormatterService;
        this.valueParserService = valueParserService;
        this.processCellCallback = processCellCallback;
        this.processHeaderCallback = processHeaderCallback;
        this.processGroupHeaderCallback = processGroupHeaderCallback;
        this.processRowGroupCallback = processRowGroupCallback;
    }

    abstract addCustomContent(customContent: T): void;
    abstract onNewHeaderGroupingRow(): RowSpanningAccumulator;
    abstract onNewHeaderRow(): RowAccumulator;
    abstract onNewBodyRow(node?: RowNode): RowAccumulator;
    abstract parse(): string;

    public prepare(columnsToExport: Column[]): void {
        this.groupColumns = columnsToExport.filter(col => !!col.getColDef().showRowGroup);
    }

    public extractHeaderValue(column: Column): string {
        const value = this.getHeaderName(this.processHeaderCallback, column);
        return value ?? ''
    }

    public extractRowCellValue(
        column: Column,
        index: number,
        accumulatedRowIndex: number,
        type: string,
        node: RowNode
    ): { value: any, valueFormatted?: string | null } {
        // we render the group summary text e.g. "-> Parent -> Child"...
        const hideOpenParents = this.gos.get('groupHideOpenParents');
        const value = ((!hideOpenParents || node.footer) && this.shouldRenderGroupSummaryCell(node, column, index))
            ? this.createValueForGroupNode(column, node)
            : this.valueService.getValue(column, node);

        const processedValue = this.processCell({
            accumulatedRowIndex,
            rowNode: node,
            column,
            value,
            processCellCallback: this.processCellCallback,
            type
        });

        return processedValue;
    }

    private shouldRenderGroupSummaryCell(node: RowNode, column: Column, currentColumnIndex: number): boolean {
        const isGroupNode = node && node.group;
        // only on group rows
        if (!isGroupNode) { return false; }

        const currentColumnGroupIndex = this.groupColumns.indexOf(column);

        if (currentColumnGroupIndex !== -1) {
            if (node.groupData?.[column.getId()] != null) { return true; }

            if (this.gos.isRowModelType('serverSide') && node.group) {
                return true;
            }

            // if this is a top level footer, always render`Total` in the left-most cell
            if (node.footer && node.level === -1) {
                const colDef = column.getColDef();
                const isFullWidth = colDef == null || colDef.showRowGroup === true;

                return isFullWidth || colDef.showRowGroup === this.columnModel.getRowGroupColumns()[0].getId();
            }
        }

        const isGroupUseEntireRow = this.gos.isGroupUseEntireRow(this.columnModel.isPivotMode());

        return currentColumnIndex === 0 && isGroupUseEntireRow;
    }

    private getHeaderName(callback: ((params: ProcessHeaderForExportParams) => string) | undefined, column: Column): string | null {
        if (callback) {
            return callback(this.gos.addGridCommonParams({ column }));
        }

        return this.columnModel.getDisplayNameForColumn(column, 'csv', true);
    }

    private createValueForGroupNode(column: Column, node: RowNode): string {
        if (this.processRowGroupCallback) {
            return this.processRowGroupCallback(this.gos.addGridCommonParams({ column, node }));
        }

        const isTreeData = this.gos.get('treeData');
        const isSuppressGroupMaintainValueType = this.gos.get('suppressGroupMaintainValueType');

        // if not tree data and not suppressGroupMaintainValueType then we get the value from the group data
        const getValueFromNode = (node: RowNode) => {
            if (isTreeData || isSuppressGroupMaintainValueType) {
                return node.key;
            }
            const value = node.groupData?.[column.getId()];
            if (!value || !node.rowGroupColumn || node.rowGroupColumn.getColDef().useValueFormatterForExport === false) { return value; }
            return this.valueFormatterService.formatValue(node.rowGroupColumn, node, value) ?? value;
        }


        const isFooter = node.footer;
        const keys = [getValueFromNode(node)];

        if (!this.gos.isGroupMultiAutoColumn()) {
            while (node.parent) {
                node = node.parent;
                keys.push(getValueFromNode(node));
            }
        }

        const groupValue = keys.reverse().join(' -> ');

        return isFooter ? `Total ${groupValue}` : groupValue;
    }

    private processCell(params: {
        accumulatedRowIndex: number, rowNode: RowNode, column: Column, value: any, processCellCallback: ((params: ProcessCellForExportParams) => string) | undefined, type: string
    }): { value: any, valueFormatted?: string | null } {
        const { accumulatedRowIndex, rowNode, column, value, processCellCallback, type } = params;

        if (processCellCallback) {
            return {
                value: processCellCallback(this.gos.addGridCommonParams({
                    accumulatedRowIndex,
                    column: column,
                    node: rowNode,
                    value: value,
                    type: type,
                    parseValue: (valueToParse: string) => this.valueParserService.parseValue(column, rowNode, valueToParse, this.valueService.getValue(column, rowNode)),
                    formatValue: (valueToFormat: any) => this.valueFormatterService.formatValue(column, rowNode, valueToFormat) ?? valueToFormat
                })) ?? ''
            };
        }

        if (column.getColDef().useValueFormatterForExport !== false) {
            return {
                value: value ?? '',
                valueFormatted: this.valueFormatterService.formatValue(column, rowNode, value),
            };
        }

        return { value: value ?? '' };
    }
}
