import {
  BaseCollectionModel
} from '@gmtre-core';

export type SecretsCollection = SecretsMasterModel;

export interface SecretsMasterModel extends BaseCollectionModel {
  id: string;
  secrets: {[key:string]:any};
}
