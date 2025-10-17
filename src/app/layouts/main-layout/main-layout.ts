import { Component } from '@angular/core';
import { Header } from '../../components/sections/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../components/sections/footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
