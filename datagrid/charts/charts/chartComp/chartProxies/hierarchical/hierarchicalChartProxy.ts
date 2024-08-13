import { AgCharts, AgHierarchyChartOptions, AgHierarchySeriesOptions } from 'ag-charts-community';
import { ChartProxy, ChartProxyParams, UpdateParams } from '../chartProxy';
import { CATEGORY_LABEL_KEY, createAutoGroupHierarchy, createCategoryHierarchy } from './hierarchicalChartUtils';
import { GROUP_AUTO_COLUMN_ID } from '@gmtre-datagrid/core';

export abstract class HierarchicalChartProxy extends ChartProxy {
    protected constructor(protected readonly chartProxyParams: ChartProxyParams) {
        super(chartProxyParams);
    }

    public override update(params: UpdateParams): void {
        const options: AgHierarchyChartOptions = {
            ...this.getCommonChartOptions(params.updatedOverrides),
            series: this.getSeries(params, CATEGORY_LABEL_KEY),
            data: this.getData(params),
        };

        AgCharts.update(this.getChartRef(), options);
    }

    protected abstract getSeries(params: UpdateParams, labelKey: string): AgHierarchySeriesOptions[];

    protected getData(params: UpdateParams): any[] {
        const { categories, data, grouping: isGrouped } = params;
        if (isGrouped) {
            return createAutoGroupHierarchy(data, getRowAutoGroupLabels);
        } else {
            const categoryKeys = categories.map(({ id }) => id);
            return createCategoryHierarchy(data, categoryKeys);
        }
    }
}

function getRowAutoGroupLabels(item: object): string[] | null {
    return (item as { [GROUP_AUTO_COLUMN_ID]?: { labels: string[] } })[GROUP_AUTO_COLUMN_ID]?.labels ?? null;
}

