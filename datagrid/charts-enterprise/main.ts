import {LicenseManager, ILicenseManager} from "@gmtre-datagrid/core";
import {AgCharts} from "ag-charts-enterprise";

AgCharts.setGridContext(true);

LicenseManager.setChartsLicenseManager(AgCharts as ILicenseManager)

import "ag-charts-enterprise";

export  * from "@gmtre-datagrid/charts";
