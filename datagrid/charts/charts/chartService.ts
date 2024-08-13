import {
    Autowired,
    Bean,
    BeanStub,
    CellRangeParams,
    ChartDownloadParams,
    ChartModel,
    ChartParamsCellRange,
    ChartRef,
    ChartType,
    ColumnModel,
    CreateCrossFilterChartParams,
    CreatePivotChartParams,
    CreateRangeChartParams,
    GetChartImageDataUrlParams,
    IAggFunc,
    IChartService,
    IRangeService,
    ModuleRegistry,
    OpenChartToolPanelParams,
    Optional,
    PartialCellRange,
    PreDestroy,
    SeriesChartType,
    UpdateChartParams
} from "@gmtre-datagrid/core";
import { AgChartThemeOverrides, AgChartThemePalette, VERSION as CHARTS_VERSION, _ModuleSupport} from "ag-charts-community";
import { GridChartComp, GridChartParams } from "./chartComp/gridChartComp";
import { getCanonicalChartType, isEnterpriseChartType } from './chartComp/utils/seriesTypeMapper';
import { upgradeChartModel } from "./chartModelMigration";
import { VERSION as GRID_VERSION } from "../version";

export interface CrossFilteringContext {
    lastSelectedChartId: string;
}

@Bean('chartService')
export class ChartService extends BeanStub implements IChartService {

    @Optional('rangeService') private rangeService: IRangeService;
    @Autowired('columnModel') private columnModel: ColumnModel;

    public static CHARTS_VERSION = CHARTS_VERSION;

    // we destroy all charts bound to this grid when grid is destroyed. activeCharts contains all charts, including
    // those in developer provided containers.
    private activeCharts = new Set<ChartRef>();
    private activeChartComps = new Set<GridChartComp>();

    // this shared (singleton) context is used by cross filtering in line and area charts
    private crossFilteringContext: CrossFilteringContext = {
        lastSelectedChartId: '',
    };

    public isEnterprise = () => _ModuleSupport.enterpriseModule.isEnterprise;

    public updateChart(params: UpdateChartParams): void {
        const chartType = params.chartType;
        if (chartType && isEnterpriseChartType(chartType) && !this.isEnterprise()) {
            ModuleRegistry.__warnEnterpriseChartDisabled(chartType);
            return;
        }

        if (this.activeChartComps.size === 0) {
            console.warn(`AG Grid - No active charts to update.`);
            return;
        }

        const chartComp = [...this.activeChartComps].find(chartComp => chartComp.getChartId() === params.chartId);
        if (!chartComp) {
            console.warn(`AG Grid - Unable to update chart. No active chart found with ID: ${params.chartId}.`);
            return;
        }

        chartComp.update(params);
    }

    public getChartModels(): ChartModel[] {
        const models: ChartModel[] = [];

        const versionedModel = (c: ChartModel) => {
            return {...c, version: GRID_VERSION };
        };
        this.activeChartComps.forEach(c => models.push(versionedModel(c.getChartModel())));

        return models;
    }

    public getChartRef(chartId: string): ChartRef | undefined {
        let chartRef;
        this.activeCharts.forEach(cr => {
            if (cr.chartId === chartId) {
                chartRef = cr;
            }
        });
        return chartRef;
    }

    public getChartComp(chartId: string): GridChartComp | undefined {
        let chartComp;
        this.activeChartComps.forEach(comp => {
            if (comp.getChartId() === chartId) {
                chartComp = comp;
            }
        });
        return chartComp;
    }

    public getChartImageDataURL(params: GetChartImageDataUrlParams): string | undefined {
        let url: any;
        this.activeChartComps.forEach(c => {
            if (c.getChartId() === params.chartId) {
                url = c.getChartImageDataURL(params.fileFormat);
            }
        });
        return url;
    }

    public downloadChart(params: ChartDownloadParams) {
        const chartComp = Array.from(this.activeChartComps).find(c => c.getChartId() === params.chartId);
        chartComp?.downloadChart(params.dimensions, params.fileName, params.fileFormat);
    }

    public openChartToolPanel(params: OpenChartToolPanelParams) {
        const chartComp = Array.from(this.activeChartComps).find(c => c.getChartId() === params.chartId);
        chartComp?.openChartToolPanel(params.panel);
    }

    public closeChartToolPanel(chartId: string) {
        const chartComp = Array.from(this.activeChartComps).find(c => c.getChartId() === chartId);
        chartComp?.closeChartToolPanel();
    }

