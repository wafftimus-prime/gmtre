import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter',
  pure: false,
  standalone: true,
})
export class FirstLetterPipe implements PipeTransform {

  /**
   * Transform
   *
   * @param value: any
   * @param args: any
   */
  transform(value: any, ...args: any[]): any {
    return value ? value.split(' ').slice(0, 2).map(n => n[0]).join('') : value;
  }
}