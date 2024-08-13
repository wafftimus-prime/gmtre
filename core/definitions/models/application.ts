import { AppFeatures } from '../types/application';
import { Navigation } from './navigation';
import { AppUiConfig } from './platform';

export interface ApplicationItem {
  id?: string;
  app_id?: string;
  visible?: boolean;
  app_name?: string;
  description?: string;
  navigation_items?: Navigation;
  quicklinks?: Array<AppQuickLink>;
  version?: string;
  base_path?: Array<string>;
  show_footer_icon?: boolean;
  app_icon?: IconModel;
  is_default?: boolean;
  shortcut?: boolean;
  is_administrative?: boolean;
  requires_license?: boolean;
  requires_login?: boolean;
  disabled?: boolean;
  command?: ($event: any) => any;
  permissions?: Array<string>;
  theme?: AppUiConfig;
}

export interface AppQuickLink {
  label?: string;
  path?: string;
  show_badge?: boolean;
  badge_color?: string;
  badge_value?: string;
  disabled?: boolean;
}

export interface AppFeature {
  id?: string;
  label?: string;
  icon?: IconModel;
  rootPath?: string;
  routes?: AppFeatures;
  description?: string;
  expanded?: boolean;
  active?: boolean;
  tags?: string;
  disabled?: boolean;
  visible?: boolean;
  permissions?: string[];
}

export interface IconModel {
  method?: 'url'|'selector';
  type?: 'svg' | any;
  path?: string;
  name?: string|any;
  size?: string;
  cssClass?: string;
}
