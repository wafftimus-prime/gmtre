import { patchState, signalStore, type, withMethods } from '@ngrx/signals';
import { setEntity, withEntities } from '@ngrx/signals/entities';
import { withLogger } from '../utils';
import {
  SupportInformationCollection
} from './support.model';
import { checkPermissions, getDeviceEnvironmentInfo, getNetworkInfoItem } from './support.utils';
// export type SupportInformationState = {...SupportInformation};

export const SupportStore = signalStore(
  { providedIn: 'root' },
  withEntities({
    entity: type<SupportInformationCollection>(),
    collection: 'platform_support',
  }),
  withMethods((store: any) => {
    return {
       getUserInfoData(){ return store.platform_supportEntityMap().user_info },
       getDeviceEnvironmentInfoData(){ return store.platform_supportEntityMap().device_environment_info },
       getSessionInfoData(){ return store.platform_supportEntityMap().session_info },
       getSessionPermissionsData(){ return store.platform_supportEntityMap().session_permissions },
       getErrorInfoData(){ return store.platform_supportEntityMap().error_info },
       getNetworkInfoData(){ return store.platform_supportEntityMap().network_info },
       getRegisteredSignalsData(){ return store.platform_supportEntityMap().registered_signals },

       
      async storeUserAction(action){
        store.platform_supportEntityMap().session_info.actions.push(action)
        patchState(
          store,
          setEntity(store.platform_supportEntityMap().session_info, {
            collection: 'platform_support',
            idKey: 'typename',
          })
        );
        
      },
      async addSupportEntity(entity: SupportInformationCollection) {
        this.init();
        patchState(
          store,
          setEntity(entity, {
            collection: 'platform_support',
            idKey: 'typename',
          })
        );
      },
      async init() {
        patchState(store,setEntity(getDeviceEnvironmentInfo(), {collection: 'platform_support',idKey: 'typename',}));
        patchState(store,setEntity(await getNetworkInfoItem(), {collection: 'platform_support',idKey: 'typename',}));
        patchState(store,setEntity(await checkPermissions(), {collection: 'platform_support',idKey: 'typename',}));
      },
    };
  }),
  withLogger('platform_support', true)
);
