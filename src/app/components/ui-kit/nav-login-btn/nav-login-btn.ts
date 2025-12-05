import { Component, inject, computed } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate-pipe';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { UserStore } from '../../../stores/user-store';

@Component({
  selector: 'app-nav-login-btn',
  imports: [TranslatePipe],
  templateUrl: './nav-login-btn.html',
  styleUrl: './nav-login-btn.scss',
})
export class NavLoginBtn {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userStore = inject(UserStore);

  isLoggedIn = computed<boolean>(() => !!this.userStore.id());

  handleClick(): void {
    if (this.isLoggedIn()) {
      this.authService.logOut();
    } else {
      this.router.navigate(['/login']);
    }
  }
}
