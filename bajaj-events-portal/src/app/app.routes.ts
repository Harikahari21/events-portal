import { Routes } from '@angular/router';
import { EpHome } from './features/home/ep-home/ep-home';
import { ResourceNotFound } from './shared/components/resource-not-found/resource-not-found';
import { EmployeeForbiddenAccess } from './shared/components/employee-forbidden-access/employee-forbidden-access';
import { eventRoutes } from './features/events/events.routes';
import { employeesRoutes } from './features/employees.routes';
import { SecurityRoutes } from './features/security/security.routes';

export const routes: Routes = [
  {
    path: '',
    component: EpHome,
    title: 'Bajaj EpHome',
  },
  {
    path: 'home',
    component: EpHome,
    title: 'Bajaj Ep Home',
  },
  {
    path: 'employees',
    children: [...employeesRoutes],
  },
  {
    path: 'events',
    children: [...eventRoutes],
  },
  {
    path: 'auth',
    children: [...SecurityRoutes],
  },
  {
    path: 'forbidden-access',
    component: EmployeeForbiddenAccess,
    title: 'Access Denied',
  },
  {
    path: '**',
    component: ResourceNotFound,
    title: 'Not Found -404',
  },
];
