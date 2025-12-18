import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TranslatePipe } from '../../../pipes/translate-pipe';

export interface LineChartElement {
  name: string;
  series: {
    value: number;
    name: string | null;
  }[];
}

@Component({
  selector: 'app-line-chart',
  imports: [NgxChartsModule, TranslatePipe],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.scss',
})
export class LineChart {
  @Input() chartData: LineChartElement[] = [];
  @Input() legend: boolean = false;
  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
}
