import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TogglersStore } from '../stores/togglers-store';
import { CityInfo, CityWeather } from '../interfaces/city-interface';
import {
  DailyForecast,
  Forecast3HourFor5Days,
} from '../interfaces/forecast-interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private togglersStore = inject(TogglersStore);

  private apiKey: string = 'Paste your API key here';
  private apiUrl: string = 'https://api.openweathermap.org';

  getCitiesInfoByName(cityName: string): Observable<CityInfo[]> {
    return this.http.get<CityInfo[]>(
      `${this.apiUrl}/geo/1.0/direct?q=${cityName}&limit=5&appid=${this.apiKey}`
    );
  }

  getCityWeatherByCoords(lat: number, lon: number): Observable<CityWeather> {
    return this.http.get<CityWeather>(
      `${
        this.apiUrl
      }/data/2.5/weather?lat=${lat}&lon=${lon}&lang=${this.togglersStore.language()}&units=${this.togglersStore.units()}&appid=${
        this.apiKey
      }`
    );
  }

  get3HourForecastFor5DaysByCoords(
    lat: number,
    lon: number
  ): Observable<Forecast3HourFor5Days> {
    return this.http.get<Forecast3HourFor5Days>(
      `${
        this.apiUrl
      }/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=${this.togglersStore.language()}&units=${this.togglersStore.units()}&appid=${
        this.apiKey
      }`
    );
  }

  // Available only with paid subscriptions
  getDailyForecastByCoords(
    lat: number,
    lon: number
  ): Observable<DailyForecast> {
    return this.http.get<DailyForecast>(
      `${
        this.apiUrl
      }/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&lang=${this.togglersStore.language()}&units=${this.togglersStore.units()}&appid=${
        this.apiKey
      }`
    );
  }
}
