export interface IStripeCreateCustomerRequest {
  name?: string;
  email?: string;
}

export interface IStripeCustomerPortalSessionRequest {
  CustomerId?: string;
  ReturnUrl?: string;
}

export interface IStripeCheckOutRequest {
  // Mapped to client_reference_id
  AccountId: string;

  CustomerId: string;
  Mode: string;
  AllowPromoCodes: boolean;
  Trial: {
    Allowed: boolean;
    TrialPeriodDays: string;
  };
  CancelUrl: string;
  SuccessUrl: string;
  LineItems: ICheckOutLineItem[];
}

export interface ICheckOutLineItem {
  Quantity: string;
  PriceId: string;
}

// export inter

// payment
// Accept one-time payments for cards, iDEAL, and more.

// setup
// Save payment details to charge your customers later.

// subscription
// Use Stripe Billing to set up fixed-price subscriptions.
