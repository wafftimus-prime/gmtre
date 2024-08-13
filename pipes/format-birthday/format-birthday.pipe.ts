import { Pipe, PipeTransform } from '@angular/core';
import { BirthdayPayload } from '@capacitor-community/contacts';

export function formatBirthday(birthday: BirthdayPayload | any): string {
  if (birthday.month === null || birthday.day === null) {
    return 'Invalid Date'; // Or any other placeholder text you'd prefer
  }

  // Ensure month is within 1-12 and day is within 1-31
  if (
    birthday.month < 1 ||
    birthday.month > 12 ||
    birthday.day < 1 ||
    birthday.day > 31
  ) {
    return 'Invalid Date';
  }

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Adjusting month value to match array index (0-11 for Jan-Dec)
  const monthIndex = birthday.month - 1;
  const monthName = monthNames[monthIndex];

  return `${monthName} ${birthday.day}`;
}

@Pipe({
  name: 'formatBirthday',
  pure: false,
  standalone: true,
})
export class FormatBirthdayPipe implements PipeTransform {
  transform(birthday: BirthdayPayload | any, ...args: unknown[]): string {
    return formatBirthday(birthday); // Call the formatBirthday function with the birthday object
  }
}
