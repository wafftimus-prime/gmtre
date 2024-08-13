import {
    AgMenuItemComponent,
    AgMenuList,
    Autowired,
    Bean,
    BeanStub,
    Component,
    FocusService,
    IAfterGuiAttachedParams,
    MenuItemDef,
    PopupService,
    PostConstruct,
    RefSelector,
    _
} from '@gmtre-datagrid/core';
import { ChartController } from '../chartController';
import { ChartMenuService } from '../services/chartMenuService';
import { ChartTranslationService } from '../services/chartTranslationService';
import { ChartMenuContext } from './chartMenuContext';

@Bean('chartMenuListFactory')
export class ChartMenuListFactory extends BeanStub {
    @Autowired('popupService') private readonly popupService: PopupService;
    @Autowired('chartMenuService') private readonly chartMenuService: ChartMenuService;
    @Autowired('chartTranslationService') private readonly chartTranslationService: ChartTranslationService;

    private activeChartMenuList?: ChartMenuList;

    public showMenuList(params: {
        eventSource: HTMLElement,
        showMenu: () => void,
        chartMenuContext: ChartMenuContext
    }): void {
        const { eventSource, showMenu, chartMenuContext } = params;
        const areChartToolPanelsEnabled = this.chartMenuService.doChartToolPanelsExist(chartMenuContext.chartController);
        const menuItems = this.mapWithStockItems(
            this.getMenuItems(chartMenuContext.chartController, areChartToolPanelsEnabled),
            chartMenuContext,
            showMenu,
            eventSource,
            areChartToolPanelsEnabled)
        ;
        if (!menuItems.length) {
            return;
        }
        const chartMenuList = this.createBean(new ChartMenuList(menuItems));
        this.activeChartMenuList = chartMenuList;

        let multiplier = -1;
        let alignSide: 'left' | 'right' = 'left';

        if (this.gos.get('enableRtl')) {
            multiplier = 1;
            alignSide = 'right';
        }

        const eGui = chartMenuList.getGui()

        this.popupService.addPopup({
            modal: true,
            eChild: eGui,
            closeOnEsc: true,
            closedCallback: () => {
                this.destroyBean(chartMenuList);
                this.activeChartMenuList = undefined;
                const eDocument = this.gos.getDocument();
                const activeEl = this.gos.getActiveDomElement()
                if (!activeEl || activeEl === eDocument.body) {
                    eventSource.focus({ preventScroll: true });
                }
            },
            afterGuiAttached: params => chartMenuList.afterGuiAttached(params),
            positionCallback: () => {
                {
                    this.popupService.positionPopupByComponent({
                        type: 'chartMenu',
                        eventSource,
                        ePopup: eGui,
                        alignSide,
                        nudgeX: 4 * multiplier,
                        nudgeY: 4,
                        position: 'under',
                        keepWithinBounds: true,
                    });
                }
            },
            ariaLabel: 'Chart Menu'
        });
    }

    private getMenuItems(chartController: ChartController, areChartToolPanelsEnabled: boolean): (MenuItemDef | string)[] {
        const defaultItems = [
            ...(areChartToolPanelsEnabled ? ['chartEdit'] : []),
            ...(chartController.isEnterprise() ? ['chartAdvancedSettings'] : []),
            chartController.isChartLinked() ? 'chartUnlink' : 'chartLink',
            'chartDownload'
        ];
        const chartMenuItems = this.gos.get('chartMenuItems');
        if (!chartMenuItems) {
            return defaultItems;
        } else if (Array.isArray(chartMenuItems)) {
            return chartMenuItems;
        } else {
            return chartMenuItems(this.gos.addGridCommonParams({
                defaultItems
            }));
        }
    }

