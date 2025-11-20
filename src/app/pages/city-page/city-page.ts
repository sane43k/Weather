import { Component } from '@angular/core';
import { City } from '../../components/sections/city/city';
import { DailyForecast } from '../../components/sections/daily-forecast/daily-forecast';
import { ThreeHourForecast } from '../../components/sections/three-hour-forecast/three-hour-forecast';

@Component({
  selector: 'app-city-page',
  imports: [City, DailyForecast, ThreeHourForecast],
  templateUrl: './city-page.html',
  styleUrl: './city-page.scss',
})
export class CityPage {}
