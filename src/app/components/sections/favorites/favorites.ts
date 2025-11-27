import { Component, inject } from '@angular/core';
import { UserStore } from '../../../stores/user-store';
import { CityPreviewCard } from '../../ui-kit/city/city-preview-card/city-preview-card';

@Component({
  selector: 'app-favorites',
  imports: [CityPreviewCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  private userStore = inject(UserStore);
  favoriteCities = this.userStore.favoriteCities;
}
