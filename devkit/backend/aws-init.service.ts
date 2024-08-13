import { Inject, Injectable } from '@angular/core';
import { GmtrePlatformConfigService } from '../platform/platform.service';
import { isEmptyObject, isNullOrUndefined } from '@gmtre-utils';
import { fetchAuthSession } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AWSInitService {
  session: import('@aws-amplify/core/dist/esm/singleton/Auth/types').AuthSession =
    {};
  region;
  bucket;
  clients: any = {};

  constructor(
    @Inject([]) public AWS_CLIENTS: any[],
    private config: GmtrePlatformConfigService
  ) {
    this.session = this.config.entrypoint_value;
    this.region = this.config.definitions_value.resources.auth.region;
    this.bucket =
      this.config.definitions_value.resources.file_storage?.internal_bucket;
    this.init(AWS_CLIENTS);
  }

  async init(CLIENTS: any[]) {
    const clientPromises = CLIENTS.map((client) =>
      this.configureClient(client)
    );
    const configuredClients = await Promise.all(clientPromises);
    CLIENTS.forEach((client, index) => {
      this.clients[client] = configuredClients[index];
    });
  }

  async configureClient(client: any) {
    if (
      isEmptyObject(this.session?.credentials) ||
      isNullOrUndefined(this.session?.credentials)
    ) {
      this.session = await fetchAuthSession({ forceRefresh: false });
    }

    // Simulate an asynchronous operation if needed, such as fetching additional config
    // await someAsyncOperationIfNeeded();
    return new client({
      credentials: this.session.credentials,
      region: this.region,
    });
  }

  // async init(CLIENTS: any[]) {
  //   for (let index = 0; index < CLIENTS.length; index++) {
  //     this.clients[CLIENTS[index]] = this.configureClient(CLIENTS[index]);
  //   }
  // }

  // configureClient(client: any, credentials = this.session.credentials) {
  //   console.log('AWS INIT SERVICE >> CONFIGURE CLIENT', this.session);
  //   return new client({
  //     credentials,
  //     region: this.region,
  //   });
  // }
}