    public createChartFromCurrentRange(chartType: ChartType = 'groupedColumn'): ChartRef | undefined {
        const selectedRange: PartialCellRange = this.getSelectedRange();
        return this.createChart(selectedRange, chartType);
    }

    public restoreChart(model: ChartModel, chartContainer?: HTMLElement): ChartRef | undefined {
        if (!model) {
            console.warn("AG Grid - unable to restore chart as no chart model is provided");
            return;
        }

        if (model.version !== GRID_VERSION) {
            model = upgradeChartModel(model);
        }

        const params = {
            cellRange: model.cellRange,
            chartType: model.chartType,
            chartThemeName: model.chartThemeName,
            chartContainer: chartContainer,
            suppressChartRanges: model.suppressChartRanges,
            switchCategorySeries: model.switchCategorySeries,
            aggFunc: model.aggFunc,
            unlinkChart: model.unlinkChart,
            seriesChartTypes: model.seriesChartTypes
        };

        if (model.modelType === 'pivot') {
            // if required enter pivot mode
            this.gos.updateGridOptions({ options: { pivotMode: true}, source: 'pivotChart' as any });

            // pivot chart range contains all visible column without a row range to include all rows
            const columns = this.columnModel.getAllDisplayedColumns().map(col => col.getColId());
            const chartAllRangeParams: CellRangeParams = {
                rowStartIndex: null,
                rowStartPinned: undefined,
                rowEndIndex: null,
                rowEndPinned: undefined,
                columns
            };

            const cellRange = this.createCellRange(chartAllRangeParams);
            if (!cellRange) {
                console.warn("AG Grid - unable to create chart as there are no columns in the grid.");
                return;
            }

            return this.createChart(
                cellRange,
                params.chartType,
                params.chartThemeName,
                true,
                true,
                params.chartContainer,
                false,
                undefined,
                undefined,
                params.unlinkChart,
                false,
                model.chartOptions);
        }

        const cellRange = this.createCellRange(params.cellRange);
        if (!cellRange) {
            console.warn("AG Grid - unable to create chart as no range is selected");
            return;
        }

        return this.createChart(
            cellRange!,
            params.chartType,
            params.chartThemeName,
            false,
            params.suppressChartRanges,
            params.chartContainer,
            params.switchCategorySeries,
            params.aggFunc,
            undefined,
            params.unlinkChart,
            false,
            model.chartOptions,
            model.chartPalette,
            params.seriesChartTypes);
    }

    public createRangeChart(params: CreateRangeChartParams): ChartRef | undefined {
        const cellRange = this.createCellRange(params.cellRange);

        if (!cellRange) {
            console.warn("AG Grid - unable to create chart as no range is selected");
            return;
        }

        return this.createChart(
            cellRange,
            params.chartType,
            params.chartThemeName,
            false,
            params.suppressChartRanges,
            params.chartContainer,
            params.switchCategorySeries,
            params.aggFunc,
            params.chartThemeOverrides,
            params.unlinkChart,
            undefined,
            undefined,
            undefined,
            params.seriesChartTypes);
    }

    public createPivotChart(params: CreatePivotChartParams): ChartRef | undefined {
        // if required enter pivot mode
        this.gos.updateGridOptions({ options: { pivotMode: true}, source: 'pivotChart' as any });

        // pivot chart range contains all visible column without a row range to include all rows
        const chartAllRangeParams: CellRangeParams = {
            rowStartIndex: null,
            rowStartPinned: undefined,
            rowEndIndex: null,
            rowEndPinned: undefined,
            columns: this.columnModel.getAllDisplayedColumns().map(col => col.getColId())
        };

        const cellRange = this.createCellRange(chartAllRangeParams);

        if (!cellRange) {
            console.warn("AG Grid - unable to create chart as there are no columns in the grid.");
            return;
        }

        return this.createChart(
            cellRange,
            params.chartType,
            params.chartThemeName,
            true,
            true,
            params.chartContainer,
            false,
            undefined,
            params.chartThemeOverrides,
            params.unlinkChart);
    }

