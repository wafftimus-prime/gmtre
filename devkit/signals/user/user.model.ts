import { Table } from '@aws-sdk/client-glue';
import {
  UserModel,
  BaseCollectionModel,
  CreatedOrModifiedModel,
} from '@gmtre-core';
import { ColumnInfo } from '@aws-sdk/client-athena';
import { AuthSession } from '@aws-amplify/core/dist/esm/singleton/Auth/types';

export type UserCollection = UserMasterModel;

export interface UserMasterModel extends BaseCollectionModel {
  typename: 'userMaster' | string;
  profile?: UserModel;
  session?: AuthSession;
  recents?: UserRecentItemsModel[];
  favorites?: UserFavoriteItemsModel[];
  settings?: UserSettingsModel;
}

/** REFERENCE MODELS TO STRONGTYPE ROOT MODELS */
export interface UserSettingsModel extends CreatedOrModifiedModel {
  darkMode: boolean; // Whether dark mode is enabled
  notifications: {
    enabled: boolean; // Whether notifications are enabled
    frequency: 'daily' | 'weekly' | 'monthly'; // Frequency of notifications
  };
  privacy: {
    profileVisible: boolean; // Whether the user profile is visible to others
    searchEngineIndexing: boolean; // Whether the profile can be indexed by search engines
  };
  language: string; // Preferred language
}

export interface UserRecentItemsModel extends CreatedOrModifiedModel {}

export interface UserFavoriteItemsModel extends CreatedOrModifiedModel {
  type: FavoriteItemTypes;
}

export type FavoriteItemTypes = 'report' | 'dataset' | 'dashboard';
