import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Employee } from '../../models/employee';
import { Subscription } from 'rxjs';
import { EmployeesApi } from '../../services/employees-api';

@Component({
  selector: 'app-employee-details',
  imports: [],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails implements OnChanges, OnDestroy {
  private _employeeApiServiceSubscription: Subscription;

  private _employeesApi = inject(EmployeesApi);

  protected title: string = 'Details Of - ';

  @Input() public employeeId: number;

  protected employee: Employee;
  @Input() public subTitle: string;
  @Output() sendConfirmationMessage: EventEmitter<string> = new EventEmitter<string>();

  protected onEmployeeProcessed(): void {
    //this will fire an evenht to send data to parent component
    this.sendConfirmationMessage.emit(
      `Employee${this.employee.employeeName}" Event has been processed ND stored in Oracle DB`
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this._employeeApiServiceSubscription = this._employeesApi
      .getEmployeeDetails(this.employeeId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.employee = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    if (this._employeeApiServiceSubscription) {
      this._employeeApiServiceSubscription.unsubscribe();
    }
  }
}
