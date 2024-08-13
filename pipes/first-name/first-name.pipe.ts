import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName',
  pure: false,
  standalone: true,
})
export class FirstNamePipe implements PipeTransform {
  /**
   * Transform
   *
   * @param value: any
   * @param args: any
   */
  transform(value: any, ...args: any[]): any {
    return value ? value.split(' ')[0] : value;
  }
}
