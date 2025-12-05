import { Component, Input } from '@angular/core';
import { TemperaturePipe } from '../../../../pipes/temperature-pipe';
import { Forecast3Hour } from '../../../../interfaces/forecast-interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-three-hour-forecast-card',
  imports: [TemperaturePipe, DatePipe],
  templateUrl: './three-hour-forecast-card.html',
  styleUrl: './three-hour-forecast-card.scss',
})
export class ThreeHourForecastCard {
  @Input() forecast3Hour: Forecast3Hour | null = null;
  @Input() datePipeOption: string = 'dd.MM HH:mm';
}
