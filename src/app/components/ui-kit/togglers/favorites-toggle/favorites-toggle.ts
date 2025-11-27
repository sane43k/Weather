import { Component, effect, inject, input } from '@angular/core';
import { CityWeather } from '../../../../interfaces/city-interface';
import { UserStore } from '../../../../stores/user-store';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-favorites-toggle',
  imports: [],
  templateUrl: './favorites-toggle.html',
  styleUrl: './favorites-toggle.scss',
})
export class FavoritesToggle {
  readonly cityWeather = input<CityWeather | null>(null);

  isFavorite: boolean = false;

  private authService = inject(AuthService);
  private userStore = inject(UserStore);

  constructor() {
    effect(() => {
      this.isFavorite = this.userStore
        .favoriteCities()
        .some((favCity) => favCity.id === this.cityWeather()?.id);
    });
  }

  toggleFavorites(event: Event): void {
    event.stopPropagation();

    const currentUser = this.authService.currentUser();
    const cityWeather = this.cityWeather();

    if (!cityWeather) return;

    if (this.isFavorite) {
      currentUser
        ? this.authService.removeFavoriteCity(cityWeather)
        : this.userStore.removeFavoriteCity(cityWeather);
    } else {
      currentUser
        ? this.authService.addFavoriteCity(cityWeather)
        : this.userStore.addFavoriteCity(cityWeather);
    }
  }
}
