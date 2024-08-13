import { Auth0OAuthOpts, AwsCognitoOAuthOpts } from '../models/auth';

export declare type OAuthOpts = AwsCognitoOAuthOpts | Auth0OAuthOpts;
export type OAuthProvider = 'Google' | 'Facebook' | 'Amazon' | 'Apple';
export type AuthVerifiableAttributeKey = 'email' | 'phone_number';

export type GraphQLAuthMode =
  | 'apiKey'
  | 'oidc'
  | 'userPool'
  | 'iam'
  | 'lambda'
  | 'none';

export type AuthStandardAttributeKey =
  | 'address'
  | 'birthdate'
  | 'email_verified'
  | 'family_name'
  | 'gender'
  | 'given_name'
  | 'locale'
  | 'middle_name'
  | 'name'
  | 'nickname'
  | 'phone_number_verified'
  | 'picture'
  | 'preferred_username'
  | 'profile'
  | 'sub'
  | 'updated_at'
  | 'website'
  | 'zoneinfo'
  | AuthVerifiableAttributeKey;

export type CustomScope = string & {};
export type OAuthScope =
  | 'email'
  | 'openid'
  | 'phone'
  | 'email'
  | 'profile'
  | 'aws.cognito.signin.user.admin'
  | CustomScope;

export type CustomProvider = {
  custom: string;
};
