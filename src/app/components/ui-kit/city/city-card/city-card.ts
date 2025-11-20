import { Component, Input } from '@angular/core';
import { TemperaturePipe } from '../../../../pipes/temperature-pipe';
import { TranslatePipe } from '../../../../pipes/translate-pipe';
import { CityWeather } from '../../../../interfaces/city-interface';

@Component({
  selector: 'app-city-card',
  imports: [TemperaturePipe, TranslatePipe],
  templateUrl: './city-card.html',
  styleUrl: './city-card.scss',
})
export class CityCard {
  @Input() cityWeather: CityWeather | null = null;
}
