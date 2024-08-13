import { Pipe, PipeTransform } from '@angular/core';
import { isString, isUndefined } from '@gmtre-utils';

@Pipe({
  name: 'truncate',
  pure: false,
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    input: any,
    length?: number | any,
    suffix?: string,
    preserve?: boolean
  ): any {
    if (!isString(input)) {
      return input;
    }

    length = isUndefined(length) ? input.length : length;

    if (input.length <= length) {
      return input;
    }

    preserve = preserve || false;
    suffix = suffix || '';
    let index = length;

    if (preserve) {
      if (input.indexOf(' ', length) === -1) {
        index = input.length;
      } else {
        index = input.indexOf(' ', length);
      }
    }

    return input.substring(0, index) + suffix;
  }
}
