import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passportExpiry(checkWith: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    const expiry = control.get('expiry')?.value;
    const dob = control?.get(checkWith)?.value;
    // console.log(expiry, dob);

    if (dob && expiry) {
      let dobDate = dob;
      let expiryDate = expiry;

      if (typeof dob == 'string') {
        const formatedDate = dob.split('-');
        dobDate = new Date(
          parseInt(formatedDate[2]),
          parseInt(formatedDate[1]) - 1,
          parseInt(formatedDate[0])
        );
      }

      if (typeof expiry == 'string') {
        const formatedDate = expiry.split('-');
        expiryDate = new Date(
          parseInt(formatedDate[2]),
          parseInt(formatedDate[1]) - 1,
          parseInt(formatedDate[0])
        );
      }
    
      expiryDate.setHours(0,0,0,0);
      dobDate.setHours(0,0,0,0);

      if (expiryDate.getTime() - dobDate.getTime() < 0) {
       
        return {
          passportExpiry:
            'Passport Expiry Dates should not be less than Date Of Birth',
        };
      }
    }

    return null;
  };
}
