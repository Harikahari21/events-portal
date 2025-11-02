import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeDetails } from '../employee-details/employee-details';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { EmployeesApi } from '../../services/employees-api';
import { LowercaseTruncPipe } from '../../../../shared/pipes/lowercase-trunc-pipe';

@Component({
  selector: 'app-employees-list',
  imports: [EmployeeDetails, FormsModule, NgxPaginationModule, LowercaseTruncPipe],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList implements OnInit {
  private _eventServiceSubscription: Subscription;

  private employeesApi = inject(EmployeesApi);
  ngOnInit(): void {
    this.employeesApi.getAllEmployees().subscribe({
      next: (employeesData) => {
        console.log(employeesData);
        this.employees = employeesData;
        this.filteredEmployee = [...this.employees];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this._eventServiceSubscription) {
      this._eventServiceSubscription.unsubscribe();
    }
  }

  protected title: string = 'Employee List';

  protected columns: string[] = ['Employee Name', 'City', 'Email', 'Phone', 'Show Details'];

  protected employees: Employee[];

  // protected selectedEmployee: Employee;

  protected selectedEmployeeId: number;

  protected filteredEmployee: Employee[];

  protected searchChars: string = '';

  protected childSubTitle: string = 'Details of selected Employee !';
  protected childMessage: string;

  protected pageNumber: number = 1;

  protected pageSize: number = 1;

  protected handleChildMessage(message: string): void {
    this.childMessage = message;
  }

  protected onEmployeeSelection(id: number): void {
    this.selectedEmployeeId = id;
  }

  // protected searchEmployees(): void {
  //   if (!this.searchChars || this.searchChars == '') {
  //     console.log(this.searchChars);
  //     this.filteredEmployee = this.employees;
  //   } else {
  //     this.filteredEmployee = this.employees.filter((employee) =>
  //       employee.employeeName.toLocaleLowerCase().includes(this.searchChars.toLocaleLowerCase())
  //     );
  //     console.log(this.filteredEmployee);
  //   }
  //   this.pageNumber = 1;
  // }
  protected isSearching: boolean = false; // Track if a search is active
  protected previousPageNumber: number = 1; // Store page before search

  protected searchEmployees(): void {
    const searchText = this.searchChars?.trim().toLowerCase();

    if (searchText) {
      if (!this.isSearching) {
        this.previousPageNumber = this.pageNumber;
        this.isSearching = true;
      }

      this.pageNumber = 1;

      this.filteredEmployee = this.employees.filter((employee) =>
        employee.employeeName.toLowerCase().includes(searchText)
      );

      console.log(this.filteredEmployee);
    } else {
      this.filteredEmployee = this.employees;
      this.pageNumber = this.previousPageNumber;
      this.isSearching = false;
      console.log(this.filteredEmployee);
    }
  }
}
