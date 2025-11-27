import { Component, inject, OnInit } from '@angular/core';
import { DailyForecastCard } from '../../ui-kit/city/daily-forecast-card/daily-forecast-card';
import { CityStore } from '../../../stores/city-store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily-forecast',
  imports: [DailyForecastCard],
  templateUrl: './daily-forecast.html',
  styleUrl: './daily-forecast.scss',
})
export class DailyForecast implements OnInit {
  private cityStore = inject(CityStore);
  private router = inject(ActivatedRoute);

  dailyForecast = this.cityStore.dailyForecast;

  ngOnInit(): void {
    const lat = Number(this.router.snapshot.queryParamMap.get('lat'));
    const lon = Number(this.router.snapshot.queryParamMap.get('lon'));

    if (isNaN(lat) || isNaN(lon)) return;

    // this.cityStore.loadDailyForecastByCoords(lat, lon);
  }
}
