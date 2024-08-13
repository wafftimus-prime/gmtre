import { Platform } from '@angular/cdk/platform';
import { Inject, Injectable } from '@angular/core';
import {
  AppUiConfModel,
  ApplicationItem,
  PlatformConfigModel,
  GmtreProviderConfig,
} from '@gmtre-core';
import { merge } from 'lodash-es';
import { BehaviorSubject, Observable } from 'rxjs';
import { GMTRE_PLATFORM_CONFIG } from './platform.constants';

@Injectable({ providedIn: 'root' })
export class GmtrePlatformConfigService {
  private _config: BehaviorSubject<any>;
  private _apps: BehaviorSubject<ApplicationItem[]>;
  private _logo: BehaviorSubject<string | any>;
  private _logo_on_dark: BehaviorSubject<string | any>;
  private _active_app: BehaviorSubject<ApplicationItem | null>;
  private _definitions: BehaviorSubject<PlatformConfigModel>;
  private _ecosystemName: BehaviorSubject<any>;
  private _entrypoint: BehaviorSubject<any>;
  private _ui_config: BehaviorSubject<AppUiConfModel | any>;
  osName = 'os-unknown';

  /**
   * Constructor
   */
  constructor(
    @Inject(GMTRE_PLATFORM_CONFIG) config: GmtreProviderConfig,
    private _platform: Platform
  ) {
    // Private
    this._entrypoint = new BehaviorSubject({});
    this._config = new BehaviorSubject(config);
    this._apps = new BehaviorSubject(config.apps);
    this._logo = new BehaviorSubject(
      config?.platform?.uiconf?.general?.desktop_logo_light
    );
    this._logo_on_dark = new BehaviorSubject(
      config?.platform?.uiconf?.general?.desktop_logo_dark
    );
    this._active_app = new BehaviorSubject(config.active_app);
    this._definitions = new BehaviorSubject(config.platform);
    this._ecosystemName = new BehaviorSubject(
      config?.platform?.metadata?.app_name
    );
    this._ui_config = new BehaviorSubject(config?.platform?.uiconf);

    // If the platform is not a browser, return immediately
    if (!this._platform.isBrowser) {
      return;
    }

    // Windows
    if (navigator.userAgent.includes('Win')) {
      this.osName = 'os-windows';
    }

    // Mac OS
    if (navigator.userAgent.includes('Mac')) {
      this.osName = 'os-mac';
    }

    // Unix
    if (navigator.userAgent.includes('X11')) {
      this.osName = 'os-unix';
    }

    // Linux
    if (navigator.userAgent.includes('Linux')) {
      this.osName = 'os-linux';
    }

    // iOS
    if (this._platform.IOS) {
      this.osName = 'os-ios';
    }

    // Android
    if (this._platform.ANDROID) {
      this.osName = 'os-android';
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for config
   */
  set config(value: any) {
    // Merge the new config over to the current config
    const config = merge({}, this._config.getValue(), value);

    // Execute the observable
    this._config.next(config);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get config$(): Observable<any> {
    return this._config.asObservable();
  }

  /**
   * Setter & getter for entrypoint
   */
  set entrypoint(value: any) {
    // Execute the observable
    this._entrypoint.next(value);
    this
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get entrypoint$(): Observable<any> {
    return this._entrypoint.asObservable();
  }

  get entrypoint_value(): any {
    return this._entrypoint.getValue();
  }

  /**
   * Setter & getter for Plaform Metadata
   */
  set definitions(value: any) {
    // Merge the new config over to the current config
    const definitions = merge({}, this.config.getValue().platform, value);

    // Execute the observable
    this._definitions.next(definitions);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get definitions$(): Observable<any> {
    return this._definitions.asObservable();
  }

  get definitions_value(): PlatformConfigModel {
    return this._definitions.getValue();
  }

  /**
   * Setter & getter for Plaform UI Config
   */
  set ui_config(value: any) {
    // Merge the new config over to the current config
    const ui_config = merge({}, this.config.getValue().platform, value);

    // Execute the observable
    this._ui_config.next(ui_config);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get ui_config$(): Observable<any> {
    return this._ui_config.asObservable();
  }

  /**
   * Setter & getter for Applications
   */
  set apps(value: any) {
    // Merge the new config over to the current config
    const apps = merge({}, this.config.getValue().apps, value);

    // Execute the observable
    this._apps.next(apps);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get apps$(): Observable<any> {
    return this._apps.asObservable();
  }

  /**
   * Setter & getter for Active Application
   */
  set active_app(value: any) {
    // Merge the new config over to the current config
    const active_app = merge(
      {},
      this.config?.getValue().active_app || {},
      value
    );

    // Execute the observable
    this._active_app.next(active_app);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get active_app$(): Observable<any> {
    return this._active_app.asObservable();
  }

  /**
   * Setter & getter for Ecosystem Name
   */
  set ecosystemName(value: any) {
    // Merge the new config over to the current config
    const ecosystemName = merge(
      {},
      this.config.getValue().platform?.metadata?.app_name,
      value
    );

    // Execute the observable
    this._ecosystemName.next(ecosystemName);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get ecosystemName$(): Observable<any> {
    return this._ecosystemName.asObservable();
  }

  /**
   * Setter & getter for Active Logo
   */
  set logo(value: string) {
    // Merge the new config over to the current config
    const logo = merge({}, this.config?.getValue()?.logo, value);

    // Execute the observable
    this._logo?.next(logo.value);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get logo$(): Observable<any> {
    return this._logo.asObservable();
  }

  /**
   * Setter & getter for Logo On Dark
   */
  set logo_on_dark(value: string) {
    // Merge the new config over to the current config
    const logo_on_dark = merge(
      {},
      this.config?.getValue()?.logo_on_dark,
      value
    );

    // Execute the observable
    this._logo_on_dark?.next(logo_on_dark.value);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get logo_on_dark$(): Observable<any> {
    return this._logo_on_dark.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resets the config to the default
   */
  reset(): void {
    // Set the config
    this._config.next(this.config);
  }
}
