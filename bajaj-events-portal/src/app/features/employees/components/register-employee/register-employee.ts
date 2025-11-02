import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRegistration } from '../../models/employee-registration';
import { EmployeesApi } from '../../services/employees-api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './register-employee.html',
  styleUrl: './register-employee.css',
})
export class RegisterEmployee {
  protected register: EmployeeRegistration = new EmployeeRegistration();

  private _employeesApi = inject(EmployeesApi);
  private _router = inject(Router);
  private _employeesApiSubscription: Subscription;

  protected onEmployeeSubmit(): void {
    this._employeesApiSubscription = this._employeesApi
      .scheduleNewEmployee(this.register.employeeForm.value)
      .subscribe({
        next: (data) => {
          if (data.acknowledged === true) {
            this._router.navigate(['/employees']);
          }
        },
      });
  }
  ngOnDestroy(): void {
    if (this._employeesApiSubscription) {
      this._employeesApiSubscription.unsubscribe();
    }
  }
}
