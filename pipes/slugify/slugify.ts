import { Pipe, PipeTransform } from '@angular/core';
import isString from 'lodash';

@Pipe({ name: 'slugify', pure: false, standalone: true })
export class SlugifyPipe implements PipeTransform {
  transform(str: string): string {
    return isString(str)
      ? str
          .toLowerCase()
          .trim()
          .replace(/[^\w\-]+/g, ' ')
          .replace(/\s+/g, '-')
      : str;
  }
}
