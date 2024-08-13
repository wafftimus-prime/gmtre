import { inject } from '@angular/core';
import { UserModel } from '@gmtre-core';
import { SupportStore, withLogger } from '@gmtre-devkit'
// import { IndexedDbService } from '@gmtre-services';
import { patchState, signalStore, type, withMethods } from '@ngrx/signals';
import { setEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { fetchAuthSession } from 'aws-amplify/auth';
import { UserCollection } from './user.model';
import { createTemplateUserMaster } from './user.utils';

// export type UserState = {
//   isLoading: boolean;
//   filter: { query: string; order: 'asc' | 'desc' };
//   loaded: boolean;
//   unsavedChanges: boolean;
//   instance?: ReportMasterModel;
//   reports?: ReportMasterModel[];
//   searchable?: boolean;
//   downloadable?: boolean;
//   canEdit?: boolean;
//   hasHistory?: boolean;
//   hasParameters?: boolean;
//   parameters?: any[];
//   versions?: any;
//   error?: any;
//   id?: string; // Primary ID
// };
// this._userStore.loadUser(userAttributes.email);

export const UserStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity: type<UserCollection>(), collection: 'user' }),
  withMethods((store: any) => {
    const support = inject(SupportStore)
    // const idbService = inject(IndexedDbService);
    const dbName = 'instance_user_db';

    return {
      getUserMaster() {
        return store.userEntityMap().userMaster;
      },

      getUserProfile() {
        return this.getUserMaster()?.profile;
      },

      async loadUserSession() {
        const changes: any = {
          session: await fetchAuthSession({ forceRefresh: false }),
        };

        // idbService
        //   .addItem(
        //     dbName,
        //     'userMaster',
        //     'current_user',
        //     flattenObjectToMakeClonable(userMaster)
        //   ).subscribe();

        console.log(changes)
        patchState(
          store,
          updateEntity({ id: 'userMaster', changes }, { collection: 'user' })
        );
      },

      async updateUserMaster(changes: any) {
        patchState(
          store,
          updateEntity({ id: 'userMaster', changes }, { collection: 'user' })
        );
      },

      async loadUserAuth(user: UserModel) {
        support.addSupportEntity({typename: 'user_info', ...user})
        // Loads User Master
        patchState(
          store,
          setEntity(
            { ...createTemplateUserMaster(user), profile: user },
            { idKey: 'typename', collection: 'user' }
          )
        );

        await this.loadUserSession();
        // Loads User Recents
        // patchState(
        //   store,
        //   setEntity(createTemplateUserRecents(user), {
        //     idKey: 'typename',
        //     collection: 'user',
        //   })
        // );

        // Loads User Favorites
        // patchState(
        //   store,
        //   setEntity(createTemplateUserFavorites(user), {
        //     idKey: 'typename',
        //     collection: 'user',
        //   })
        // );
      },

      //   // Gets all DynamoDB Relevant data for a given report
      //   Object.values(ReportTypenames).forEach(async (typename: string) => {
      //     const entity = await reportService.getReportByIdTypename(
      //       id,
      //       typename
      //     );
      //     if (!isEmptyObject(entity)) {

      //     }
      //   });

      //   const history = await reportService.getReportQueryHistory(id, 'runs');
      //   patchState(
      //     store,
      //     setEntity(
      //       {
      //         typename: 'reportRunsHistory',
      //         logs: history,
      //         hasHistory: history.length > 0,
      //       },
      //       {
      //         idKey: 'typename',
      //         collection: 'report',
      //       }
      //     )
      //   );

      //   if (history.length > 0) {
      //     const _latestRunData = await reportService.getDataByRunVersion(history[0])
      //     patchState(
      //       store,
      //       setEntity(
      //         {
      //           typename: 'reportDataFeed',
      //           data: _latestRunData,
      //         },
      //         {
      //           idKey: 'typename',
      //           collection: 'report',
      //         }
      //       )
      //     );
      //   }
      // },

      // async loadHistory(id){

      //   // getReportQueryHistory(this.host.host_bucket, this.reportId, 'runs')
      // }

      // async add(name: string) {
      //   const todo = await reportsService.add(name);
      //   patchState(store, addEntity(todo));
      // },

      //   async remove(id: number) {
      //     await todoService.remove(id);
      //     patchState(store, removeEntity(id));
      //   },

      //   async setFinished(id: number) {
      //     await todoService.setFinished(id);
      //     patchState(store, updateEntity({ id, changes: { finished: true } }));
      //   },
      //   async setUnfinished(id: number) {
      //     await todoService.setUnfinished(id);
      //     patchState(store, updateEntity({ id, changes: { finished: false } }));
      //   },
    };
  }),
  withLogger('user', false)
);
