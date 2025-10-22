import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Language } from '../stores/togglers-store';

@Injectable({
  providedIn: 'root',
})
export class TranslationService implements OnDestroy {
  private http = inject(HttpClient);
  private destroy$ = new Subject<void>();
  private translations: Record<string, any> = {};

  loadTranslations(lang: Language): void {
    this.http
      .get<Record<string, any>>(`/assets/languages/${lang}.json`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.translations = data));
  }

  translate(key: string, params?: Record<string, any>): string {
    let result = key.split('.').reduce((obj, k) => obj?.[k], this.translations);

    if (typeof result !== 'string') {
      return key;
    }

    if (params) {
      Object.keys(params).forEach((key) => {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        result = result['replace'](regex, params[key]);
      });
    }

    return result;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
