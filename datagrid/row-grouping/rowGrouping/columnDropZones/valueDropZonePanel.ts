import {
    _,
    Column,
    ColumnValueChangeRequestEvent,
    DragAndDropService,
    DraggingEvent,
    Events,
    ITooltipParams,
    PostConstruct,
    WithoutGridCommon
} from "@gmtre-datagrid/core";
import { BaseDropZonePanel } from "./baseDropZonePanel";

export class ValuesDropZonePanel extends BaseDropZonePanel {
    constructor(horizontal: boolean) {
        super(horizontal, 'aggregation');
    }

    @PostConstruct
    private passBeansUp(): void {
        const localeTextFunc = this.localeService.getLocaleTextFunc();
        const emptyMessage = localeTextFunc('valueColumnsEmptyMessage', 'Drag here to aggregate');
        const title = localeTextFunc('values', 'Values');

        super.init({
            icon: _.createIconNoSpan('valuePanel', this.gos, null)!,
            emptyMessage: emptyMessage,
            title: title
        });

        this.addManagedListener(this.eventService, Events.EVENT_COLUMN_VALUE_CHANGED, this.refreshGui.bind(this));
    }

    protected getAriaLabel(): string {
        const translate = this.localeService.getLocaleTextFunc();
        const label = translate('ariaValuesDropZonePanelLabel', 'Values');

        return label;
    }

    public getTooltipParams(): WithoutGridCommon<ITooltipParams> {
        const res = super.getTooltipParams();
        res.location = 'valueColumnsList';
        return res;
    }

    protected getIconName(): string {
        return this.isPotentialDndItems() ? DragAndDropService.ICON_AGGREGATE : DragAndDropService.ICON_NOT_ALLOWED;
    }

    protected isItemDroppable(column: Column, draggingEvent: DraggingEvent): boolean {
        // we never allow grouping of secondary columns
        if (this.gos.get('functionsReadOnly') || !column.isPrimary()) { return false; }

        return column.isAllowValue() && (!column.isValueActive() || this.isSourceEventFromTarget(draggingEvent));
    }

    protected updateItems(columns: Column[]): void {
        if (this.gos.get('functionsPassive')) {
            const event: WithoutGridCommon<ColumnValueChangeRequestEvent> = {
                type: Events.EVENT_COLUMN_VALUE_CHANGE_REQUEST,
                columns: columns
            };
            this.eventService.dispatchEvent(event);
        } else {
            this.columnModel.setValueColumns(columns, "toolPanelUi");
        }
    }

    protected getExistingItems(): Column[] {
        return this.columnModel.getValueColumns();
    }
}
