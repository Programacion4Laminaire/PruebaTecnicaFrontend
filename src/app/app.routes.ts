import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'persons',
    loadComponent: () =>
      import('./features/person/person-page.component').then(
        (m) => m.PersonPageComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'persons',
  },
  {
    path: '**',
    redirectTo: 'persons',
  },
];
