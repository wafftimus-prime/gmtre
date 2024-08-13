import {
    AgGroupComponentParams,
    Autowired,
    Component,
    PostConstruct
} from "@gmtre-datagrid/core";
import { ChartTranslationService } from "../../../services/chartTranslationService";
import { ChartMenuParamsFactory } from "../../chartMenuParamsFactory";

export class BackgroundPanel extends Component {
    public static TEMPLATE = /* html */
        `<div>
            <ag-group-component ref="chartBackgroundGroup">
                <ag-color-picker ref="colorPicker"></ag-color-picker>
            </ag-group-component>
        <div>`;

    @Autowired('chartTranslationService') private readonly chartTranslationService: ChartTranslationService;

    constructor(private readonly chartMenuUtils: ChartMenuParamsFactory) {
        super();
    }

    @PostConstruct
    private init() {
        const chartBackgroundGroupParams = this.chartMenuUtils.addEnableParams<AgGroupComponentParams>(
            'background.visible',
            {
                cssIdentifier: 'charts-format-sub-level',
                direction: 'vertical',
                suppressOpenCloseIcons: true,
                title: this.chartTranslationService.translate('background'),
                suppressEnabledCheckbox: false
            }
        );
        const colorPickerParams = this.chartMenuUtils.getDefaultColorPickerParams('background.fill');
        this.setTemplate(BackgroundPanel.TEMPLATE, {
            chartBackgroundGroup: chartBackgroundGroupParams,
            colorPicker: colorPickerParams
        });
    }
}
