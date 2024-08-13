import { inject } from '@angular/core';
import { Subject } from 'rxjs';
import {
  PlatformStore,
  SupportStore,
  UserService,
  UserStore,
} from '../signals';
import { BaseFunctionsClass } from './base-functions';

export class UiKitBaseClass extends BaseFunctionsClass {
  _supportStore = inject(SupportStore);
  _platformStore = inject(PlatformStore);
  _userStore = inject(UserStore);
  _userService = inject(UserService);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  _unsubscribeAll: Subject<any> = new Subject<any>();

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Support Signal Store Accessors
  // -----------------------------------------------------------------------------------------------------
  get support_device_environment_info() {
    return this._supportStore.getDeviceEnvironmentInfoData();
  }

  get support_session_info() {
    return this._supportStore.getSessionInfoData();
  }
  
  get support_session_permissions_info() {
    return this._supportStore.getSessionPermissionsData();
  }

  get support_error_info() {
    return this._supportStore.getErrorInfoData();
  }

  get support_network_info() {
    return this._supportStore.getNetworkInfoData();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ User Signal Store Accessors
  // -----------------------------------------------------------------------------------------------------

  get user() {
    return this._userStore.getUserProfile();
  }

  get session() {
    return this._userStore.getUserMaster()?.session;
  }

  get userId() {
    return this.user.sub;
  }

  
  // -----------------------------------------------------------------------------------------------------
  // @ Platform Signal Store Accessors
  // -----------------------------------------------------------------------------------------------------
  get is_debugger_active(){
    return this._platformStore.getPlatformSupportConfig().debugger
  }
  
  get logo() {
    return this._platformStore.getAppLogos();
  }

  get authLayout() {
    return this._platformStore.getAuthLayout();
  }

  get authConfig() {
    return this._platformStore.getAuthConfig();
  }

  get metadata() {
    return this._platformStore.getPlatformMedatadata();
  }

  get apps() {
    return this._platformStore.getPlatformApps();
  }

  get platformConfig() {
    return this._platformStore.getPlatformConfig();
  }

  get activeApp() {
    return this._platformStore.getActiveApp();
  }

  get deviceType() {
    return this._platformStore.getClientDeviceType();
  }

  get screenSize() {
    return this._platformStore.getClientScreenSize();
  }

  get screenHeight() {
    return this._platformStore.getClientScreenHeight();
  }

  get screenWidth() {
    return this._platformStore.getClientScreenWidth();
  }

  get deviceLayout() {
    return this._platformStore.getClientDeviceLayout();
  }

  get isMobile(): boolean {
    return this._platformStore.getClientIsMobile();
  }

  get isDark() {
    return this._platformStore.getClientIsSystemColorDark();
  }

  get isTablet() {
    return this._platformStore.getClientIsTablet();
  }

  get isDesktop() {
    return this._platformStore.getClientIsDesktop();
  }

  get platforResources() {
    return this.platformConfig.platform.resources;
  }
}
