import { Component, inject, OnInit } from '@angular/core';
import { CityStore } from '../../../stores/city-store';
import { ActivatedRoute } from '@angular/router';
import { ThreeHourForecastCard } from '../../ui-kit/city/three-hour-forecast-card/three-hour-forecast-card';

@Component({
  selector: 'app-three-hour-forecast',
  imports: [ThreeHourForecastCard],
  templateUrl: './three-hour-forecast.html',
  styleUrl: './three-hour-forecast.scss',
})
export class ThreeHourForecast implements OnInit {
  private cityStore = inject(CityStore);
  private router = inject(ActivatedRoute);

  forecast3HourFor5Days = this.cityStore.forecast3HourFor5Days;

  ngOnInit(): void {
    const lat = Number(this.router.snapshot.paramMap.get('lat'));
    const lon = Number(this.router.snapshot.paramMap.get('lon'));

    if (isNaN(lat) || isNaN(lon)) return;

    this.cityStore.load3HourForecastFor5DaysByCoords(lat, lon);
  }
}
