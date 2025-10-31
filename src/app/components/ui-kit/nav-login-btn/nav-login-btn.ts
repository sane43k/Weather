import { Component, inject, computed } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-login-btn',
  imports: [TranslatePipe],
  templateUrl: './nav-login-btn.html',
  styleUrl: './nav-login-btn.scss',
})
export class NavLoginBtn {
  private router = inject(Router);
  private authService = inject(AuthService);

  isLoggedIn = computed<boolean>(() => !!this.authService.currentUser());

  handleClick(): void {
    if (this.isLoggedIn()) {
      this.authService.logOut();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
