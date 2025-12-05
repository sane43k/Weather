import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CityCard } from '../../ui-kit/city/city-card/city-card';
import { ActivatedRoute } from '@angular/router';
import { CityStore } from '../../../stores/city-store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-city',
  imports: [CityCard],
  templateUrl: './city.html',
  styleUrl: './city.scss',
})
export class City implements OnInit, OnDestroy {
  private cityStore = inject(CityStore);
  private router = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  cityWeather = this.cityStore.cityWeather;

  ngOnInit(): void {
    this.router.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const lat = Number(params['lat']);
        const lon = Number(params['lon']);

        if (isNaN(lat) || isNaN(lon)) return;

        this.cityStore.loadCityWeatherByCoords(lat, lon);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
