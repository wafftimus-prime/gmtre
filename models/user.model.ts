export interface UserModel {
    sub?: string;
    email?: string;
    email_verified?: boolean;
    address?: string;
    birthdate?: string;
    family_name?: string;
    gender?: string;
    given_name?: string;
    locale?: string;
    middle_name?: string;
    name?: string;
    nickname?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    picture?: string;
    preferred_username?: string;
    profile?: string;
    updated_at?: string;
    website?: string;
    zoneinfo?: string;
    'custom:account_number'?: string;
  }