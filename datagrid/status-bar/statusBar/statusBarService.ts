import { Bean, BeanStub, IStatusPanelComp, IStatusBarService } from '@gmtre-datagrid/core';

@Bean('statusBarService')
export class StatusBarService extends BeanStub implements IStatusBarService {

    private allComponents: Map<string, IStatusPanelComp> = new Map();

    // tslint:disable-next-line
    constructor() {
        super();
    }

    public registerStatusPanel(key: string, component: IStatusPanelComp): void {
        this.allComponents.set(key, component);
    }

    public unregisterStatusPanel(key: string): void {
        this.allComponents.delete(key);
    }

    public unregisterAllComponents(): void {
        this.allComponents.clear();
    }

    public getStatusPanel(key: string): IStatusPanelComp {
        return this.allComponents.get(key)!;
    }

    protected destroy(): void {
        this.unregisterAllComponents();
        super.destroy();
    }
}
