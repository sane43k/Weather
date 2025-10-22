import { Component } from '@angular/core';
import { TranslatePipe } from '../../../../pipes/translate-pipe';

@Component({
  selector: 'app-city-preview-card',
  imports: [TranslatePipe],
  templateUrl: './city-preview-card.html',
  styleUrl: './city-preview-card.scss',
})
export class CityPreviewCard {}
