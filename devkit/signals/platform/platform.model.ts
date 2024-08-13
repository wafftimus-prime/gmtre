import {
  PlatformConfigModel,
  AppUiConfig,
  ApplicationItem,
} from '@gmtre-core';
import {
  UserModel,
  BaseCollectionModel,
  CreatedOrModifiedModel,
} from '@gmtre-core';
import {
  DeviceLayout,
  DeviceType,
  DrawerModes,
  ScreenSize,
} from './platform.types';

export type PlatformCollection = PlatformStateConfigModel|PlatformStateClientInstanceModel;

export interface PlatformStateClientInstanceModel extends BaseCollectionModel {
  typename: 'platformClientInstance';
  logo?: string;
  logo_on_dark?: string;
  screenWidth?: number;
  screenHeight?: number;
  isDarkMode?: boolean;
  isMobile?: boolean;
  isDesktop?: boolean;
  isTablet?: boolean;
  deviceType?: DeviceType | any;
  deviceLayout?: DeviceLayout | any;
  screenSize?: ScreenSize | any;
  drawerOpened?: boolean;
  drawerMode?: DrawerModes;
  user?: UserModel | any;
}

export interface PlatformStateConfigModel extends BaseCollectionModel {
  typename: 'platformConfig';
  mockApi?: {
    delay?: number;
    services?: any[];
  };
  apps?: ApplicationItem[];
  active_app?: ApplicationItem | null;
  platform?: PlatformConfigModel;
  theme?: AppUiConfig;
}

export interface PlatformActiveAppModel extends BaseCollectionModel {
  typename: 'platformActiveApp';
  active_app: ApplicationItem[];
}

export interface PlatformBaseConfigModel
  extends PlatformConfigModel,
    BaseCollectionModel {
  typename: 'platformBaseConfig';
}

export interface PlatformUiConfigModel
  extends AppUiConfig,
    BaseCollectionModel {
  typename: 'platformUiConfig';
}
