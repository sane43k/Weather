import { Component } from '@angular/core';
import { Favorites } from '../../components/sections/favorites/favorites';

@Component({
  selector: 'app-favorites-page',
  imports: [Favorites],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.scss',
})
export class FavoritesPage {}
