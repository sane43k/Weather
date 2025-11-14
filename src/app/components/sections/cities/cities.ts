import { Component, inject } from '@angular/core';
import { CityPreviewCard } from '../../ui-kit/city/city-preview-card/city-preview-card';
import { CitiesStore } from '../../../stores/cities-store';
import { TemperatureSortToggle } from '../../ui-kit/togglers/temperature-sort-toggle/temperature-sort-toggle';
import { CountrySortToggle } from '../../ui-kit/togglers/country-sort-toggle/country-sort-toggle';

@Component({
  selector: 'app-cities',
  imports: [CityPreviewCard, TemperatureSortToggle, CountrySortToggle],
  templateUrl: './cities.html',
  styleUrl: './cities.scss',
})
export class Cities {
  private citiesStore = inject(CitiesStore);
  citiesWeather = this.citiesStore.citiesWeather;
}
