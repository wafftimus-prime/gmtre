import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

export function detectDeviceLayout(bko: BreakpointObserver): Observable<string> {
  return bko.observe([
    Breakpoints.WebPortrait,
    Breakpoints.TabletPortrait,
    Breakpoints.HandsetPortrait,
    Breakpoints.WebLandscape,
    Breakpoints.TabletLandscape,
    Breakpoints.HandsetLandscape,
  ]).pipe(
    map(result => {
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
          return deviceLayoutNameMap.get(query) ?? 'Unknown';
        }
      }
      return 'Unknown';
    })
  );
}
