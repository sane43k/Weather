import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../stores/user-store';

export const coordsResolveGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userStore = inject(UserStore);

  const city = userStore.city();

  return router.createUrlTree(['/main'], {
    queryParams: { lat: city.lat, lon: city.lon },
  });
};
