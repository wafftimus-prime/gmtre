import { Bean, BeanStub, ISideBar, ISideBarService } from "@gmtre-datagrid/core";

@Bean('sideBarService')
export class SideBarService extends BeanStub implements ISideBarService {
    private sideBarComp: ISideBar;

    public registerSideBarComp(sideBarComp: ISideBar): void {
        this.sideBarComp = sideBarComp;
    }

    public getSideBarComp(): ISideBar {
        return this.sideBarComp;
    }
}
