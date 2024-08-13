import {
    _,
    AgGroupComponentParams,
    AgSlider,
    AgSliderParams,
    Autowired,
    Component,
    PostConstruct,
    RefSelector,
    AgSelectParams
} from "@gmtre-datagrid/core";
import { ChartTranslationKey, ChartTranslationService } from "../../../services/chartTranslationService";
import { ChartMenuParamsFactory } from "../../chartMenuParamsFactory";
import { ChartOptionsService } from '../../../services/chartOptionsService';

export class MarkersPanel extends Component {

    public static TEMPLATE = /* html */
        `<div>
            <ag-group-component ref="seriesMarkersGroup">
                <ag-select ref="seriesMarkerShapeSelect"></ag-select>
                <ag-slider ref="seriesMarkerMinSizeSlider"></ag-slider>
                <ag-slider ref="seriesMarkerSizeSlider"></ag-slider>
                <ag-slider ref="seriesMarkerStrokeWidthSlider"></ag-slider>
            </ag-group-component>
        </div>`;

    @RefSelector('seriesMarkerMinSizeSlider') private seriesMarkerMinSizeSlider: AgSlider;

    @Autowired('chartTranslationService') private readonly chartTranslationService: ChartTranslationService;

    constructor(
        private readonly chartOptionsService: ChartOptionsService,
        private readonly chartMenuUtils: ChartMenuParamsFactory,
    ) {
        super();
    }

    @PostConstruct
    private init() {
        // scatter charts should always show markers
        const chartType = this.chartOptionsService.getChartType();
        const shouldHideEnabledCheckbox = _.includes(['scatter', 'bubble'], chartType);
        const seriesMarkersGroupParams = this.chartMenuUtils.addEnableParams<AgGroupComponentParams>(
            'marker.enabled',
            {
                cssIdentifier: 'charts-format-sub-level',
                direction: 'vertical',
                title: this.chartTranslationService.translate("markers"),
                suppressEnabledCheckbox: shouldHideEnabledCheckbox,
                suppressOpenCloseIcons: true
            }
        );

        const isBubble = chartType === 'bubble';
        let seriesMarkerMinSizeSliderParams: AgSliderParams;
        let seriesMarkerSizeSliderParams: AgSliderParams;
        if (isBubble) {
            seriesMarkerMinSizeSliderParams = this.getSliderParams("marker.maxSize", "maxSize", 60);
            seriesMarkerSizeSliderParams = this.getSliderParams("marker.size", "minSize", 60);
        } else {
            seriesMarkerMinSizeSliderParams = {};
            seriesMarkerSizeSliderParams = this.getSliderParams("marker.size", "size", 60);
        }

        this.setTemplate(MarkersPanel.TEMPLATE, {
            seriesMarkersGroup: seriesMarkersGroupParams,
            seriesMarkerShapeSelect: this.getMarkerShapeSelectParams(),
            seriesMarkerMinSizeSlider: seriesMarkerMinSizeSliderParams,
            seriesMarkerSizeSlider: seriesMarkerSizeSliderParams,
            seriesMarkerStrokeWidthSlider: this.getSliderParams("marker.strokeWidth", "strokeWidth", 10)
        });
        if (!isBubble) {
            this.seriesMarkerMinSizeSlider.setDisplayed(false);
        }
    }

    private getMarkerShapeSelectParams(): AgSelectParams {
        const options = [
            {
                value: 'square',
                text: 'Square'
            },
            {
                value: 'circle',
                text: 'Circle'
            },
            {
                value: 'cross',
                text: 'Cross'
            },
            {
                value: 'diamond',
                text: 'Diamond'
            },
            {
                value: 'plus',
                text: 'Plus'
            },
            {
                value: 'triangle',
                text: 'Triangle'
            },
            {
                value: 'heart',
                text: 'Heart'
            }
        ];
        return this.chartMenuUtils.addValueParams(
            'marker.shape',
            {
                options,
                label: this.chartTranslationService.translate('shape')
            }
        );
    }

    private getSliderParams(expression: string, labelKey: ChartTranslationKey, defaultMaxValue: number): AgSliderParams {
        return this.chartMenuUtils.getDefaultSliderParams(
            expression,
            labelKey,
            defaultMaxValue
        );
    }
}