    public createCrossFilterChart(params: CreateCrossFilterChartParams): ChartRef | undefined {
        const cellRange = this.createCellRange(params.cellRange);

        if (!cellRange) {
            console.warn("AG Grid - unable to create chart as no range is selected");
            return;
        }

        const crossFiltering = true;

        const suppressChartRangesSupplied = typeof params.suppressChartRanges !== 'undefined' && params.suppressChartRanges !== null;
        const suppressChartRanges = suppressChartRangesSupplied ? params.suppressChartRanges : true;

        return this.createChart(
            cellRange,
            params.chartType,
            params.chartThemeName,
            false,
            suppressChartRanges,
            params.chartContainer,
            false,
            params.aggFunc,
            params.chartThemeOverrides,
            params.unlinkChart,
            crossFiltering);
    }

    private createChart(
        cellRange: PartialCellRange,
        chartType: ChartType,
        chartThemeName?: string,
        pivotChart = false,
        suppressChartRanges = false,
        container?: HTMLElement,
        switchCategorySeries = false,
        aggFunc?: string | IAggFunc,
        chartThemeOverrides?: AgChartThemeOverrides,
        unlinkChart = false,
        crossFiltering  = false,
        chartOptionsToRestore?: AgChartThemeOverrides,
        chartPaletteToRestore?: AgChartThemePalette,
        seriesChartTypes?: SeriesChartType[]): ChartRef | undefined {

        if (isEnterpriseChartType(chartType) && !this.isEnterprise()) {
            ModuleRegistry.__warnEnterpriseChartDisabled(chartType);
            return undefined;
        }

        const createChartContainerFunc = this.gos.getCallback('createChartContainer');

        const params: GridChartParams = {
            chartId: this.generateId(),
            pivotChart,
            cellRange,
            chartType: getCanonicalChartType(chartType),
            chartThemeName,
            insideDialog: !(container || createChartContainerFunc),
            suppressChartRanges,
            switchCategorySeries,
            aggFunc,
            chartThemeOverrides,
            unlinkChart,
            crossFiltering,
            crossFilteringContext: this.crossFilteringContext,
            chartOptionsToRestore,
            chartPaletteToRestore,
            seriesChartTypes,
            crossFilteringResetCallback: () => this.activeChartComps.forEach(c => c.crossFilteringReset()),
        };

        const chartComp = new GridChartComp(params);
        this.context.createBean(chartComp);

        const chartRef = this.createChartRef(chartComp);

        if (container) {
            // if container exists, means developer initiated chart create via API, so place in provided container
            container.appendChild(chartComp.getGui());

            // if the chart container was placed outside an element that
            // has the grid's theme, we manually add the current theme to
            // make sure all styles for the chartMenu are rendered correctly
            const theme = this.environment.getTheme();

            if (theme.el && !theme.el.contains(container)) {
                container.classList.add(theme.theme!);
            }
        } else if (createChartContainerFunc) {
            // otherwise, user created chart via grid UI, check if developer provides containers (e.g. if the application
            // is using its own dialogs rather than the grid provided dialogs)
            createChartContainerFunc(chartRef);
        } else {
            // add listener to remove from active charts list when charts are destroyed, e.g. closing chart dialog
            chartComp.addEventListener(
                GridChartComp.EVENT_DESTROYED,
                () => {
                    this.activeChartComps.delete(chartComp);
                    this.activeCharts.delete(chartRef);
                });
        }

        return chartRef;
    }

    private createChartRef(chartComp: GridChartComp): ChartRef {
        const chartRef: ChartRef = {
            destroyChart: () => {
                if (this.activeCharts.has(chartRef)) {
                    this.context.destroyBean(chartComp);
                    this.activeChartComps.delete(chartComp);
                    this.activeCharts.delete(chartRef);
                }
            },
            chartElement: chartComp.getGui(),
            chart: chartComp.getUnderlyingChart(),
            chartId: chartComp.getChartModel().chartId
        };

        this.activeCharts.add(chartRef);
        this.activeChartComps.add(chartComp);

        return chartRef;
    }

    private getSelectedRange(): PartialCellRange {
        const ranges = this.rangeService.getCellRanges();
        return ranges.length > 0 ? ranges[0] : { columns: [] };
    }

    private generateId(): string {
        return `id-${Math.random().toString(36).substring(2, 18)}`;
    }

    private createCellRange(cellRangeParams: ChartParamsCellRange): PartialCellRange | undefined {
        return cellRangeParams && this.rangeService?.createPartialCellRangeFromRangeParams(cellRangeParams as CellRangeParams, true);
    }

    @PreDestroy
    private destroyAllActiveCharts(): void {
        this.activeCharts.forEach(chart => chart.destroyChart());
    }
}
