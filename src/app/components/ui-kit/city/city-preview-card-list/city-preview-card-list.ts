import { Component, Input } from '@angular/core';
import { CityWeather } from '../../../../interfaces/city-interface';
import { CityPreviewCard } from '../city-preview-card/city-preview-card';

@Component({
  selector: 'app-city-preview-card-list',
  imports: [CityPreviewCard],
  templateUrl: './city-preview-card-list.html',
  styleUrl: './city-preview-card-list.scss',
})
export class CityPreviewCardList {
  @Input() header: string = '';
  @Input() citiesWeather: CityWeather[] = [];
}
