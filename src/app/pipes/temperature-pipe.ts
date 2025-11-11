import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) return '-°';
    return `${Math.round(value)}°`;
  }
}
