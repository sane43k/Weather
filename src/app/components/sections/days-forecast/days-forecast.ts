import { Component, computed, inject } from '@angular/core';
import { CityStore } from '../../../stores/city-store';
import { ThreeHourForecastCard } from '../../ui-kit/city/three-hour-forecast-card/three-hour-forecast-card';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import {
  LineChart,
  LineChartElement,
} from '../../ui-kit/line-chart/line-chart';

@Component({
  selector: 'app-days-forecast',
  imports: [ThreeHourForecastCard, LineChart],
  templateUrl: './days-forecast.html',
  styleUrl: './days-forecast.scss',
  providers: [DatePipe, TranslatePipe],
})
export class DaysForecast {
  private cityStore = inject(CityStore);
  private datePipe = inject(DatePipe);
  private translatePipe = inject(TranslatePipe);

  daysForecast = this.cityStore.daysForecast;
  chartData = computed<LineChartElement[]>(() => [
    {
      name: this.translatePipe.transform('temperature'),
      series: this.daysForecast().map((dayForecast) => ({
        value: Math.round(dayForecast.main.temp),
        name: this.datePipe.transform(dayForecast.dt_txt, 'dd.MM'),
      })),
    },
  ]);
}
