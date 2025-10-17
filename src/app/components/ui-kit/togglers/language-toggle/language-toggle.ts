import { Component, computed, inject } from '@angular/core';
import { TranslationService } from '../../../../services/translation-service';
import { TogglersStore } from '../../../../stores/togglers-store';

@Component({
  selector: 'app-language-toggle',
  imports: [],
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  private togglersStore = inject(TogglersStore);
  // private translationService = inject(TranslationService);

  lang = this.togglersStore.language;
  // lang = this.translationService.lang;
  buttonText = computed<string>(() => (this.lang() === 'en' ? 'EN' : 'RU'));

  toggleLang(): void {
    const newLang = this.lang() === 'en' ? 'ru' : 'en';
    this.togglersStore.setLang(newLang);
    // this.translationService.setLanguage(newLang);
  }
}
