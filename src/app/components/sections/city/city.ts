import { Component, inject, OnInit } from '@angular/core';
import { CityCard } from '../../ui-kit/city/city-card/city-card';
import { ActivatedRoute } from '@angular/router';
import { CityStore } from '../../../stores/city-store';

@Component({
  selector: 'app-city',
  imports: [CityCard],
  templateUrl: './city.html',
  styleUrl: './city.scss',
})
export class City implements OnInit {
  private cityStore = inject(CityStore);
  private router = inject(ActivatedRoute);

  cityWeather = this.cityStore.cityWeather;

  ngOnInit(): void {
    const lat = Number(this.router.snapshot.paramMap.get('lat'));
    const lon = Number(this.router.snapshot.paramMap.get('lon'));

    if (isNaN(lat) || isNaN(lon)) return;

    this.cityStore.loadCityWeatherByCoords(lat, lon);
  }
}
