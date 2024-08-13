export interface NavigationMenuItem {
    id: string;
    title: string;
    route?: {
      path?: string;
      exact?: boolean;
      queryParams?: { [key: string]: string };
    };
    desktop?: boolean;
    mobile?: boolean;
    showTitle?: boolean;
    class?: string;
    icon?: {
      type: 'url' | 'named';
      name?: string;
      url?: string;
      color?: string;
      class?: string;
    };
    type: 'group' | 'link' | 'separator';
    children?: NavigationMenuItem[];
    disabled?: boolean;
    function?: (item: NavigationMenuItem) => void;
  }
  