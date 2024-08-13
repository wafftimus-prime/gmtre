import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { patchState } from '@ngrx/signals';
import { updateEntity } from '@ngrx/signals/entities';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import {
  PlatformStateClientInstanceModel,
  PlatformStateConfigModel,
} from './platform.model';

/**
 * Creates a template platform configuration.
 *
 * @param {PlatformStateConfigModel} config - The platform state configuration model.
 * @returns {PlatformStateConfigModel} - The template platform configuration.
 */
export function createTemplatePlatformConfig(): PlatformStateConfigModel {
  return {
    typename: 'platformConfig',
    mockApi: {
      delay: undefined,
      services: [],
    },
    apps: [],
    active_app: {},
    platform: {
      support: { debugger: false },
    },
    theme: {},
  };
}

/**
 * Creates a template platform client configuration.
 *
 * @returns {PlatformStateClientInstanceModel} - The template platform configuration.
 */
export function createTemplatePlatformClientInstance(): PlatformStateClientInstanceModel {
  return {
    typename: 'platformClientInstance',
    screenSize: null,
    drawerMode: 'over',
    drawerOpened: false,
    deviceType: null,
    deviceLayout: null,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  };
}

export function detectScreenSize(
  bko: BreakpointObserver,
  destroyed$: Subject<void>,
  store: any
) {
  const screenSizeMap = new Map([
    [Breakpoints.XSmall, 'xsmall'],
    [Breakpoints.Small, 'small'],
    [Breakpoints.Medium, 'medium'],
    [Breakpoints.Large, 'large'],
    [Breakpoints.XLarge, 'xlarge'],
  ]);

  bko
    .observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
    .pipe(takeUntil(destroyed$))
    .subscribe((result) => {
      let screenSize = 'Unknown';
      let drawerMode = 'side';
      let drawerOpened = true;
      let isMobile = false;
      let isTablet = false;
      let isDesktop = false;

      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          screenSize = screenSizeMap.get(query) ?? 'Unknown';

          if (['xsmall', 'small', 'medium'].includes(screenSize)) {
            drawerMode = 'over';
            drawerOpened = false;
            isMobile = true;
            isTablet = false;
            isDesktop = false;
          } else {
            drawerMode = 'side';
            drawerOpened = true;
            isMobile = false;
            isTablet = false;
            isDesktop = true;
          }
          break; // Break the loop once the matching breakpoint is found
        }
      }
      const changes = {
        screenSize,
        drawerMode,
        drawerOpened,
        isMobile,
        isTablet,
        isDesktop,
      };
      patchState(
        store,
        updateEntity(
          { id: 'platformClientInstance', changes },
          { collection: 'platform' }
        )
      );
    });
}

export function detectDeviceType(
  bko: BreakpointObserver,
  destroyed$: Subject<void>,
  store: any
) {
  bko
    .observe([Breakpoints.Web, Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(takeUntil(destroyed$))
    .subscribe((result) => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          const deviceTypeNameMap = new Map([
            [Breakpoints.Handset, 'handset'],
            [Breakpoints.HandsetPortrait, 'handset'],
            [Breakpoints.HandsetLandscape, 'handset'],
            [Breakpoints.Tablet, 'tablet'],
            [Breakpoints.TabletLandscape, 'tablet'],
            [Breakpoints.TabletPortrait, 'tablet'],
            [Breakpoints.Web, 'web'],
            [Breakpoints.WebLandscape, 'web'],
            [Breakpoints.WebPortrait, 'web'],
          ]);
          const deviceType = deviceTypeNameMap.get(query) ?? 'Unknown';
          const isMobile = deviceType === 'handset';
          const isTablet = deviceType === 'tablet';
          const isDesktop = deviceType === 'web';
          const changes = { deviceType, isMobile, isTablet, isDesktop };
          patchState(
            store,
            updateEntity(
              { id: 'platformClientInstance', changes },
              { collection: 'platform' }
            )
          );
        }
      }
    });
}

export function detectDeviceLayout(
  bko: BreakpointObserver,
  destroyed$: Subject<void>,
  store: any
) {
  bko
    .observe([
      Breakpoints.WebPortrait,
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetPortrait,
      Breakpoints.WebLandscape,
      Breakpoints.TabletLandscape,
      Breakpoints.HandsetLandscape,
    ])
    .pipe(takeUntil(destroyed$))
    .subscribe((result) => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          const deviceLayoutNameMap = new Map([
            [Breakpoints.HandsetPortrait, 'portrait'],
            [Breakpoints.HandsetLandscape, 'landscape'],
            [Breakpoints.TabletLandscape, 'landscape'],
            [Breakpoints.TabletPortrait, 'portrait'],
            [Breakpoints.WebLandscape, 'landscape'],
            [Breakpoints.WebPortrait, 'portrait'],
          ]);
          const deviceLayout = deviceLayoutNameMap.get(query) ?? 'Unknown';
          const changes = { deviceLayout };

          patchState(
            store,
            updateEntity(
              { id: 'platformClientInstance', changes },
              { collection: 'platform' }
            )
          );
        }
      }
    });
}

