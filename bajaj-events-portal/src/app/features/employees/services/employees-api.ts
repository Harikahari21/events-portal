import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { CudResponse } from '../../../shared/models/cud-response';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApi {
  private _baseUrl: string = 'http://localhost:9090/api';
  private _httpClient = inject(HttpClient);
  public getAllEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(`${this._baseUrl}/employees`);
  }

  public getEmployeeDetails(employeeId: number): Observable<Employee> {
    return this._httpClient.get<Employee>(`${this._baseUrl}/employees/${employeeId}`);
  }

  public scheduleNewEmployee(employee: Employee): Observable<CudResponse> {
    return this._httpClient.post<CudResponse>(`${this._baseUrl}/employees`, employee);
  }
}
