import { UserModel } from '@gmtre-core';
import {
  generateUUID,
  combineObjects,
  getNewObject,
} from '@gmtre-utils';
import { UserMasterModel } from './user.model';

/**
 *
 * @param user > reference BaseUserModel
 * @param id
 * @returns Provides a Generic User Master
 */
export function createTemplateUserMaster(user: UserModel): UserMasterModel {
  return combineObjects(
    {
      id: user.email,
      typename: 'userMaster',
      profile: {},
      recents: [],
      favorites: [],
      settings: {},
      session: {},
    },
    getNewObject(user.email, user)
  );
}
