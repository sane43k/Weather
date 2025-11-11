import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TogglersStore } from '../stores/togglers-store';
import { CityInfo, CityWeather } from '../interfaces/city-interface';

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
}
