import { Component, Input } from '@angular/core';
import { TemperaturePipe } from '../../../../pipes/temperature-pipe';
import { TranslatePipe } from '../../../../pipes/translate-pipe';
import { CityWeather } from '../../../../interfaces/city-interface';
import { FavoritesToggle } from '../../togglers/favorites-toggle/favorites-toggle';

@Component({
  selector: 'app-city-card',
  imports: [TemperaturePipe, TranslatePipe, FavoritesToggle],
  templateUrl: './city-card.html',
  styleUrl: './city-card.scss',
})
export class CityCard {
  @Input() cityWeather: CityWeather | null = null;
}
