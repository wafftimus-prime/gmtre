import { ActivatedRoute, Router } from '@angular/router';

export function updateBrowserUrl(
  queryParams: any,
  router: Router,
  route?: ActivatedRoute
) {
  router.navigate([], {
    relativeTo: route,
    queryParams,
    queryParamsHandling: 'merge', // retain existing query params or use 'replace' to replace all params
    skipLocationChange: false, // do not skip location change
    replaceUrl: true, // update the url without adding a history entry
  });
}
