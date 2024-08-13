import { OAuthOpts } from '../types/auth';
import { CognitoIdentityModel, ICognitoStorage } from './platform';
export interface AppUiConfModel {
  auth?: AuthUiConfig;
  general?: {
    desktop_logo_dark?: string;
    desktop_logo_light?: string;
    mobile_logo_dark?: string;
    mobile_logo_light?: string;
  };
}

export interface Auth0OAuthOpts {
  domain: string;
  clientID: string;
  scope: string;
  redirectUri: string;
  audience: string;
  responseType: string;
  returnTo: string;
  urlOpener?: (url: string, redirectUrl: string) => Promise<any>;
}

export interface IdentityCredentials {
  accessKeyId: string;
  sessionToken: string;
  secretAccessKey: string;
  identityId: string;
  authenticated: boolean;
  expired?: boolean;
  expireTime?: Date;
  expiryWindow?: number;
}

export interface AuthIdentities {
  [id: string]: CognitoIdentityModel;
}

export interface AwsCognitoOAuthOpts {
  domain: string;
  scope: Array<string>;
  redirectSignIn: string;
  redirectSignOut: string;
  responseType: string;
  options?: object;
  urlOpener?: (url: string, redirectUrl: string) => Promise<any>;
}

export interface AuthUiConfig {
  can_signup?: boolean;
  desktop_logo_dark?: string;
  desktop_logo_light?: string;
  mobile_logo_dark?: string;
  mobile_logo_light?: string;
  landing_page_elements?: {
    type?: 'text' | 'image' | 'button' | 'separator' | string;
    text?: string;
    image?: string;
    class?: string;
  }[];
  layout?: "classic"|"split_screen"//|"modern"|"modern_reversed"|"split_screen_reversed"|"fullscreen"|"fullscreen_reversed"
  title?: string;
  slogan?: {
    label: string;
    class: string
  },
  logos:{
    icon: string;
    full: string;
  }
  background?: {
    color?: string;
    image?: string;
  };
  buttons?: {
    google?: boolean;
  };
}

/**
 * Auth instance options
 */
export interface AuthOptions {
  userPoolId?: string;
  userPoolWebClientId?: string;
  identityPoolId?: string;
  region?: string;
  mandatorySignIn?: boolean;
  cookieStorage?: ICookieStorageData;
  oauth?: OAuthOpts;
  refreshHandlers?: object;
  storage?: ICognitoStorage;
  authenticationFlowType?: string;
  identityPoolRegion?: string;
  clientMetadata?: any;
  endpoint?: string;
  signUpVerificationMethod?: 'code' | 'link';
}

export interface IdentityModel {
  userPoolId: string;
  region: string;
  clientId: string;
}

export interface ICookieStorageData {
  domain: string;
  path?: string;
  expires?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}