export async function getDetectedInitialScreenSize(
  bko: BreakpointObserver,
  destroyed$: Subject<void>
): Promise<{
  screenSize: string;
  drawerMode: string;
  drawerOpened: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}> {
  const screenSizeMap = new Map([
    [Breakpoints.XSmall, 'xsmall'],
    [Breakpoints.Small, 'small'],
    [Breakpoints.Medium, 'medium'],
    [Breakpoints.Large, 'large'],
    [Breakpoints.XLarge, 'xlarge'],
  ]);

  try {
    const result = await firstValueFrom(
      bko
        .observe([
          Breakpoints.XSmall,
          Breakpoints.Small,
          Breakpoints.Medium,
          Breakpoints.Large,
          Breakpoints.XLarge,
        ])
        .pipe(takeUntil(destroyed$))
    );

    let screenSize = 'Unknown';
    let drawerMode = 'side';
    let drawerOpened = true;
    let isMobile = false;
    let isTablet = false;
    let isDesktop = false;

    for (const query of Object.keys(result.breakpoints)) {
      if (result.breakpoints[query]) {
        screenSize = screenSizeMap.get(query) ?? 'Unknown';

        if (['xsmall', 'small', 'medium'].includes(screenSize)) {
          drawerMode = 'over';
          drawerOpened = false;
          isMobile = true;
          isTablet = false;
          isDesktop = false;
        } else if (screenSize === 'large') {
          drawerMode = 'side';
          drawerOpened = true;
          isMobile = false;
          isTablet = true;
          isDesktop = false;
        } else {
          drawerMode = 'side';
          drawerOpened = true;
          isMobile = false;
          isTablet = false;
          isDesktop = true;
        }
        break; // Break the loop once the matching breakpoint is found
      }
    }

    return {
      screenSize,
      drawerMode,
      drawerOpened,
      isMobile,
      isTablet,
      isDesktop,
    };
  } catch (error) {
    console.error('Error detecting screen size:', error);
    return {
      screenSize: 'Unknown',
      drawerMode: 'side',
      drawerOpened: true,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  }
}

export async function getDetectedDeviceType(
  bko: BreakpointObserver,
  destroyed$: Subject<void>
): Promise<any> {
  const deviceTypeNameMap = new Map([
    [Breakpoints.Handset, 'handset'],
    [Breakpoints.HandsetPortrait, 'handset'],
    [Breakpoints.HandsetLandscape, 'handset'],
    [Breakpoints.Tablet, 'tablet'],
    [Breakpoints.TabletLandscape, 'tablet'],
    [Breakpoints.TabletPortrait, 'tablet'],
    [Breakpoints.Web, 'web'],
    [Breakpoints.WebLandscape, 'web'],
    [Breakpoints.WebPortrait, 'web'],
  ]);

  try {
    const result = await firstValueFrom(
      bko
        .observe([Breakpoints.Web, Breakpoints.Handset, Breakpoints.Tablet])
        .pipe(takeUntil(destroyed$))
    );

    for (const query of Object.keys(result.breakpoints)) {
      if (result.breakpoints[query]) {
        const deviceType = deviceTypeNameMap.get(query) ?? 'Unknown';
        const isMobile = deviceType === 'handset';
        const isTablet = deviceType === 'tablet';
        const isDesktop = deviceType === 'web';
        return { deviceType, isMobile, isTablet, isDesktop };
      }
    }
  } catch (error) {
    console.error('Error detecting device type:', error);
  }
}

export async function getDetectedDeviceLayout(
  bko: BreakpointObserver,
  destroyed$: Subject<void>
): Promise<any> {
  const deviceLayoutNameMap = new Map([
    [Breakpoints.HandsetPortrait, 'portrait'],
    [Breakpoints.HandsetLandscape, 'landscape'],
    [Breakpoints.TabletLandscape, 'landscape'],
    [Breakpoints.TabletPortrait, 'portrait'],
    [Breakpoints.WebLandscape, 'landscape'],
    [Breakpoints.WebPortrait, 'portrait'],
  ]);

  try {
    const result = await firstValueFrom(
      bko
        .observe([
          Breakpoints.WebPortrait,
          Breakpoints.TabletPortrait,
          Breakpoints.HandsetPortrait,
          Breakpoints.WebLandscape,
          Breakpoints.TabletLandscape,
          Breakpoints.HandsetLandscape,
        ])
        .pipe(takeUntil(destroyed$))
    );

    for (const query of Object.keys(result.breakpoints)) {
      if (result.breakpoints[query]) {
        return deviceLayoutNameMap.get(query) ?? 'Unknown';
      }
    }
  } catch (error) {
    console.error('Error detecting device layout:', error);
    return 'Unknown';
  }
}

export function detectColorScheme(store: any) {
  const mediaQuery = window?.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (event: MediaQueryListEvent) => {
    const isDarkMode = event.matches;
    patchState(
      store,
      updateEntity(
        { id: 'platformClientInstance', changes: { isDarkMode } },
        { collection: 'platform' }
      )
    );
  };

  mediaQuery.addEventListener('change', handleChange);

  // Initial setting
  const isDarkMode = mediaQuery.matches;
  patchState(
    store,
    updateEntity(
      { id: 'platformClientInstance', changes: { isDarkMode } },
      { collection: 'platform' }
    )
  );

  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

export function detectScreenDimensions(store: any) {
  const handleResize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    patchState(
      store,
      updateEntity(
        {
          id: 'platformClientInstance',
          changes: { screenWidth, screenHeight },
        },
        { collection: 'platform' }
      )
    );
  };

  window.addEventListener('resize', handleResize);

  // Initial setting
  handleResize();

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}
