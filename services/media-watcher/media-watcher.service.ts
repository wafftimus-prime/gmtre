import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { GmtreConfigService } from '../config';
import { fromPairs } from 'lodash-es';
import { map, Observable, ReplaySubject, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GmtreMediaWatcherService {
  private _onMediaChange: ReplaySubject<{
    matchingAliases: string[];
    matchingQueries: any;
  }> = new ReplaySubject<{ matchingAliases: string[]; matchingQueries: any }>(
    1
  );

  /**
   * Constructor
   */
  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _gmtreConfigService: GmtreConfigService
  ) {
    // if (found) {
    //   const matchingAlias = found[0]; // Now it's safe to access the first element

    //   // Add the matching query to the observable values
    //   matchingAliases.push(matchingAlias);
    //   matchingQueries[matchingAlias] = query;
    // }

    this._gmtreConfigService.config$
      .pipe(
        map((config) =>
          fromPairs(
            Object.entries(config.screens).map(([alias, screen]) => [
              alias,
              `(min-width: ${screen})`,
            ])
          )
        ),
        switchMap((screens: any) =>
          this._breakpointObserver.observe(Object.values(screens)).pipe(
            map((state) => {
              // Prepare the observable values and set their defaults
              const matchingAliases: string[] | any = [];
              const matchingQueries: any = {};

              // Get the matching breakpoints and use them to fill the subject
              const matchingBreakpoints: any =
                Object.entries(state.breakpoints).filter(
                  ([query, matches]) => matches
                ) ?? [];
              for (const [query] of matchingBreakpoints) {
                // Use .find() to locate the matching query and alias
                const found: any = Object.entries(screens).find(
                  ([alias, q]) => q === query
                );

                // Find the alias of the matching query
                const matchingAlias: any = found[0];

                // Add the matching query to the observable values
                if (matchingAlias) {
                  matchingAliases.push(matchingAlias);
                  matchingQueries[matchingAlias] = query;
                }
              }

              // Execute the observable
              this._onMediaChange.next({
                matchingAliases,
                matchingQueries,
              });
            })
          )
        )
      )
      .subscribe();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for _onMediaChange
   */
  get onMediaChange$(): Observable<{
    matchingAliases: string[];
    matchingQueries: any;
  }> {
    return this._onMediaChange.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On media query change
   *
   * @param query
   */
  onMediaQueryChange$(query: string | string[]): Observable<BreakpointState> {
    return this._breakpointObserver.observe(query);
  }
}
