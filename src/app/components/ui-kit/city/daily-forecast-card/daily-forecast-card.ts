import { Component, Input } from '@angular/core';
import { TemperaturePipe } from '../../../../pipes/temperature-pipe';
import { TranslatePipe } from '../../../../pipes/translate-pipe';
import { DayForecast } from '../../../../interfaces/forecast-interface';

@Component({
  selector: 'app-daily-forecast-card',
  imports: [TemperaturePipe, TranslatePipe],
  templateUrl: './daily-forecast-card.html',
  styleUrl: './daily-forecast-card.scss',
})
export class DailyForecastCard {
  @Input() dayForecast: DayForecast | null = null;
}
