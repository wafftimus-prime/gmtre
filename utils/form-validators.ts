import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lowerCaseValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const Re: RegExp = /[a-z]/g;
    const forbidden = Re.test(control.value);
    return !forbidden
      ? {
          missingLowerCaseValidation: {
            value: control.value,
            message: 'Password must have at least 1 Lowercase',
          },
        }
      : null;
  };
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const Re: RegExp = /[\d]/g;
    const forbidden = Re.test(control.value);
    return !forbidden
      ? {
          missingNumberValidation: {
            value: control.value,
            message: 'Password must have at least 1 number',
          },
        }
      : null;
  };
}

export function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const Re: RegExp = /[$*{}()?"!@#%&><`]/g;
    const forbidden = Re.test(control.value);
    return !forbidden
      ? {
          missingSpecialCharacterValidation: {
            value: control.value,
            message: 'Password must have at least 1 special character',
          },
        }
      : null;
  };
}

export function noSpecialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const re: RegExp = /[$*{}()?"!@#%&><`+,\/\\^|~[\];']/g;
    const hasSpecialCharacters = re.test(control.value);
    return hasSpecialCharacters
      ? {
          noSpecialCharacterValidation: {
            value: control.value,
            message: 'The value must not contain any special characters',
          },
        }
      : null;
  };
}

export function noPeriodAtEdgesValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    // Check if the value starts or ends with a period
    const startsWithPeriod = value.startsWith('.');
    const endsWithPeriod = value.endsWith('.');

    if (startsWithPeriod || endsWithPeriod) {
      return {
        noPeriodAtEdges: {
          value: control.value,
          message: 'The value must not start or end with a period.',
        },
      };
    }

    return null;
  };
}

export function atMostOnePeriodValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    // Regular expression to match allowed characters: alphanumeric, underscore, and periods
    const allowedCharactersRegex = /^[a-zA-Z0-9_.]*$/;

    // Check if value matches allowed characters
    const isValidCharacters = allowedCharactersRegex.test(value);

    // Count the number of periods in the value
    const periodCount = (value.match(/\./g) || []).length;

    // Validation conditions
    if (!isValidCharacters || periodCount > 1) {
      return {
        atMostOnePeriod: {
          value: control.value,
          message: 'The value must only contain and at most one period.',
        },
      };
    }

    return null;
  };
}


export function upperCaseValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const Re: RegExp = /[A-Z]/g;
    const forbidden = Re.test(control.value);
    return !forbidden
      ? {
          missingUpperCaseValidation: {
            value: control.value,
            message: 'Password must have at least 1 Uppercase',
          },
        }
      : null;
  };
}

export function valueMatchValidator(fieldKey: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let curVal: string = '';
    if (control)
      if (control.parent)
        if (control.parent.value)
          if (control.parent.value.hasOwnProperty(fieldKey))
            curVal = control.parent.value[fieldKey];
    const match: boolean = curVal.toString() === control.value;
    return !match ? { valueMatchValidation: { value: control.value } } : null;
  };
}
