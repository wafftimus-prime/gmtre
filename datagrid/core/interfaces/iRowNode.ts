import { Column } from "../entities/column";
import { AgEvent, SelectionEventSourceType } from "../events";

export type RowNodeEventType =
    'rowSelected' |
    'selectableChanged' |
    'displayedChanged' |
    'dataChanged' |
    'cellChanged' |
    'masterChanged' |
    'heightChanged' |
    'topChanged' |
    'groupChanged' |
    'allChildrenCountChanged' |
    'firstChildChanged' |
    'lastChildChanged' |
    'childIndexChanged' |
    'rowIndexChanged' |
    'expandedChanged' |
    'hasChildrenChanged' |
    'uiLevelChanged' |
    'rowHighlightChanged' |
    'mouseEnter' |
    'mouseLeave' |
    'draggingChanged';

export interface SetSelectedParams {
    // true or false, whatever you want to set selection to
    newValue: boolean;
    // whether to remove other selections after this selection is done
    clearSelection?: boolean;
    // true when action is NOT on this node, ie user clicked a group and this is the child of a group
    suppressFinishActions?: boolean;
    // gets used when user shift-selects a range
    rangeSelect?: boolean;
    // used in group selection, if true, filtered out children will not be selected
    groupSelectsFiltered?: boolean;
    // event source, if from an event
    source: SelectionEventSourceType;
}

export interface RowNodeEvent<TData = any> extends AgEvent {
    /** Event identifier */
    type: RowNodeEventType;
    node: IRowNode<TData>;
}

export interface DataChangedEvent<TData = any> extends RowNodeEvent<TData> {
    oldData: TData | undefined;
    newData: TData | undefined;
    update: boolean;
}

export interface CellChangedEvent<TData = any> extends RowNodeEvent<TData> {
    column: Column;
    newValue: TData | undefined;
    oldValue: TData | undefined;
}

export enum RowHighlightPosition { Above, Below }

export type RowPinnedType = 'top' | 'bottom' | null | undefined;

export interface VerticalScrollPosition { top: number, bottom: number; }


interface BaseRowNode<TData = any> {
    /** Unique ID for the node. Either provided by the application, or generated by the grid if not. */
    id: string | undefined;
    /**
     * The data as provided by the application.
     * Can be `undefined` when using row grouping or during grid initialisation.
     */
    data: TData | undefined;

    /**
     * This will be `true` if it has a rowIndex assigned, otherwise `false`.
     */
    displayed: boolean
    /** Either `'top'` or `'bottom'` if row pinned, otherwise `undefined` or `null`. */
    rowPinned: RowPinnedType;
    /** Is this row selectable. */
    selectable: boolean;
    /** The height, in pixels, of this row. */
    rowHeight: number | null | undefined;
    /** The row top position in pixels. */
    rowTop: number | null;


    /** `true` if this node is a group node (i.e. it has children) */
    group: boolean | undefined;

    /** `true` if this is the first child in this group. Changes when data is sorted. */
    firstChild: boolean;
    /** `true` if this is the last child in this group. Changes when data is sorted. */
    lastChild: boolean;
    /** Index of this row with respect to its parent when grouping. Changes when data is sorted. */
    childIndex: number;

    /** How many levels this node is from the top when grouping. */
    level: number;
    /** How many levels this node is from the top when grouping in the UI (only different to `parent` when `groupRemoveSingleChildren=true`).*/
    uiLevel: number;
    /** The parent node to this node, or empty if top level. */
    parent: IRowNode<TData> | null;

    /** Used by server-side row model. `true` if this row node is a stub. A stub is a placeholder row with loading icon while waiting from row to be loaded. */
    stub: boolean;
    /** Used by server side row model, `true` if this row node failed a load. */
    failedLoad: boolean;

    /** The current row index. If the row is filtered out or in a collapsed group, this value will be `null`. */
    rowIndex: number | null;

    /** If using quick filter, stores a string representation of the row for searching against. */
    quickFilterAggregateText: string | null;

    /** `true` if this row is a master row, part of master / detail (ie row can be expanded to show detail). */
    master: boolean;
    /** `true` if this row is a detail row, part of master / detail (ie child row of an expanded master row). */
    detail: boolean;
}

interface GroupRowNode<TData = any> {
    /** The field we are grouping on from our row data. */
    field: string | null;
    /** The key value for this group. */
    key: string | null;

    /** If using row grouping, contains the group values for this group. */
    groupData: { [key: string]: any | null; } | null;
    /** If using row grouping and aggregation, contains the aggregation data. */
    aggData: any;


    /** The row group column used for this group. */
    rowGroupColumn: Column | null;
    /**
     * If doing in-memory (client-side) grouping, this is the index of the group column this cell is for.
     * This will always be the same as the level, unless we are collapsing groups, i.e. `groupRemoveSingleChildren=true`.
    */
    rowGroupIndex: number | null;
    /** `true` if group is expanded, otherwise `false`. */
    expanded: boolean;

