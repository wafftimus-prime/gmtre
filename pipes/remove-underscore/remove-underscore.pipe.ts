import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderScore',
  standalone: true, // This makes the pipe standalone
})
export class RemoveUnderScorePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    try {
      return value.replace(/_|-/g, ' ');
    } catch (e) {
      return value;
    }
  }
}
