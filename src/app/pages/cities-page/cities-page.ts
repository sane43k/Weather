import { Component } from '@angular/core';
import { Cities } from '../../components/sections/cities/cities';

@Component({
  selector: 'app-cities-page',
  imports: [Cities],
  templateUrl: './cities-page.html',
  styleUrl: './cities-page.scss',
})
export class CitiesPage {}
