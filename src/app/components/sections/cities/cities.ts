import { Component, inject } from '@angular/core';
import { CitiesStore } from '../../../stores/cities-store';
import { TemperatureSortToggle } from '../../ui-kit/togglers/temperature-sort-toggle/temperature-sort-toggle';
import { CountrySortToggle } from '../../ui-kit/togglers/country-sort-toggle/country-sort-toggle';
import { CityPreviewCardList } from '../../ui-kit/city/city-preview-card-list/city-preview-card-list';

@Component({
  selector: 'app-cities',
  imports: [TemperatureSortToggle, CountrySortToggle, CityPreviewCardList],
  templateUrl: './cities.html',
  styleUrl: './cities.scss',
})
export class Cities {
  private citiesStore = inject(CitiesStore);
  citiesWeather = this.citiesStore.citiesWeather;
}
