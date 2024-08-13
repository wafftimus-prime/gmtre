import { AgGroupComponentParams, AgSliderParams, Autowired, Component, PostConstruct } from '@gmtre-datagrid/core';
import { ChartTranslationKey, ChartTranslationService } from '../../../services/chartTranslationService';
import { ChartOptionsProxy } from '../../../services/chartOptionsService';
import { ChartMenuParamsFactory } from '../../chartMenuParamsFactory';
import { AgAxisGridLineOptions } from 'ag-charts-community';
import { AgColorPickerParams } from '../../../../../widgets/agColorPicker';

export class GridLinePanel extends Component {
    public static TEMPLATE = /* html */ `<div>
            <ag-group-component ref="gridLineGroup">
                <ag-color-picker ref="gridLineColorPicker"></ag-color-picker>
                <ag-slider ref="gridLineWidthSlider"></ag-slider>
                <ag-slider ref="gridLineLineDashSlider"></ag-slider>
            </ag-group-component>
        </div>`;

    @Autowired('chartTranslationService') private readonly chartTranslationService: ChartTranslationService;

    private readonly chartOptions: ChartOptionsProxy;

    constructor(private readonly chartMenuUtils: ChartMenuParamsFactory) {
        super();
        this.chartOptions = chartMenuUtils.getChartOptions();
    }

    @PostConstruct
    private init() {
        const gridLineGroupParams = this.chartMenuUtils.addEnableParams<AgGroupComponentParams>('gridLine.enabled', {
            cssIdentifier: 'charts-format-sub-level',
            direction: 'vertical',
            suppressOpenCloseIcons: true,
            title: this.chartTranslationService.translate('gridLines'),
            suppressEnabledCheckbox: false,
        });
        const gridLineColorPickerParams = this.getGridLineColorPickerParams('color');
        const gridLineWidthSliderParams = this.getGridLineWidthSliderParams('thickness');
        const gridLineLineDashSliderParams = this.getGridLineDashSliderParams('lineDash');
        this.setTemplate(GridLinePanel.TEMPLATE, {
            gridLineGroup: gridLineGroupParams,
            gridLineColorPicker: gridLineColorPickerParams,
            gridLineWidthSlider: gridLineWidthSliderParams,
            gridLineLineDashSlider: gridLineLineDashSliderParams,
        });
    }

    private getGridLineColorPickerParams(labelKey: ChartTranslationKey): AgColorPickerParams {
        return this.chartMenuUtils.getDefaultColorPickerParams(
            'gridLine.style',
            labelKey,
            {
                formatInputValue: (value: AgAxisGridLineOptions['style']) => {
                    return value?.[0]?.stroke;
                },
                parseInputValue: (value: string) => {
                    const styles = this.chartOptions.getValue<AgAxisGridLineOptions['style']>('gridLine.style') ?? [];
                    if (styles.length === 0) return [{ stroke: value, lineDash: [] }];
                    return [{ ...styles[0], stroke: value }];
                },
            }
        );
    }

    private getGridLineWidthSliderParams(labelKey: ChartTranslationKey) {
        return this.chartMenuUtils.getDefaultSliderParams('gridLine.width', labelKey, 10);
    }

    private getGridLineDashSliderParams(labelKey: ChartTranslationKey): AgSliderParams {
        const initialStyles = this.chartOptions.getValue<AgAxisGridLineOptions['style']>('gridLine.style');
        const initialValue = initialStyles?.[0]?.lineDash?.[0];
        const params = this.chartMenuUtils.getDefaultSliderParamsWithoutValueParams(
            initialValue ?? 0,
            labelKey,
            30,
        );
        params.onValueChange = (value: number): void => {
            const stroke = this.chartOptions.getValue('gridLine.style.0.stroke');
            this.chartOptions.setValue<AgAxisGridLineOptions['style']>(
                'gridLine.style',
                [{ lineDash: [value], stroke }],
            );
        };
        return params;
    }
}
