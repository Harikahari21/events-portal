import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/components/validators/custom-validators/custom-validators';

export class EmployeeRegistration {
  private formBuilder = inject(FormBuilder);
  employeeForm: FormGroup = this.formBuilder.group({
    employeeName: [
      '',
      [Validators.required, Validators.minLength(3), CustomValidators.nameValidator()],
    ],
    employeeId: ['', [Validators.required, CustomValidators.employeeIdValidator()]],
    email: ['', [Validators.required, CustomValidators.emailValidator()]],
    phone: ['', [Validators.required, CustomValidators.phoneValidator()]],
    city: ['', CustomValidators.textOnlyValidator()],
    country: ['', CustomValidators.textOnlyValidator()],
    address: [''],
    zipcode: ['', CustomValidators.zipCodeValidator()],
    skillSets: [''],
    joiningDate: ['', [Validators.required, CustomValidators.joiningDateValidator()]],
    avatar: [''],
  });
}
