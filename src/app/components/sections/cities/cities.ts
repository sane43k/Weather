import { Component } from '@angular/core';
import { CityPreviewCard } from '../../ui-kit/city/city-preview-card/city-preview-card';

@Component({
  selector: 'app-cities',
  imports: [CityPreviewCard],
  templateUrl: './cities.html',
  styleUrl: './cities.scss',
})
export class Cities {}
