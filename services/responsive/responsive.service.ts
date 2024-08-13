import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import {
  AppUiConfModel,
  ApplicationItem,
  PlatformConfigModel,
  GmtreProviderConfig,
} from '@gmtre-core';
import { GmtrePlatformConfigService } from '@gmtre-devkit';
import { UserModel } from '@gmtre-models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type DeviceType = string | 'handset' | 'tablet' | 'web';
type DeviceLayout = string | 'landscape' | 'portrait' | 'web';
type ScreenSize = string | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  // const platform = inject(PlatformStore);
  apps$: Observable<ApplicationItem[]>;
  logo$: Observable<string>;
  active_app$: Observable<ApplicationItem>;
  logo_on_dark$: Observable<string>;
  config$: Observable<GmtreProviderConfig>;
  client$: Observable<string>;
  platform$: Observable<PlatformConfigModel>;
  uiConf$: Observable<AppUiConfModel>;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  destroyed = new Subject<void>();
  _unsubscribeAll: Subject<any> = new Subject<any>();
  public drawerMode: 'over' | 'side' = 'side';
  public drawerOpened = true;
  public _user: UserModel | any;
  public screenSize: ScreenSize | any;
  public deviceType: DeviceType | any;
  public deviceLayout: DeviceLayout | any;
  private mobileTypes = ['handset', 'tablet'];

  constructor(bko: BreakpointObserver, config: GmtrePlatformConfigService) {
    this.logo$ = config.logo$;
    this.logo_on_dark$ = config.logo_on_dark$;
    this.config$ = config.config$;
    this.active_app$ = config.active_app$;
    this.apps$ = config.apps$;
    this.client$ = config.ecosystemName$;
    this.platform$ = config.definitions$;
    this.uiConf$ = config.ui_config$;
    this.detectScreenSize(bko);
    this.detectDeviceLayout(bko);
    this.detectDeviceType(bko);
  }

  private detectScreenSize(bko: BreakpointObserver) {
    bko
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const screenSizeNameMap = new Map([
              [Breakpoints.XSmall, 'xsmall'],
              [Breakpoints.Small, 'small'],
              [Breakpoints.Medium, 'medium'],
              [Breakpoints.Large, 'large'],
              [Breakpoints.XLarge, 'xlarge'],
            ]);
            this.screenSize = screenSizeNameMap.get(query) ?? 'Unknown';

            if (['xsmall', 'small', 'medium'].includes(this.screenSize)) {
              this.drawerMode = 'over';
              this.drawerOpened = false;
            } else {
              this.drawerMode = 'side';
              this.drawerOpened = true;
            }
          }
        }
      });
  }

  isSmall(): boolean {
    return ['xsmall', 'small'].includes(this.screenSize);
  }

  isMobile(): boolean {
    return this.mobileTypes.includes(this.deviceType);
  }

  isDesktop(): boolean {
    const desktopTypes = ['web'];
    return desktopTypes.includes(this.deviceType);
  }

  private detectDeviceType(bko: BreakpointObserver) {
    bko
      .observe([Breakpoints.Web, Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const deviceTypeNameMap = new Map([
              [Breakpoints.Handset, 'handset'],
              [Breakpoints.HandsetPortrait, 'handset'],
              [Breakpoints.HandsetLandscape, 'handset'],
              [Breakpoints.Tablet, 'tablet'],
              [Breakpoints.TabletLandscape, 'tablet'],
              [Breakpoints.TabletPortrait, 'tablet'],
              [Breakpoints.Web, 'web'],
              [Breakpoints.WebLandscape, 'web'],
              [Breakpoints.WebPortrait, 'web'],
            ]);
            this.deviceType = deviceTypeNameMap.get(query) ?? 'Unknown';
            // this.platform.setDeviceType(this.deviceType)
          }
        }
      });
  }

  private detectDeviceLayout(bko: BreakpointObserver) {
    return bko
      .observe([
        Breakpoints.WebPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetPortrait,
        Breakpoints.WebLandscape,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetLandscape,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const deviceLayoutNameMap = new Map([
              [Breakpoints.HandsetPortrait, 'portrait'],
              [Breakpoints.HandsetLandscape, 'landscape'],
              [Breakpoints.TabletLandscape, 'landscape'],
              [Breakpoints.TabletPortrait, 'portrait'],
              [Breakpoints.WebLandscape, 'landscape'],
              [Breakpoints.WebPortrait, 'portrait'],
            ]);
            this.deviceLayout = deviceLayoutNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }
}
