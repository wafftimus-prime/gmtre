import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { map, catchError, of, BehaviorSubject, combineLatest } from 'rxjs';
import {
  IStripeCheckOutRequest,
  IStripeCreateCustomerRequest,
  IStripeCustomerPortalSessionRequest,
} from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class StripeApiService {
  private apiURL = 'https://api.stripe.com/v1/';
  private authType = 'Bearer Token';
  private apiSecret$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  defaultProductId = 'prod_Lmtuh6vCImohMG';

  constructor(private http: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Setter for the API Secret
   *
   * @param value
   */
  set apiSecret(value: string) {
    this.apiSecret$.next(value);
  }

  createCustomer(params: IStripeCreateCustomerRequest) {
    const resource = `customers?`;
    let urlParams = `email=${params.email}`;
    urlParams += `&name=${params.name}`;
    const requestUrl = `${this.apiURL}${resource}${urlParams}`;
    return this.http
      .post(requestUrl, null, {
        headers: this.getAuthHeader(this.apiSecret$.value),
      })
      .pipe(
        map((customer) => {
          return { success: true, context: customer };
        }),
        catchError((err) => {
          return of({ success: false, context: err });
        })
      );
  }

  getCustomer(CustomerId: string) {
    const resource = `customers/${CustomerId}`;
    const requestUrl = `${this.apiURL}${resource}`;
    return this.http
      .get(requestUrl, {
        headers: this.getAuthHeader(this.apiSecret$.value),
      })
      .pipe(
        map((customer) => {
          return { success: true, context: customer };
        }),
        catchError((err) => {
          return of({ success: false, context: err });
        })
      );
  }

  getCustomerSubscriptions(CustomerId: string) {
    const resource = `customers/${CustomerId}/subscriptions`;
    const requestUrl = `${this.apiURL}${resource}`;
    return this.http
      .get(requestUrl, {
        headers: this.getAuthHeader(this.apiSecret$.value),
      })
      .pipe(
        map((subscriptions) => {
          return { success: true, context: subscriptions };
        }),
        catchError((err) => {
          return of({ success: false, context: err });
        })
      );
  }

  getCustomerPortalSession(params: IStripeCustomerPortalSessionRequest) {
    const resource = `billing_portal/sessions?`;
    let urlParams = `customer=${params?.CustomerId}`;
    urlParams += `&return_url=${params.ReturnUrl}`;
    const requestUrl = `${this.apiURL}${resource}${urlParams}`;
    return this.http
      .post(requestUrl, null, {
        headers: this.getAuthHeader(this.apiSecret$.value),
      })
      .pipe(
        map((session) => {
          return { success: true, context: session };
        }),
        catchError((err) => {
          return of({ success: false, context: err });
        })
      );
  }

  getCardLinkPlanPrice(PriceId: string) {
    const resource = `prices/${PriceId}`;
    const requestUrl = `${this.apiURL}${resource}`;
    return this.http
      .get(requestUrl, {
        headers: this.getAuthHeader(this.apiSecret$.value),
      })
      .pipe(
        map((price) => {
          return { success: true, context: price };
        }),
        catchError((err) => {
          return of({ success: false, context: err });
        })
      );
  }

  // getCardLinkCustomerPortalUrl(){
  // }
  getCardLinkCheckoutUrl(params: IStripeCheckOutRequest) {
    const resource = `checkout/sessions?`;
    let urlParams = `customer=${params?.CustomerId}`;
    urlParams += `&mode=${params.Mode}`;
    urlParams += `&allow_promotion_codes=${params.AllowPromoCodes}`;
    urlParams += `&client_reference_id=${params.AccountId}`;
    urlParams += `&cancel_url=${params.CancelUrl}`;
    urlParams += `&success_url=${params.SuccessUrl}`;
    if (params.Trial?.Allowed)
      urlParams += `&subscription_data[trial_period_days]=${params?.Trial?.TrialPeriodDays}`;

    params?.LineItems.forEach((line, index) => {
      urlParams += `&line_items[${index}][quantity]=${line.Quantity}`;
      urlParams += `&line_items[${index}][price]=${line.PriceId}`;
    });

    const requestUrl = `${this.apiURL}${resource}${urlParams}`;
    console.log(requestUrl);
    return this.http
      .post(requestUrl, null, {
        headers: this.getAuthHeader(this.apiSecret$.value),
      })
      .pipe(
        map((account) => {
          return { success: true, context: account };
        }),
        catchError((err) => {
          return of({ success: false, context: err });
        })
      );
  }

  getCardLinkProduct(latest: boolean) {
    const resource = 'products?';
    const urlParams = `active=${latest}`;
    const requestUrl = `${this.apiURL}${resource}${urlParams}`;
    return this.http
      .get(requestUrl, {
        headers: this.getAuthHeader(this.apiSecret$.value),
      })
      .pipe(
        map((account) => {
          return { success: true, context: account };
        }),
        catchError((err) => {
          return of({ success: false, context: err });
        })
      );
  }

  getActiveCardLinkPrices(
    activeProductId: string,
    recurring: 'month' | 'year'
  ) {
    const resource = 'prices?';
    const urlParams = `active=true&product=${activeProductId}&recurring[interval]=${recurring}`;
    const requestUrl = `${this.apiURL}${resource}${urlParams}`;
    return this.http
      .get(requestUrl, { headers: this.getAuthHeader(this.apiSecret$.value) })
      .pipe(
        map((account) => {
          return { success: true, context: account };
        }),
        catchError((err) => {
          return of({ success: false, context: err });
        })
      );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  private getActiveSubscriptions(CustomerId: string) {
    const resource = `subscriptions?`;
    let urlParams = `customer=${CustomerId}`;
    urlParams += `&status=active`;
    const requestUrl = `${this.apiURL}${resource}${urlParams}`;
    return this.http.get(requestUrl, {
      headers: this.getAuthHeader(this.apiSecret$.value),
    });
  }
  private getTrialingSubscriptions(CustomerId: string) {
    const resource = `subscriptions?`;
    let urlParams = `customer=${CustomerId}`;
    urlParams += `&status=trialing`;
    const requestUrl = `${this.apiURL}${resource}${urlParams}`;
    return this.http.get(requestUrl, {
      headers: this.getAuthHeader(this.apiSecret$.value),
    });
  }

  private getAuthHeader(bearerToken: string) {
    return new HttpHeaders().set('Authorization', `Bearer ${bearerToken}`);
  }
}

export const STRIPE_API_SERVICE = new InjectionToken<StripeApiService>(
  'StripeApiService'
);
