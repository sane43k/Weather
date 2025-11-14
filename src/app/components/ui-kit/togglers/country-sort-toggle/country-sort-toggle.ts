import { Component, inject, signal } from '@angular/core';
import { CitiesStore } from '../../../../stores/cities-store';

@Component({
  selector: 'app-country-sort-toggle',
  imports: [],
  templateUrl: './country-sort-toggle.html',
  styleUrl: './country-sort-toggle.scss',
})
export class CountrySortToggle {
  private citiesStore = inject(CitiesStore);

  buttonText = signal<'🌐' | '🌍'>('🌐');

  toggleCountrySort(): void {
    const citiesWeather = this.citiesStore.citiesWeather();
    const unsortedCitiesWeather = this.citiesStore.unsortedCitiesWeather();
    let sorted: typeof citiesWeather;

    switch (this.buttonText()) {
      case '🌐':
        this.buttonText.set('🌍');
        sorted = [...citiesWeather].sort((a, b) =>
          a.sys.country.localeCompare(b.sys.country)
        );
        break;
      case '🌍':
        this.buttonText.set('🌐');
        sorted = [...unsortedCitiesWeather];
        break;
    }

    this.citiesStore.updateCitiesWeather(sorted);
  }
}
