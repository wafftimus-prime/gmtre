import {
    AgGroupComponentParams,
    Autowired,
    Component,
    PostConstruct,
} from "@gmtre-datagrid/core";
import { ChartTranslationService } from "../../../services/chartTranslationService";
import { ChartMenuParamsFactory } from "../../chartMenuParamsFactory";

export class NavigatorPanel extends Component {

    public static TEMPLATE = /* html */
        `<div>
            <ag-group-component ref="navigatorGroup">
                <ag-slider ref="navigatorHeightSlider"></ag-slider>
                <ag-checkbox ref="navigatorMiniChartCheckbox"></ag-checkbox>
            </ag-group-component>
        </div>`;

    @Autowired('chartTranslationService') private readonly chartTranslationService: ChartTranslationService;

    constructor(private readonly chartMenuParamsFactory: ChartMenuParamsFactory) {
        super();
    }

    @PostConstruct
    private init() {
        const navigatorGroupParams = this.chartMenuParamsFactory.addEnableParams<AgGroupComponentParams>(
            'navigator.enabled',
            {
                cssIdentifier: 'charts-advanced-settings-top-level',
                direction: 'vertical',
                suppressOpenCloseIcons: true,
                title: this.chartTranslationService.translate("navigator"),
                suppressEnabledCheckbox: true,
                useToggle: true
            }
        );
        const navigatorHeightSliderParams = this.chartMenuParamsFactory.getDefaultSliderParams("navigator.height", "height", 60);
        navigatorHeightSliderParams.minValue = 10;
        const navigatorMiniChartCheckboxParams = this.chartMenuParamsFactory.getDefaultCheckboxParams("navigator.miniChart.enabled", "miniChart");

        this.setTemplate(NavigatorPanel.TEMPLATE, {
            navigatorGroup: navigatorGroupParams,
            navigatorHeightSlider: navigatorHeightSliderParams,
            navigatorMiniChartCheckbox: navigatorMiniChartCheckboxParams
        });
    }
}
