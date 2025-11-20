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
      {
        path: ':lat/:lon',
        loadComponent: () =>
          import('./pages/city-page/city-page').then((c) => c.CityPage),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login-page/login-page').then((c) => c.LoginPage),
        title: 'Log in',
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/signup-page/signup-page').then((c) => c.SignupPage),
        title: 'Sign up',
      },
      {
        path: 'cities',
        loadComponent: () =>
          import('./pages/cities-page/cities-page').then((c) => c.CitiesPage),
      },
    ],
  },
];
