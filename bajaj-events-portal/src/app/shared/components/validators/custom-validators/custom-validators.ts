import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  // ✅ Employee Name: only letters and spaces
  static nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      if (!value) return null;
      const valid = /^[A-Za-z\s]+$/.test(value);
      return valid ? null : { invalidName: true };
    };
  }

  // ✅ Employee ID: must be positive number (no zero or negative)
  static employeeIdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = Number(control.value);
      if (!value) return null;
      const valid = value > 0;
      return valid ? null : { invalidEmployeeId: true };
    };
  }

  // ✅ Email format (custom regex, more strict)
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      if (!value) return null;
      const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
      return valid ? null : { invalidEmail: true };
    };
  }

  // ✅ Phone: must be exactly 10 digits
  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const valid = /^[0-9]{10}$/.test(value);
      return valid ? null : { invalidPhone: true };
    };
  }

  // ✅ City/Country: only alphabets allowed
  static textOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      if (!value) return null;
      const valid = /^[A-Za-z\s]+$/.test(value);
      return valid ? null : { invalidText: true };
    };
  }

  // ✅ Zipcode: must be 6 digits
  static zipCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const valid = /^[0-9]{6}$/.test(value);
      return valid ? null : { invalidZip: true };
    };
  }

  // ✅ Joining Date: must not be in the future
  static joiningDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const today = new Date();
      const joiningDate = new Date(value);
      return joiningDate <= today ? null : { futureDate: true };
    };
  }
}
