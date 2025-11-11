import { Component, computed, inject } from '@angular/core';
import { TogglersStore } from '../../../../stores/togglers-store';

@Component({
  selector: 'app-units-toggle',
  imports: [],
  templateUrl: './units-toggle.html',
  styleUrl: './units-toggle.scss',
})
export class UnitsToggle {
  private togglersStore = inject(TogglersStore);

  units = this.togglersStore.units;
  buttonText = computed<string>(() => {
    switch (this.units()) {
      case 'standard':
        return 'K';
      case 'metric':
        return '°C';
      case 'imperial':
        return '°F';
    }
  });

  toggleUnits(): void {
    const newUnits =
      this.units() === 'metric'
        ? 'imperial'
        : this.units() === 'imperial'
        ? 'standard'
        : 'metric';
    this.togglersStore.updateUnits(newUnits);
  }
}
