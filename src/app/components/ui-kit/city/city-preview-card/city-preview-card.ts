import { Component, Input } from '@angular/core';
import { TranslatePipe } from '../../../../pipes/translate-pipe';
import { CityWeather } from '../../../../interfaces/city-interface';
import { TemperaturePipe } from '../../../../pipes/temperature-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-city-preview-card',
  imports: [TranslatePipe, TemperaturePipe, RouterLink],
  templateUrl: './city-preview-card.html',
  styleUrl: './city-preview-card.scss',
})
export class CityPreviewCard {
  @Input() cityWeather?: CityWeather;
}
