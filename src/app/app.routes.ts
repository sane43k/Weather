import { Routes } from '@angular/router';
import { coordsResolveGuard } from './guards/coords-resolve-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((c) => c.MainLayout),
    title: 'Weather',
    children: [
      {
        path: '',
        canActivate: [coordsResolveGuard],
        loadComponent: () =>
          import('./pages/main-page/main-page').then((c) => c.MainPage),
      },
      {
        path: 'main',
        loadComponent: () =>
          import('./pages/main-page/main-page').then((c) => c.MainPage),
      },
      {
        path: 'city',
        loadComponent: () =>
          import('./pages/city-page/city-page').then((c) => c.CityPage),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./pages/favorites-page/favorites-page').then(
            (c) => c.FavoritesPage
          ),
        title: 'Favorites',
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
