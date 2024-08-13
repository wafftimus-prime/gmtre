import { SHA256 } from 'crypto-js';
import { v5 as uuidv5 } from 'uuid';
import { UserModel } from '@gmtre-core';

/**
 * Generates created at timestamp
 */
export function getCreatedAtTimestamp() {
  return {
    created_at: new Date().toISOString(),
  };
}

/**
 * Generates modified at timestamp
 */
export function getModifiedAtTimestamp() {
  return {
    modified_at: new Date().toISOString(),
  };
}

export function createHashToken() {
  let dt = new Date().getTime();
  return 'xxxxxxxxxxxxxx-xxxxxxxxx'.replace(/[xy]/g, function (c) {
    // tslint:disable-next-line:no-bitwise
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    // tslint:disable-next-line:no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function createShortUUID() {
  let dt = new Date().getTime();
  return 'xxxx-xx-4xx-yxx'.replace(/[xy]/g, function (c) {
    // tslint:disable-next-line:no-bitwise
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    // tslint:disable-next-line:no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function createUUID() {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // tslint:disable-next-line:no-bitwise
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    // tslint:disable-next-line:no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/**
 * Generates created at and created by entries
 */
export function getCreatedAtBy(user: UserModel) {
  return {
    created_at: new Date().toISOString(),
    created_by: user.name,
  };
}

/**
 * Generates a modified and modified by entries
 */
export function getModifiedBy(user: UserModel) {
  return {
    modified_at: new Date().toISOString(),
    modified_by: user.name,
  };
}

/**
 * Generates a new object base model entries
 */
export function getNewObject(primaryKey: string, user: UserModel) {
  return {
    ...getCreatedAtBy(user),
    ...getModifiedBy(user),
  };
}

export function getRandomId(): string {
  return '-' + Math.random().toString(36).substr(2, 5);
}

export function deriveUUID(value:string){
  return uuidv5(value,'88b13c26-2c98-41fe-a59a-253489d11d24')
}

/**
 * Generates default base model timestamps
 * @param user
 * @param id
 */
export function getCreatedTs() {
  return {
    modified_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
}

/**
 * Generates a new object base model entries
 */
export function getNewObjectBase(objectId:string,user: UserModel) {
  return {
    id:objectId,
    created_by: { id: user.sub, name: user.name },
    modified_by: { id: user.sub, name: user.name },
    ...getCreatedTs(),
  };
}

/**
 * Generates a modified and modified by entries
 */
export function getObjectModifiedBy(objectId: string,user: UserModel) {
  return {
    id: objectId,
    modified_at: new Date().toISOString(),
    modified_by: { id: user.sub, name: user.name },
  };
}

export function hashString(value: string): string {
    const hashedValue = SHA256(value).toString();
    return hashedValue;
}


