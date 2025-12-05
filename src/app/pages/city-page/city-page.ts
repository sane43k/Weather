import { Component } from '@angular/core';
import { City } from '../../components/sections/city/city';
import { ThreeHourForecast } from '../../components/sections/three-hour-forecast/three-hour-forecast';
import { DaysForecast } from '../../components/sections/days-forecast/days-forecast';

@Component({
  selector: 'app-city-page',
  imports: [City, ThreeHourForecast, DaysForecast],
  templateUrl: './city-page.html',
  styleUrl: './city-page.scss',
})
export class CityPage {}
