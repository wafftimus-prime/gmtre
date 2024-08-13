import { inject } from '@angular/core';
import { withLogger } from '@gmtre-devkit'
import { patchState, signalStore, type, withMethods } from '@ngrx/signals';
import { setEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { SecretsCollection } from './secrets.model';
import { SecretsService } from './secrets.service';

export const SecretsStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity: type<SecretsCollection>(), collection: 'secrets' }),
  withMethods((store: any) => {
    const secretsService = inject(SecretsService);

    return {
      async loadSecretByKey(secret_name: string) {
        const res = await secretsService.getSecretByName(secret_name);

        patchState(
          store,
          setEntity(
            { id: res.resourceId, secrets: res.object },
            { collection: 'secrets' }
          )
        );
      },
    };
  }),
  withLogger('secrets', true)
);
