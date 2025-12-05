import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../ui-kit/logo/logo';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { Sidebar } from '../../ui-kit/sidebar/sidebar';
import { NavLoginBtn } from '../../ui-kit/nav-login-btn/nav-login-btn';
import { SearchForm } from '../../ui-kit/forms/search-form/search-form';
import { CitySelectForm } from '../../ui-kit/forms/city-select-form/city-select-form';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    Logo,
    TranslatePipe,
    Sidebar,
    NavLoginBtn,
    SearchForm,
    CitySelectForm,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