    private mapWithStockItems(originalList: (MenuItemDef | string)[], chartMenuContext: ChartMenuContext, showMenu: () => void, eventSource: HTMLElement, areChartToolPanelsEnabled: boolean): MenuItemDef[] {
        if (!originalList) {
            return [];
        }
        const resultList: MenuItemDef[] = [];

        originalList.forEach(menuItemOrString => {
            let result: MenuItemDef | null;
            if (typeof menuItemOrString === 'string') {
                result = this.getStockMenuItem(menuItemOrString, chartMenuContext, showMenu, eventSource, areChartToolPanelsEnabled);
            } else {
                result = { ...menuItemOrString };
            }
            if (!result) { return; }

            const { subMenu } = result;
            if (Array.isArray(subMenu)) {
                result.subMenu = this.mapWithStockItems(subMenu, chartMenuContext, showMenu, eventSource, areChartToolPanelsEnabled);
            }

            resultList.push(result);
        });

        return resultList;
    }

    private getStockMenuItem(key: string, chartMenuContext: ChartMenuContext, showMenu: () => void, eventSource: HTMLElement, areChartToolPanelsEnabled: boolean): MenuItemDef | null {
        switch (key) {
            case 'chartEdit':
                return areChartToolPanelsEnabled ? this.createMenuItem(this.chartTranslationService.translate('chartEdit'), 'chartsMenuEdit', showMenu) : null;
            case 'chartAdvancedSettings':
                return this.createMenuItem(
                    this.chartTranslationService.translate('chartAdvancedSettings'),
                    'chartsMenuAdvancedSettings',
                    () => this.chartMenuService.openAdvancedSettings(chartMenuContext, eventSource)
                );
            case 'chartUnlink':
                return chartMenuContext.chartController.isChartLinked() ? this.createMenuItem(
                    this.chartTranslationService.translate('chartUnlink'),
                    'unlinked',
                    () => this.chartMenuService.toggleLinked(chartMenuContext)
                ) : null;
            case 'chartLink':
                return !chartMenuContext.chartController.isChartLinked() ? this.createMenuItem(
                    this.chartTranslationService.translate('chartLink'),
                    'linked',
                    () => this.chartMenuService.toggleLinked(chartMenuContext)
                ) : null;
            case 'chartDownload':
                return this.createMenuItem(
                    this.chartTranslationService.translate('chartDownload'),
                    'save',
                    () => this.chartMenuService.downloadChart(chartMenuContext)
                );
        }
        return null;
    }

    private createMenuItem(name: string, iconName: string, action: () => void): MenuItemDef {
        return {
            name,
            icon: _.createIconNoSpan(iconName, this.gos, null),
            action
        }
    }

    protected destroy(): void {
        this.destroyBean(this.activeChartMenuList);
        super.destroy();
    }
}

class ChartMenuList extends Component {
    @Autowired('focusService') private readonly focusService: FocusService;

    @RefSelector('eChartsMenu') private readonly eChartsMenu: HTMLElement;

    private hidePopupFunc: () => void;
    private mainMenuList: AgMenuList;

    constructor(private readonly menuItems: (MenuItemDef | string)[]) {
        super(/* html */`
            <div ref="eChartsMenu" role="presentation" class="ag-menu ag-chart-menu-popup"></div>
        `);
    }

    @PostConstruct
    private init(): void {
        this.mainMenuList = this.createManagedBean(new AgMenuList(0));
        this.mainMenuList.addMenuItems(this.menuItems);
        this.mainMenuList.addEventListener(AgMenuItemComponent.EVENT_CLOSE_MENU, this.onHidePopup.bind(this));
        this.eChartsMenu.appendChild(this.mainMenuList.getGui());
    }

    private onHidePopup(): void {
        this.hidePopupFunc?.();
    }

    public afterGuiAttached({ hidePopup }: IAfterGuiAttachedParams): void {
        if (hidePopup) {
            this.hidePopupFunc = hidePopup;
            this.addDestroyFunc(hidePopup);
        }
        this.focusService.focusInto(this.mainMenuList.getGui());
    }
}
