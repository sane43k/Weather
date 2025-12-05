import {
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  untracked,
} from '@angular/core';
import { Select } from '../../form-controls/select/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserCity } from '../../../../interfaces/city-interface';
import { UserStore } from '../../../../stores/user-store';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-city-select-form',
  imports: [ReactiveFormsModule, Select],
  templateUrl: './city-select-form.html',
  styleUrl: './city-select-form.scss',
})
export class CitySelectForm implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userStore = inject(UserStore);
  private authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  citySelectForm: FormGroup = this.fb.group({
    city: [''],
  });
  citiesList: UserCity[] = [
    { value: 2643743, label: 'London', lat: 51.5081, lon: -0.1278 },
    { value: 2988507, label: 'Paris', lat: 48.8535, lon: 2.3484 },
    { value: 625143, label: 'Minsk', lat: 53.9025, lon: 27.5618 },
  ];

  constructor() {
    effect(() => {
      const userId = this.userStore.id();
      this.citySelectForm
        .get('city')
        ?.patchValue(untracked(() => this.userStore.city().value));
    });
    effect(() => {
      const userCity = this.userStore.city();
      this.router.navigate(['']);
    });
  }

  ngOnInit(): void {
    this.citySelectForm
      .get('city')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        console.log('citySelectForm valueChanges');

        const userCity = this.citiesList.find((city) => city.value === value);
        if (!userCity) return;

        this.authService.updateCity(userCity);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
