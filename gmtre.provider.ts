import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ENVIRONMENT_INITIALIZER,
  EnvironmentProviders,
  Provider,
  importProvidersFrom,
  inject,
} from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { GmtreProviderConfig } from '@datahaven-labs/gmtre-core';
import {
  GMTRE_MOCK_API_DEFAULT_DELAY,
  GMTRE_PLATFORM_CONFIG,
  GmtrePlatformConfigService,
  mockApiInterceptor,
} from '@datahaven-labs/gmtre-devkit';
import { GMTRE_CONFIG } from './services/config/config.constants';
import { GmtreConfirmationService } from './services/confirmation';
import { GmtreLoadingService, gmtreLoadingInterceptor } from './services/loading';
import { GmtreMediaWatcherService } from './services/media-watcher';
import { GmtreSplashScreenService } from './services/splash-screen';
import { GmtreUtilsService } from './services/utils';

/**
 * Gmtre provider
 */
export const provideGmtre = (
  config: GmtreProviderConfig
): Array<Provider | EnvironmentProviders> => {
  // Base providers
  const providers: Array<Provider | EnvironmentProviders> = [
    {
      // Disable 'theme' sanity check
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true,
      },
    },
    {
      // Use the 'fill' appearance on Angular Material form fields by default
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
    {
      provide: GMTRE_MOCK_API_DEFAULT_DELAY,
      useValue: config?.mockApi?.delay ?? 0,
    },
    {
      provide: GMTRE_PLATFORM_CONFIG,
      useValue: config ?? {},
    },
    {
      provide: GMTRE_CONFIG,
      useValue: config?.gmtre ?? {},
    },

    importProvidersFrom(MatDialogModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(GmtreConfirmationService),
      multi: true,
    },

    provideHttpClient(withInterceptors([gmtreLoadingInterceptor])),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(GmtreLoadingService),
      multi: true,
    },

    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(GmtreMediaWatcherService),
      multi: true,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(GmtrePlatformConfigService),
      multi: true,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(GmtreSplashScreenService),
      multi: true,
    },
    {
      provide: ENVIRONMENT_INITIALIZER,
      useValue: () => inject(GmtreUtilsService),
      multi: true,
    },
  ];

  // Mock Api services
  if (config?.mockApi?.services) {
    providers.push(provideHttpClient(withInterceptors([mockApiInterceptor])), {
      provide: APP_INITIALIZER,
      deps: [...config.mockApi.services],
      useFactory: () => (): any => null,
      multi: true,
    });
  }

  // Return the providers
  return providers;
};
