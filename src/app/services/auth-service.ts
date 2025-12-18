import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CityWeather, UserCity } from '../interfaces/city-interface';
import { UserStore } from '../stores/user-store';

export interface User {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
  city: UserCity;
  favoriteCities: CityWeather[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private userStore = inject(UserStore);
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
    effect(() => {
      const currentUser = this.currentUser();
      if (currentUser) {
        this.userStore.setUser(currentUser);
      } else {
        this.userStore.resetUser();
      }
    });
  }

  private getUsers(): User[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }
  private getCurrentUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY) || 'null');
  }

  private updateCurrentUser(updatedCurrentUser: User): void {
    this.currentUser.set(updatedCurrentUser);
    this.users.update((users) =>
      users.map((user) =>
        user.id === updatedCurrentUser.id ? updatedCurrentUser : user
      )
    );
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
      city: { value: 2643743, label: 'London', lat: 51.5081, lon: -0.1278 },
      favoriteCities: [],
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

  addFavoriteCity(city: CityWeather): void {
    const currentUser = this.currentUser();
    if (!currentUser) {
      this.userStore.addFavoriteCity(city);
      return;
    }

    const updatedCurrentUser: User = {
      ...currentUser,
      favoriteCities: [city, ...currentUser.favoriteCities],
    };

    this.updateCurrentUser(updatedCurrentUser);
  }
  removeFavoriteCity(city: CityWeather): void {
    const currentUser = this.currentUser();
    if (!currentUser) {
      this.userStore.removeFavoriteCity(city);
      return;
    }

    const updatedCurrentUser: User = {
      ...currentUser,
      favoriteCities: currentUser.favoriteCities.filter(
        (favCity) =>
          favCity.coord.lat !== city.coord.lat &&
          favCity.coord.lon !== city.coord.lon
      ),
    };

    this.updateCurrentUser(updatedCurrentUser);
  }

  updateCity(city: UserCity): void {
    const currentUser = this.currentUser();
    if (!currentUser) {
      this.userStore.updateCity(city);
      return;
    }

    const updatedCurrentUser: User = {
      ...currentUser,
      city,
    };

    this.updateCurrentUser(updatedCurrentUser);
  }
}
