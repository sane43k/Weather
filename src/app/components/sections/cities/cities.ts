import { Component, inject } from '@angular/core';
import { CityPreviewCard } from '../../ui-kit/city/city-preview-card/city-preview-card';
import { CitiesStore } from '../../../stores/cities-store';

@Component({
  selector: 'app-cities',
  imports: [CityPreviewCard],
  templateUrl: './cities.html',
  styleUrl: './cities.scss',
})
export class Cities {
  private citiesStore = inject(CitiesStore);
  citiesWeather = this.citiesStore.citiesWeather;
}
