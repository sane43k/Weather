import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CityStore } from '../../../stores/city-store';
import { ActivatedRoute } from '@angular/router';
import { ThreeHourForecastCard } from '../../ui-kit/city/three-hour-forecast-card/three-hour-forecast-card';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-three-hour-forecast',
  imports: [ThreeHourForecastCard],
  templateUrl: './three-hour-forecast.html',
  styleUrl: './three-hour-forecast.scss',
})
export class ThreeHourForecast implements OnInit, OnDestroy {
  private cityStore = inject(CityStore);
  private router = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  forecast3HourFor5Days = this.cityStore.forecast3HourFor5Days;

  ngOnInit(): void {
    this.router.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const lat = Number(params['lat']);
        const lon = Number(params['lon']);

        if (isNaN(lat) || isNaN(lon)) return;

        this.cityStore.load3HourForecastFor5DaysByCoords(lat, lon);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
