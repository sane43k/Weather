import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((c) => c.MainLayout),
    title: 'Weather',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/main-page/main-page').then((c) => c.MainPage),
      },
    ],
  },
];
