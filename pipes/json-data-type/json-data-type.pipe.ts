import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonDataType',
  standalone: true,
})
export class JsonDataTypePipe implements PipeTransform {
  transform(value: any): string {
    if (value === null) {
      return 'null';
    } else if (Array.isArray(value)) {
      return 'array';
    } else if (typeof value === 'string') {
      return 'string';
    } else if (typeof value === 'number') {
      return 'number';
    } else if (typeof value === 'boolean') {
      return 'boolean';
    } else if (value instanceof Date) {
      return 'date';
    } else if (typeof value === 'function') {
      return 'function';
    } else if (typeof value === 'object') {
      return 'object';
    } else if (typeof value === 'undefined') {
      return 'undefined';
    } else {
      return 'unknown';
    }
  }
}
