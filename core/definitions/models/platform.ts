import {
  AuthStandardAttributeKey,
  CustomProvider,
  GraphQLAuthMode,
  OAuthProvider,
  OAuthScope,
} from '../types/auth';
import { Layout, Scheme, Screens, Theme, Themes } from '../types/platform';
import { ApplicationItem } from './application';

import {
  AppUiConfModel,
  AuthIdentities,
  AuthOptions,
  AuthUiConfig,
  IdentityCredentials,
} from './auth';

export type GmtreProviderConfig = {
  mockApi?: {
    delay?: number;
    services?: any[];
  };
  apps: ApplicationItem[];
  active_app: ApplicationItem | null;
  platform: PlatformConfigModel;
  gmtre?: AppUiConfig;
};

export interface PlatformSupportConfigModel{
  debugger: boolean;
  session_id?: string;
}

export interface PlatformConfigModel {
  support: PlatformSupportConfigModel
  metadata?: IPlatformMetadata;
  extra_metadata?: ExtraMetadata | any;
  authUi?: AuthUiConfig;
  resources?: IResources;
  auth?: AuthOptions | any;
  analytics?: IAnalyticsOptions;
  region?: string;
  credentials?: IdentityCredentials;
  theme?: AppUiConfig;
  stack?: StackConfigurationModel;
  uiconf?: AppUiConfModel;
}

export interface IResources {
  region: string;
  datastore?: {
    [app_name: string]: {
      table_name: string;
      partition_key_name: string;
      sort_key_name: string;
    };
  };
  auth: IAuthResource;
  analytics?: IAnalyticsResource;
  graphql?: IGraphglResource;
  file_storage?: IPlatformStorageConfigModel;
}

export interface IAnalyticsResource {
  provider: string;
  appId: string;
  region: string;
  mandatorySignIn: boolean;
}

export interface IGraphglResource {
  endpoint: string;
  region: string;
  defaultAuthMode: GraphQLAuthMode;
}

export interface IAuthResource {
  region: string;
  identityPoolId: string;
  identityPoolRegion: string;
  userPoolEndpoint?: never;
  userAttributes?: Partial<
    Record<AuthStandardAttributeKey, { required: boolean }>
  >;
  mfa?: {
    status?: 'on' | 'off' | 'optional';
    totpEnabled?: boolean;
    smsEnabled?: boolean;
  };
  passwordFormat?: {
    minLength?: number;
    requireLowercase?: boolean;
    requireUppercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialCharacters?: boolean;
  };
  userPoolId: string;
  userPoolWebClientId: string;
  userPoolClientId: string;
  signUpVerificationMethod?: 'code' | 'link';
  mandatorySignIn: boolean;
  loginWith?: {
    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: string;
      scopes: Array<OAuthScope>;
      redirectSignIn: Array<string>;
      redirectSignOut: Array<string>;
      responseType: 'code' | 'token';
      providers?: Array<OAuthProvider | CustomProvider>;
    };
  };
}

export interface IPlatformMetadata {
  is_test_system?: boolean;
  product_type?: 'platform' | 'app' | 'website';
  has_website?: boolean;
  website_app_id?: string;
  root_path?: string;
  app_name?: string;
  app_icon?: AppIconModel;
  app_icon_url?: string;
  app_id?: string;
  ios_id?: string;
  android_id?: string;
  api_target?: string;
  customer_name?: string;
  host?: HostModel;
  cdn_target?: string;
}

export interface AppIconModel {
  base_icon?: string;
  white_icon?: string;
}

export interface HostModel {
  subdomain?: string;
  host_bucket?: string;
  hostname?: string;
  host_identity?: string;
  application?: string;
  auth_identities?: AuthIdentities;
  s3_bucket?: string;
  email?: string;
  name?: string;
  account_id?: string;
  status?: string;
  expiration?: string;
  default_region?: string;
  error?: string | null;
  loaded?: boolean;
  aws_member_account?: string;
}

export interface IAnalyticsOptions {
  provider?: 'AWSPinpoint';
  appId?: string;
  region?: string;
  mandatorySignIn?: boolean;
}

export interface ExtraMetadata {
  google?: {
    baseUrl?: string;
    apiKey?: string;
  };
}

export interface IPlatformStorageConfigModel {
  cdn_bucket?: string;
  internal_bucket?: string;
  external_bucket?: string;
  cdn_base_url?: string;
}

export interface CognitoIdentityModel {
  identity_pool_id?: string;
  identity_pool_region?: string;
  user_pool_id?: string;
  region?: string;
  client_id?: string;
}

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppUiConfig {
  layout?: Layout;
  features?: UiFeatures;
  scheme?: Scheme;
  screens?: Screens;
  theme?: Theme;
  themes?: Themes;
  preferences?: AppUiPreferences;
}

export interface StackConfigurationModel {
  auth: {
    database: string;
    user_pool: string;
    user_identity_provider: string;
  };
}

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppUiPreferences {
  footer?: boolean;
  releases?: boolean;
}

export interface UiFeatures {
  languages: boolean;
  fullscreen: boolean;
  searchbar: boolean;
  shortcuts: boolean;
  quickchat: boolean;
  apps: boolean;
  messages: boolean;
  notifications: boolean;
  user: boolean;
  footer: boolean;
  settings: boolean;
}

export interface ICognitoStorage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}
