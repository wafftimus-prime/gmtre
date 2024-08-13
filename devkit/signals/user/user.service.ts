import { Injectable } from '@angular/core';
import { AWSInitService } from '../../backend';
import {
    updateUserAttribute,
    UpdateUserAttributeOutput,
} from 'aws-amplify/auth';
import { ReplaySubject } from 'rxjs';
import { User } from './user.types';
import {GmtrePlatformConfigService} from '../../platform/platform.service'

@Injectable({ providedIn: 'root' })
export class UserService extends AWSInitService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor(config: GmtrePlatformConfigService) {
    super([], config);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

//   /**
//    * Setter & getter for user
//    *
//    * @param value
//    */
//   set user(value: User) {
//     // Store the value
//     this._user.next(value);
//   }

//   get user$(): Observable<User> {
//     return this._user.asObservable();
//   }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private handleUpdateUserAttributeNextSteps(
    output: UpdateUserAttributeOutput
  ) {
    const { nextStep } = output;

    switch (nextStep.updateAttributeStep) {
      case 'CONFIRM_ATTRIBUTE_WITH_CODE':
        const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        console.log(
          `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`
        );
        // Collect the confirmation code from the user and pass to confirmUserAttribute.
        break;
      case 'DONE':
        console.log(`attribute was successfully updated.`);
        break;
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------



  async handleUpdateUserAttribute(attributeKey: string, value: string) {
    try {
      const output = await updateUserAttribute({
        userAttribute: {
          attributeKey,
          value,
        },
      });
      this.handleUpdateUserAttributeNextSteps(output);
    } catch (error) {
      console.log(error);
    }
  }
}
