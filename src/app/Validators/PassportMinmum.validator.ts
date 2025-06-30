import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PassportMinimumLength(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (value) {
    if (value / 10 < 1) {
      return {
        PassportMinimumLength: 'Passport number should have atleast two digits',
      };
    }
  }

  return null;
}
