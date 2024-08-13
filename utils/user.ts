import { v5 as uuidv5 } from 'uuid';
import { Cache } from 'aws-amplify/utils';
import { SILENTPASS } from '@gmtre-devkit';

export async function getAppUserStorageKey(){
  const pass = await Cache.getItem(SILENTPASS)
return `${pass.appId}.userData`;
}

export function getDerivativeId(sourceId: string) {
  const namespace = 'b2490170-705f-4b57-ba94-5b7ecb6e6af1';
  return uuidv5(sourceId, namespace);
}
export async function generateProfileId(email: string | undefined) {
  const uuid = await emailToUUID(email);
  return uuid;
}

export function createdAtBy(email: string): {
  createdAt: string;
  createdBy: string;
} {
  return {
    createdAt: new Date().toISOString(),
    createdBy: email,
  };
}

export function updatedAtBy(email: string) {
  return {
    updatedAt: new Date().toISOString(),
    updatedBy: email,
  };
}

function generateURL(app_id: string) {
  // Split the ID into two parts: countryCode and baseName
  const [tld, domain] = app_id.split('.');

  // Define the URL format
  return `https://www.${domain}.${tld}/`;
}

async function genIDToUUID(sourceId: string | undefined) {
  // Convert the sourceId string to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(sourceId);

  // Hash the data using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Format the first 32 characters of the hash as a UUID
  return `${hashHex.substring(0, 8)}-${hashHex.substring(
    8,
    12
  )}-${hashHex.substring(12, 16)}-${hashHex.substring(
    16,
    20
  )}-${hashHex.substring(20, 32)}`;
}

async function emailToUUID(email: string | undefined) {
  // Convert the email string to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(email);

  // Hash the data using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Format the first 32 characters of the hash as a UUID
  return `${hashHex.substring(0, 8)}-${hashHex.substring(
    8,
    12
  )}-${hashHex.substring(12, 16)}-${hashHex.substring(
    16,
    20
  )}-${hashHex.substring(20, 32)}`;
}
