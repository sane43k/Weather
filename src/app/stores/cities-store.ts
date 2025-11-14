import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CityInfo, CityWeather } from '../interfaces/city-interface';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { effect, inject, untracked } from '@angular/core';
import { WeatherService } from './../services/weather-service';
import { forkJoin } from 'rxjs';
import { TogglersStore } from './togglers-store';

interface CitiesState {
  citiesInfo: CityInfo[];
  citiesWeather: CityWeather[];
  unsortedCitiesWeather: CityWeather[];
  searchHistory: string[];
}

const initialState: CitiesState = {
  citiesInfo: [],
  citiesWeather: [],
  unsortedCitiesWeather: [],
  searchHistory: [],
};

export const CitiesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('citiesState'),
  withState(initialState),
  withMethods((store) => {
    const weatherService = inject(WeatherService);
    const togglersStore = inject(TogglersStore);

    const loadCitiesInfoByName = (cityName: string): void => {
      if (cityName.length === 0) {
        patchState(store, { citiesInfo: [] });
        return;
      }

      weatherService
        .getCitiesInfoByName(cityName)
        .subscribe((citiesInfo) => patchState(store, { citiesInfo }));
    };

    const loadCityWeatherByCoords = (): void => {
      const cities = store.citiesInfo();

      if (cities.length === 0) {
        patchState(store, { citiesWeather: [], unsortedCitiesWeather: [] });
        return;
      }

      const citiesWeatherRequests = cities.map((city) =>
        weatherService.getCityWeatherByCoords(city.lat, city.lon)
      );

      forkJoin(citiesWeatherRequests).subscribe((citiesWeather) =>
        patchState(store, {
          citiesWeather: citiesWeather,
          unsortedCitiesWeather: citiesWeather,
        })
      );
    };

    const updateCitiesWeather = (citiesWeather: CityWeather[]): void =>
      patchState(store, { citiesWeather });

    const updateSearchHistory = (cityName: string): void => {
      if (!cityName || cityName.trim() === '') return;

      const limitedHistory = [
        ...new Set([cityName, ...store.searchHistory()]),
      ].slice(0, 10);

      patchState(store, {
        searchHistory: limitedHistory,
      });
    };

    effect(() => {
      const units = togglersStore.units();
      const language = togglersStore.language();
      const hasCities = untracked(() => store.citiesInfo().length > 0);

      if (hasCities) {
        loadCityWeatherByCoords();
      }
    });

    return {
      loadCitiesInfoByName,
      loadCityWeatherByCoords,
      updateCitiesWeather,
      updateSearchHistory,
    };
  })
);
