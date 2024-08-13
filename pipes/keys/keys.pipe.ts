import { Pipe, PipeTransform } from '@angular/core';
import { isObject } from 'lodash/object';

@Pipe({ name: 'keys', pure: false, standalone: true })
export class KeysPipe implements PipeTransform {
  transform(obj: any): any[] {
    if (Array.isArray(obj) || !isObject(obj)) {
      return obj;
    }

    return Object.keys(obj);
  }
}
