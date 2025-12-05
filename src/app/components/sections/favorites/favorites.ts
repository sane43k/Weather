import { Component, inject } from '@angular/core';
import { UserStore } from '../../../stores/user-store';
import { CityPreviewCardList } from '../../ui-kit/city/city-preview-card-list/city-preview-card-list';

@Component({
  selector: 'app-favorites',
  imports: [CityPreviewCardList],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  private userStore = inject(UserStore);
  favoriteCities = this.userStore.favoriteCities;
}
