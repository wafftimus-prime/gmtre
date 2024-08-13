import { inject } from '@angular/core';
import { ApplicationItem } from '@gmtre-core';
import { PlatformStore } from '@gmtre-devkit';

export function ConfigureApplication(
  config: ApplicationItem,
  navigationService: any,
  configService: any
) {
  const ps = inject(PlatformStore);
  ps.setActiveApp(config);
  setNavigation(config, navigationService);
  setLayout(config, configService);
  setScheme(config, configService);
}

function setScheme(config: ApplicationItem, configService: any): any {
  configService.config = {
    scheme: config.theme.scheme,
  };
}

function setLayout(config: ApplicationItem, configService: any): any {
  configService.config = {
    layout: config.theme.layout,
  };
}

function setNavigation(config: ApplicationItem, navigationService: any): any {
  navigationService.registerEntireNavigation(config.navigation_items);
  // console.log("FIND ME",config, navigationService)
  // const navComponent: any = navigationService.getComponent('mainNavigation');
  // console.log(navComponent)

  // // Return if the navigation component does not exist
  // if (!navComponent) return null;

  // if (
  //   [
  //     'centered',
  //     'enterprise',
  //     'material',
  //     'modern',
  //     'classic',
  //     'classy',
  //     'dense',
  //   ].includes(config?.theme.layout)
  // ) {
  //   navComponent.navigation = config.navigation_items?.default;
  // }

  // if (['compact', 'thin'].includes(config?.theme.layout)) {
  //   navComponent.navigation = config.navigation_items?.compact;
  // }

  // if (['futuristic'].includes(config?.theme.layout)) {
  //   navComponent.navigation = config.navigation_items?.futuristic;
  // }

  // // Replace the navigation data
  // navComponent.refresh();
}