    /** `true` if this node is a group and the group is the bottom level in the tree. */
    leafGroup: boolean;
    /** All lowest level nodes beneath this node, no groups. */
    allLeafChildren: IRowNode<TData>[];
    /** Number of children and grand children. */
    allChildrenCount: number | null;
    /** Children of this group. If multi levels of grouping, shows only immediate children. */
    childrenAfterGroup: IRowNode<TData>[] | null;
    /** Sorted children of this group. */
    childrenAfterSort: IRowNode<TData>[] | null;
    /** Filtered children of this group. */
    childrenAfterFilter: IRowNode<TData>[] | null;

    /** `true` if row is a footer. Footers have `group = true` and `footer = true`. */
    footer: boolean;
    /** If using footers, reference to the footer node for this group. */
    sibling: IRowNode<TData>;
}


export interface IRowNode<TData = any> extends BaseRowNode<TData>, GroupRowNode<TData> {

    /**
     * Select (or deselect) the node.
     * @param newValue -`true` for selection, `false` for deselection.
     * @param clearSelection - If selecting, then passing `true` will select the node exclusively (i.e. NOT do multi select). If doing deselection, `clearSelection` has no impact. Default: `false`
     * @param source - Source property that will appear in the `selectionChanged` event. Default: `'api'`
     */
    setSelected(newValue: boolean, clearSelection?: boolean, source?: SelectionEventSourceType): void;

    /** Returns:
     * - `true` if node is selected.
     * - `false` if the node isn't selected.
     * - `undefined` if it's partially selected (group where not all children are selected). 
     */
    isSelected(): boolean | undefined;

    /**
     * Returns:
     * - `true` if node is either pinned to the `top` or `bottom`.
     * - `false` if the node isn't pinned.
     */
    isRowPinned(): boolean;

    /** Returns:
    * - `true` if the node can be expanded, i.e it is a group or master row.
    * - `false` if the node cannot be expanded.
    */
    isExpandable(): boolean;
    /**
     * Set the expanded state of this rowNode. Pass `true` to expand and `false` to collapse.
     */
    setExpanded(expanded: boolean, e?: MouseEvent | KeyboardEvent): void;

    /**
     * Returns:
     * - `true` if the node is a full width cell.
     * - `false` if the node is not a full width cell.
     */
    isFullWidthCell(): boolean;

    /**
     * Returns:
     * - `true` if the node is currently hovered.
     * - `false` if the node is not hovered.
     */
    isHovered(): boolean;

    /** Add an event listener. */
    addEventListener(eventType: RowNodeEventType, listener: Function): void;
    /** Remove event listener. */
    removeEventListener(eventType: RowNodeEventType, listener: Function): void;

    /**
     * The first time `quickFilter` runs, the grid creates a one-off string representation of the row.
     * This string is then used for the quick filter instead of hitting each column separately.
     * When you edit, using grid editing, this string gets cleared down.
     * However if you edit without using grid editing, you will need to clear this string down for the row to be updated with the new values.
     * Otherwise new values will not work with the `quickFilter`.
     */
    resetQuickFilterAggregateText(): void;

    /** Perform a depth-first search of this node and its children. */
    depthFirstSearch(callback: (rowNode: IRowNode<TData>) => void): void;

    /**
     * Sets the row height.
     * Call if you want to change the height initially assigned to the row.
     * After calling, you must call `api.onRowHeightChanged()` so the grid knows it needs to work out the placement of the rows.
     * @param rowHeight - new height of the row
     * @param estimated - is this an estimated height. Default: `false`
     */
    setRowHeight(rowHeight: number | undefined | null, estimated?: boolean): void

    /**
     * Replaces the data on the `rowNode`. When this method is called, the grid will refresh the entire rendered row if it is displayed.
     */
    setData(data: TData): void;

    /**
     * Updates the data on the `rowNode`. When this method is called, the grid will refresh the entire rendered row if it is displayed.
     */
    updateData(data: TData): void;

    /**
     * Replaces the value on the `rowNode` for the specified column. When complete,
     * the grid will refresh the rendered cell on the required row only.
     * **Note**: This method only fires `onCellEditRequest` when the Grid is in **Read Only** mode.
     *
     * @param colKey The column where the value should be updated
     * @param newValue The new value
     * @param eventSource The source of the event
     * @returns `true` if the value was changed, otherwise `false`.
     */
    setDataValue(colKey: string | Column, newValue: any, eventSource?: string): boolean;

    /**
     * Returns the route of the row node. If the Row Node is a group, it returns the route to that Row Node.
     * If the Row Node is not a group, it returns `undefined`.
     */
    getRoute(): string[] | undefined;
}