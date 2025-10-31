import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export interface User {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private USERS_KEY = 'users';
  private CURRENT_USER_KEY = 'currentUser';

  users = signal<User[]>(this.getUsers());
  currentUser = signal<User | null>(this.getCurrentUser());

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    effect(() =>
      localStorage.setItem(this.USERS_KEY, JSON.stringify(this.users()))
    );
    effect(() =>
      localStorage.setItem(
        this.CURRENT_USER_KEY,
        JSON.stringify(this.currentUser())
      )
    );
  }

  private getUsers(): User[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }
  private getCurrentUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY) || 'null');
  }

  signUp(email: string, password: string): boolean {
    const exists = this.users().find((user) => user.email === email);
    if (exists) return false;

    const nextId =
      this.users().length > 0
        ? Math.max(...this.users().map((user) => user.id)) + 1
        : 1;

    const newUser: User = {
      id: nextId,
      email,
      password,
      role: 'user',
    };

    this.users.update((users) => [...users, newUser]);
    this.currentUser.set(newUser);
    return true;
  }

  logIn(email: string, password: string): boolean {
    const currentUser = this.users().find(
      (user) => user.email === email && user.password === password
    );
    if (!currentUser) return false;

    this.currentUser.set(currentUser);
    return true;
  }

  logOut(): void {
    this.currentUser.set(null);
  }
}
