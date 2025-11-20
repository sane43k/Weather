import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CityWeather } from '../interfaces/city-interface';
import {
  DailyForecast,
  Forecast3HourFor5Days,
} from '../interfaces/forecast-interface';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { effect, inject, untracked } from '@angular/core';
import { WeatherService } from '../services/weather-service';
import { TogglersStore } from './togglers-store';

interface CityState {
  cityWeather: CityWeather | null;
  forecast3HourFor5Days: Forecast3HourFor5Days | null;
  dailyForecast: DailyForecast | null;
}

const initialState: CityState = {
  cityWeather: null,
  forecast3HourFor5Days: null,
  dailyForecast: null,
};

export const CityStore = signalStore(
  { providedIn: 'root' },
  withDevtools('cityState'),
  withState(initialState),
  withMethods((store) => {
    const weatherService = inject(WeatherService);
    const togglersStore = inject(TogglersStore);

    const loadCityWeatherByCoords = (lat: number, lon: number): void => {
      weatherService
        .getCityWeatherByCoords(lat, lon)
        .subscribe((cityWeather) => patchState(store, { cityWeather }));
    };

    const load3HourForecastFor5DaysByCoords = (
      lat: number,
      lon: number
    ): void => {
      weatherService
        .get3HourForecastFor5DaysByCoords(lat, lon)
        .subscribe((forecast3HourFor5Days) =>
          patchState(store, { forecast3HourFor5Days })
        );
    };

    // Available only with paid subscriptions
    const loadDailyForecastByCoords = (lat: number, lon: number): void => {
      weatherService
        .getDailyForecastByCoords(lat, lon)
        .subscribe((dailyForecast) => patchState(store, { dailyForecast }));
    };

    effect(() => {
      const units = togglersStore.units();
      const language = togglersStore.language();

      const lat = untracked(
        () =>
          store.cityWeather()?.coord.lat ??
          store.forecast3HourFor5Days()?.city.coord.lat ??
          store.dailyForecast()?.city.coord.lat
      );
      const lon = untracked(
        () =>
          store.cityWeather()?.coord.lon ??
          store.forecast3HourFor5Days()?.city.coord.lon ??
          store.dailyForecast()?.city.coord.lon
      );

      if (!lat || !lon) return;

      loadCityWeatherByCoords(lat, lon);
      load3HourForecastFor5DaysByCoords(lat, lon);
      // loadDailyForecastByCoords(lat, lon);
    });

    return {
      loadCityWeatherByCoords,
      load3HourForecastFor5DaysByCoords,
      loadDailyForecastByCoords,
    };
  })
);
