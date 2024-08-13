import {
    IsActiveMatchOptions,
    Params,
    QueryParamsHandling,
  } from '@angular/router';
import { GmtreNavigationItemType } from '../types/navigation';

  export interface Navigation {
    compact: GmtreNavigationItem[];
    default: GmtreNavigationItem[];
    futuristic: GmtreNavigationItem[];
    horizontal: GmtreNavigationItem[];
  }

  export interface GmtreNavigationItem {
    id?: string;
    title?: string;
    subtitle?: string;
    type: GmtreNavigationItemType
    hidden?: (item: GmtreNavigationItem) => boolean;
    active?: boolean;
    disabled?: boolean;
    tooltip?: string;
    link?: string;
    fragment?: string;
    preserveFragment?: boolean;
    queryParams?: Params | null;
    queryParamsHandling?: QueryParamsHandling | null;
    externalLink?: boolean;
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    exactMatch?: boolean;
    isActiveMatchOptions?: IsActiveMatchOptions;
    function?: (item: GmtreNavigationItem) => void;
    classes?: {
      title?: string;
      subtitle?: string;
      icon?: string;
      wrapper?: string;
    };
    icon?: string;
    badge?: {
      title?: string;
      classes?: string;
    };
    children?: GmtreNavigationItem[];
    meta?: any;
  }
