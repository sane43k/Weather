import { Component, computed, inject } from '@angular/core';
import { TogglersStore } from '../../../../stores/togglers-store';

@Component({
  selector: 'app-language-toggle',
  imports: [],
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  private togglersStore = inject(TogglersStore);

  lang = this.togglersStore.language;
  buttonText = computed<string>(() => (this.lang() === 'en' ? 'EN' : 'RU'));

  toggleLang(): void {
    const newLang = this.lang() === 'en' ? 'ru' : 'en';
    this.togglersStore.setLang(newLang);
  }
}
