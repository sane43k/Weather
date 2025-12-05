import { Component } from '@angular/core';
import { City } from '../../components/sections/city/city';
import { ThreeHourForecast } from '../../components/sections/three-hour-forecast/three-hour-forecast';
import { DaysForecast } from '../../components/sections/days-forecast/days-forecast';

@Component({
  selector: 'app-main-page',
  imports: [City, ThreeHourForecast, DaysForecast],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {}
