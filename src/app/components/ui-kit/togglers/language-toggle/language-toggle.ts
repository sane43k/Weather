import { Component, computed, effect, inject } from '@angular/core';
import { TogglersStore } from '../../../../stores/togglers-store';
import { TranslationService } from '../../../../services/translation-service';

@Component({
  selector: 'app-language-toggle',
  imports: [],
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  private togglersStore = inject(TogglersStore);
  private translationService = inject(TranslationService);

  lang = this.togglersStore.language;
  buttonText = computed<string>(() => (this.lang() === 'en' ? 'EN' : 'RU'));

  constructor() {
    effect(() => {
      const lang = this.lang();
      queueMicrotask(() => this.translationService.loadTranslations(lang));
    });
  }

  toggleLang(): void {
    const newLang = this.lang() === 'en' ? 'ru' : 'en';
    this.togglersStore.updateLanguage(newLang);
  }
}
