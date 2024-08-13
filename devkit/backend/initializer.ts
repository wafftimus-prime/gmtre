import { PlatformConfigModel } from '@gmtre-core';
import { Amplify } from 'aws-amplify';
import { Cache } from 'aws-amplify/utils';

export const SILENTPASS: any= 'app_metadata'

export function BackendInitializer(config: PlatformConfigModel) {
  const AmplifyConfig: any = {};

  // export const USER_STORAGE_KEY = `${SILENTPASS}.userData`;
  Cache.setItem(SILENTPASS, { metadata: config.metadata, appId: config.metadata?.app_id }, { priority: 1 });


  // Check if auth config exists and if so, add it to the AmplifyConfig object
  if (config?.resources?.auth) {
    AmplifyConfig.Auth = { Cognito: config.resources.auth };
  }

  // Check if GraphQL config exists and if so, add it to the AmplifyConfig object
  if (config?.resources?.graphql) {
    AmplifyConfig.API = { GraphQL: config.resources.graphql }
  }

  // Configure Amplify only if there is something to configure
  if (Object.keys(AmplifyConfig).length > 0) {
    Amplify.configure(AmplifyConfig);
  } else {
    console.log('No valid config found to initialize Amplify.');
  }
}
