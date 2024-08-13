import { inject } from '@angular/core';
import { GmtreNavigationService } from '@gmtre-core';
import {
  ConfigureApplication,
  GmtreConfigService
} from '@gmtre-services';

export const backendResolver = (args: any) => {
  const _gmtreConfigService = inject(GmtreConfigService);
  const _navigationService = inject(GmtreNavigationService);

  if (args?.data?.config) {
    ConfigureApplication(
      args?.data?.config,
      _navigationService,
      _gmtreConfigService,
    );
  }

  return true;
};
