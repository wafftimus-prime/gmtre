import { ChartProxy, ChartProxyParams, FieldDefinition, UpdateParams } from '../chartProxy';
import { AgCharts, AgDonutSeriesOptions, AgPieSeriesOptions, AgPolarChartOptions, AgPolarSeriesOptions, } from 'ag-charts-community';

import { changeOpacity } from '../../utils/color';
import { deepMerge } from '../../utils/object';

interface DonutOffset {
    offsetAmount: number;
    currentOffset: number;
}

export class PieChartProxy extends ChartProxy {

    public constructor(params: ChartProxyParams) {
        super(params);
    }

    public update(params: UpdateParams): void {
        const { data } = params;
        const [category] = params.categories;

        const options: AgPolarChartOptions = {
            ...this.getCommonChartOptions(params.updatedOverrides),
            data: this.crossFiltering ? this.getCrossFilterData(params) : this.transformData(data, category.id),
            series: this.getSeries(params),
        }

        AgCharts.update(this.getChartRef(), options);
    }

    private getSeries(params: UpdateParams): AgPolarSeriesOptions[] {
        const [category] = params.categories;
        const numFields = params.fields.length;

        const offset = {
            currentOffset: 0,
            offsetAmount: numFields > 1 ? 20 : 40
        };

        const series: (AgPieSeriesOptions | AgDonutSeriesOptions)[] = this.getFields(params).map((f: FieldDefinition) => {
            // options shared by 'pie' and 'donut' charts
            const options = {
                type: this.standaloneChartType as AgPieSeriesOptions['type'],
                angleKey: f.colId,
                angleName: f.displayName!,
                sectorLabelKey: f.colId,
                calloutLabelName: category.name,
                calloutLabelKey: category.id,
            }

            if (this.chartType === 'donut' || this.chartType === 'doughnut') {
                const { outerRadiusOffset, innerRadiusOffset } = PieChartProxy.calculateOffsets(offset);
                const title = f.displayName ? {
                    title: { text: f.displayName, showInLegend: numFields > 1 },
                } : undefined;

                // augment shared options with 'donut' specific options
                return {
                    ...options,
                    type: 'donut',
                    outerRadiusOffset,
                    innerRadiusOffset,
                    ...title,
                    calloutLine: {
                        colors: this.getChartPalette()?.strokes,
                    }
                }
            }

            return options;
        });

        return this.crossFiltering ? this.extractCrossFilterSeries(series) : series;
    }

    private getCrossFilterData(params: UpdateParams) {
        const colId = params.fields[0].colId;
        const filteredOutColId = `${colId}-filtered-out`;

        return params.data.map(d => {
            const total = d[colId] + d[filteredOutColId];
            d[`${colId}-total`] = total;
            d[filteredOutColId] = 1; // normalise to 1
            d[colId] = d[colId] / total; // fraction of 1
            return d;
        });
    }

    private extractCrossFilterSeries(series: (AgPieSeriesOptions | AgDonutSeriesOptions)[]) {
        const palette = this.getChartPalette();

        const primaryOptions = (seriesOptions: AgPieSeriesOptions | AgDonutSeriesOptions) => {
            return {
                ...seriesOptions,
                legendItemKey: seriesOptions.calloutLabelKey,
                calloutLabel: { enabled: false }, // hide labels on primary series
                highlightStyle: { item: { fill: undefined } },
                radiusKey: seriesOptions.angleKey,
                angleKey: seriesOptions.angleKey + '-total',
                radiusMin: 0,
                radiusMax: 1,
                listeners: {
                    nodeClick: this.crossFilterCallback,
                },
            };
        }

        const filteredOutOptions = (seriesOptions: AgPieSeriesOptions | AgDonutSeriesOptions, angleKey: string) => {
            return {
                ...deepMerge({}, primaryOpts),
                radiusKey: angleKey + '-filtered-out',
                fills: changeOpacity(seriesOptions.fills ?? palette!.fills, 0.3),
                strokes: changeOpacity(seriesOptions.strokes ?? palette!.strokes, 0.3),
                showInLegend: false,
            };
        }

        // currently, only single 'donut' cross-filter series are supported
        const primarySeries = series[0];

        // update primary series
        const angleKey = primarySeries.angleKey!;
        const primaryOpts = primaryOptions(primarySeries);

        return [
            filteredOutOptions(primarySeries, angleKey),
            primaryOpts,
        ];
    }

    private static calculateOffsets(offset: DonutOffset) {
        const outerRadiusOffset = offset.currentOffset;
        offset.currentOffset -= offset.offsetAmount;

        const innerRadiusOffset = offset.currentOffset;
        offset.currentOffset -= offset.offsetAmount;

        return { outerRadiusOffset, innerRadiusOffset };
    }

    private getFields(params: UpdateParams): FieldDefinition[] {
        // pie charts only support a single series, donut charts support multiple series
        return this.chartType === 'pie' ? params.fields.slice(0, 1) : params.fields;
    }

    public crossFilteringReset() {
        // not required in pie charts
    }
}
