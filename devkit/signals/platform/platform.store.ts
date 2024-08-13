import { BreakpointObserver } from '@angular/cdk/layout';
import { inject } from '@angular/core';
import {
  ApplicationItem
} from '@gmtre-core';
import { withLogger } from '@gmtre-devkit'
import {
  patchState,
  signalStore,
  type,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { setEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { Subject } from 'rxjs';
import { PlatformCollection, PlatformStateConfigModel } from './platform.model';
import {
  createTemplatePlatformClientInstance,
  detectColorScheme,
  detectDeviceLayout,
  detectDeviceType,
  detectScreenDimensions,
  detectScreenSize,
  getDetectedDeviceLayout,
  getDetectedDeviceType,
  getDetectedInitialScreenSize,
} from './platform.utils';

export const PlatformStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity: type<PlatformCollection>(), collection: 'platform' }),
  withMethods((store: any) => {
    const breakpointObserver = inject(BreakpointObserver);
    const destroyed$ = new Subject<void>();

    return {
      getPlatformSupportConfig() { return this.getPlatformConfig()?.platform?.support },
      getPlatformClientInstance() { return store.platformEntityMap()?.platformClientInstance },
      getClientIsSystemColorDark() { return this.getPlatformClientInstance().isDarkMode },
      getClientIsMobile() { return this.getPlatformClientInstance().isMobile },
      getClientIsDesktop() { return this.getPlatformClientInstance().isDesktop },
      getClientIsTablet() { return this.getPlatformClientInstance().isTablet },
      getClientDeviceLayout() { return this.getPlatformClientInstance().deviceLayout },
      getClientDeviceType() { return this.getPlatformClientInstance().deviceType },
      getClientScreenSize() { return this.getPlatformClientInstance().screenSize },
      getClientScreenWidth() { return this.getPlatformClientInstance().screenWidth },
      getClientScreenHeight() { return this.getPlatformClientInstance().screenHeight },

      getPlatformConfig() {
        return store.platformEntityMap()?.platformConfig;
      },
      getPlatformTheme() {
        return this.getPlatformConfig()?.theme;
      },
      getActiveApp() {
        return this.getPlatformConfig()?.active_app;
      },
      getPlatformApps() {
        return this.getPlatformConfig()?.apps;
      },
      getPlatformResources() {
        return this.getPlatformConfig()?.platform
          ?.resources;
      },
      getPlatformMedatadata() {
        return this.getPlatformConfig()?.platform?.metadata;
      },

      getUIConfig() {
        return this.getPlatformConfig()?.platform?.uiconf;
      },

      getAuthConfig(){
        return this.getUIConfig()?.auth || null
      },

      getAuthLayout(){
        return this.getAuthConfig().layout || null
      },

      getAppLogos(){
        return this.getAuthConfig().logos || null
      },

      async updatePlatformState(changes: any) {
        patchState(
          store,
          updateEntity(
            { id: 'platformConfig', changes },
            { collection: 'platform' }
          )
        );
      },
      async loadClientInstance() {
        patchState(
          store,
          setEntity(
            {
              ...createTemplatePlatformClientInstance(),
              ...(await getDetectedInitialScreenSize(
                breakpointObserver,
                destroyed$
              )),
              ...(await getDetectedDeviceType(
                breakpointObserver,
                destroyed$
              )),
              deviceLayout: await getDetectedDeviceLayout(
                breakpointObserver,
                destroyed$
              ),
              isDarkMode: window.matchMedia('(prefers-color-scheme: dark)')?.matches,
              screenWidth: window.innerWidth,
              screenHeight: window.innerHeight
            },
            { idKey: 'typename', collection: 'platform' }
          )
        );
      },
      async setActiveApp(active_app: ApplicationItem) {
        patchState(
          store,
          updateEntity(
            { id: 'platformConfig', changes:{active_app} },
            { collection: 'platform' }
          )
        );
      },
      async loadPlatformState(config: PlatformStateConfigModel) {
        this.loadClientInstance();
        patchState(
          store,
          setEntity(config, { idKey: 'typename', collection: 'platform' })
        );
      },
    };
  }),
  withHooks((store) => {
    const breakpointObserver = inject(BreakpointObserver);
    const destroyed$ = new Subject<void>();
    let removeColorSchemeListener: () => void;
    let removeScreenDimensionsListener: () => void;
    return {
      onInit() {
        detectScreenSize(breakpointObserver, destroyed$, store);
        detectDeviceType(breakpointObserver, destroyed$, store);
        detectDeviceLayout(breakpointObserver, destroyed$, store);
        removeColorSchemeListener = detectColorScheme(store);
        removeScreenDimensionsListener = detectScreenDimensions(store)
      },
      onDestroy() {
        destroyed$.next();
        destroyed$.complete();
        removeColorSchemeListener();
      },
    };
  }),
  withLogger('platform', false)
);
