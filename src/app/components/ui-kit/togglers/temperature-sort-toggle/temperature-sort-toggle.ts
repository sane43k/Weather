import { Component, effect, inject, signal, untracked } from '@angular/core';
import { CitiesStore } from '../../../../stores/cities-store';

@Component({
  selector: 'app-temperature-sort-toggle',
  imports: [],
  templateUrl: './temperature-sort-toggle.html',
  styleUrl: './temperature-sort-toggle.scss',
})
export class TemperatureSortToggle {
  private citiesStore = inject(CitiesStore);

  buttonText = signal<'t' | 't↑' | 't↓'>('t');

  constructor() {
    effect(() => {
      const citiesWeather = untracked(() => this.citiesStore.citiesWeather());
      const unsortedCitiesWeather = this.citiesStore.unsortedCitiesWeather();
      let sorted: typeof citiesWeather;

      if (citiesWeather.length === 0) return;

      switch (this.buttonText()) {
        case 't':
          sorted = [...unsortedCitiesWeather];
          break;
        case 't↑':
          sorted = [...citiesWeather].sort((a, b) => a.main.temp - b.main.temp);
          break;
        case 't↓':
          sorted = [...citiesWeather].sort((a, b) => b.main.temp - a.main.temp);
          break;
      }

      this.citiesStore.updateCitiesWeather(sorted);
    });
  }

  toggleTempSort(): void {
    switch (this.buttonText()) {
      case 't':
        this.buttonText.set('t↑');
        break;
      case 't↑':
        this.buttonText.set('t↓');
        break;
      case 't↓':
        this.buttonText.set('t');
        break;
    }
  }
}
