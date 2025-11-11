import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { CustomInput } from '../../form-controls/custom-input/custom-input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../../pipes/translate-pipe';
import { CitiesStore } from '../../../../stores/cities-store';
import { Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-form',
  imports: [CustomInput, ReactiveFormsModule, TranslatePipe],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss',
})
export class SearchForm {
  private fb = inject(FormBuilder);
  private citiesStore = inject(CitiesStore);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private destroy$ = new Subject<void>();

  searchForm: FormGroup = this.fb.group({
    searchValue: [''],
  });
  citiesInfo = this.citiesStore.citiesInfo;
  searchHistory = this.citiesStore.searchHistory;
  isOpened = signal<boolean>(false);

  ngOnInit(): void {
    this.searchForm
      .get('searchValue')
      ?.valueChanges.pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((cityName) => {
        this.citiesStore.loadCitiesInfoByName(cityName);
      });
  }

  onSelectCity(cityName: string): void {
    this.searchForm.patchValue({ searchValue: cityName });
  }

  onSubmit(): void {
    this.citiesStore.loadCityWeatherByCoords();
    this.citiesStore.updateSearchHistory(
      this.searchForm.get('searchValue')?.value
    );
    this.router.navigate(['cities']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (this.elementRef.nativeElement.contains(target)) {
      this.isOpened.set(true);
    } else {
      this.isOpened.set(false);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
