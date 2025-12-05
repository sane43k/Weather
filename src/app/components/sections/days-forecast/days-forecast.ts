import { Component, inject } from '@angular/core';
import { CityStore } from '../../../stores/city-store';
import { ThreeHourForecastCard } from '../../ui-kit/city/three-hour-forecast-card/three-hour-forecast-card';

@Component({
  selector: 'app-days-forecast',
  imports: [ThreeHourForecastCard],
  templateUrl: './days-forecast.html',
  styleUrl: './days-forecast.scss',
})
export class DaysForecast {
  private cityStore = inject(CityStore);
  daysForecast = this.cityStore.daysForecast;
}
