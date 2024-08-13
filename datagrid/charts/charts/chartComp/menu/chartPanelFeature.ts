import {
    BeanStub,
    ChartType,
    Component,
    PostConstruct,
    _
} from "@gmtre-datagrid/core";
import { ChartController } from "../chartController";
import { ChartSeriesType, getSeriesType } from "../utils/seriesTypeMapper";

export class ChartPanelFeature extends BeanStub {
    private chartType: ChartType;
    private isGrouping: boolean;
    private panels: Component[] = [];

    constructor(
        private readonly chartController: ChartController,
        private readonly eGui: HTMLElement,
        private readonly cssClass: string,
        private readonly createPanels: (chartType: ChartType, seriesType: ChartSeriesType) => void
    ) {
        super();
    }

    @PostConstruct
    private postConstruct(): void {
        this.addManagedListener(this.chartController, ChartController.EVENT_CHART_UPDATED, () => this.refreshPanels(true));
        this.addManagedListener(this.chartController, ChartController.EVENT_CHART_API_UPDATE, () => this.refreshPanels(false));
    }

    public addComponent(component: Component): void {
        this.createBean(component);
        this.panels.push(component);
        component.addCssClass(this.cssClass);
        this.eGui.appendChild(component.getGui());
    }

    public refreshPanels(reuse?: boolean) {
        const chartType = this.chartController.getChartType();
        const isGrouping = this.chartController.isGrouping();
        const seriesType = getSeriesType(chartType);

        if (reuse && chartType === this.chartType && isGrouping === this.isGrouping) {
            // existing panels can be re-used
            return;
        }

        this.destroyPanels();

        this.createPanels(chartType, seriesType);

        this.chartType = chartType;
        this.isGrouping = isGrouping;
    }

    private destroyPanels(): void {
        this.panels.forEach(panel => {
            _.removeFromParent(panel.getGui());
            this.destroyBean(panel);
        });
        this.panels = [];
    }

    protected destroy(): void {
        this.destroyPanels();
        super.destroy();
    }
}
