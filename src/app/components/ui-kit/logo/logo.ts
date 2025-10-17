import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate-pipe';

@Component({
  selector: 'app-logo',
  imports: [TranslatePipe],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class Logo {
  @Input() iconColor: 'white' | 'black' | 'blue' = 'black';
  @Input() hideTextOnSmallScreen: boolean = false;

  private router = inject(Router);

  navigateToHome(): void {
    this.router.navigate(['']).then(() =>
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    );
  }
}
