import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CityWeather } from '../interfaces/city-interface';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { effect, inject, untracked } from '@angular/core';
import { TogglersStore } from './togglers-store';
import { WeatherService } from '../services/weather-service';
import { forkJoin } from 'rxjs';

interface DashboardState {
  cities: CityWeather[];
}

const initialState: DashboardState = {
  cities: [],
};

export const DashboardStore = signalStore(
  { providedIn: 'root' },
  withDevtools('dashboardState'),
  withState(initialState),
  withMethods((store) => {
    const weatherService = inject(WeatherService);
    const togglersStore = inject(TogglersStore);

    const updateCities = (cities: CityWeather[]) =>
      patchState(store, { cities });

    const loadCityWeatherByCoords = (): void => {
      const cities = store.cities();

      if (cities.length === 0) {
        patchState(store, { cities: [] });
        return;
      }

      const citiesWeatherRequests = cities.map((city) =>
        weatherService.getCityWeatherByCoords(city.coord.lat, city.coord.lon)
      );

      forkJoin(citiesWeatherRequests).subscribe((citiesWeather) =>
        patchState(store, { cities: citiesWeather })
      );
    };

    effect(() => {
      const units = togglersStore.units();
      const language = togglersStore.language();

      untracked(() => loadCityWeatherByCoords());
    });

    return {
      updateCities,
    };
  })
);
