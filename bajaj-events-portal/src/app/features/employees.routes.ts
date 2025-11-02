import { Routes } from '@angular/router';
import { EmployeesList } from './employees/components/employees-list/employees-list';
import { authGuard } from '../core/guards/auth-guard';
import { hrGuard } from '../core/guards/hr-guard';

export const employeesRoutes: Routes = [
  {
    path: '',
    component: EmployeesList,
    title: 'Employees List',
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./employees/components/register-employee/register-employee').then(
        (re) => re.RegisterEmployee
      ),
    title: 'Register New Employee',
    canActivate: [authGuard, hrGuard],
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./employees/components/employee-details/employee-details').then(
        (ed) => ed.EmployeeDetails
      ),
    title: 'Employee Details',
    canActivate: [authGuard],
  },
];
