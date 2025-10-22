import { Component } from '@angular/core';
import { Cities } from '../../components/sections/cities/cities';

@Component({
  selector: 'app-main-page',
  imports: [Cities],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {}
