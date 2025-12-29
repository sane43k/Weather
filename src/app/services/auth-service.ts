import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CityWeather, UserCity } from '../interfaces/city-interface';
import { UserStore } from '../stores/user-store';
import { DashboardStore } from '../stores/dashboard-store';

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
  private dashboardStore = inject(DashboardStore);
  private USERS_KEY = 'users';
  private CURRENT_USER_KEY = 'currentUser';
  private DASHBOARD_CITIES_KEY = 'dashboardCities';

  users = signal<User[]>(this.getUsers());
  currentUser = signal<User | null>(this.getCurrentUser());
  dashboardCities = signal<CityWeather[]>(this.getDashboardCities());

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
    effect(() =>
      localStorage.setItem(
        this.DASHBOARD_CITIES_KEY,
        JSON.stringify(this.dashboardCities())
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
    effect(() => this.dashboardStore.updateCities(this.dashboardCities()));
  }

  private getUsers(): User[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }
  private getCurrentUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY) || 'null');
  }
  private getDashboardCities(): CityWeather[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    return JSON.parse(localStorage.getItem(this.DASHBOARD_CITIES_KEY) || '[]');
  }

  private updateCurrentUser(updatedCurrentUser: User): void {
    this.currentUser.set(updatedCurrentUser);
    this.users.update((users) =>
      users.map((user) => {
        if (user.id === updatedCurrentUser.id) {
          return updatedCurrentUser;
        }

        if (this.currentUser()?.role === 'admin' && user.role === 'admin') {
          return {
            ...user,
            favoriteCities: updatedCurrentUser.favoriteCities,
          };
        }

        return user;
      })
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

    // const newUser: User = {
    //   id: nextId,
    //   email,
    //   password,
    //   role: 'admin',
    //   city: { value: 2643743, label: 'London', lat: 51.5081, lon: -0.1278 },
    //   favoriteCities: this.dashboardCities(),
    // };

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

    if (currentUser.role === 'admin') {
      this.dashboardCities.set([city, ...this.dashboardCities()]);
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

    if (currentUser.role === 'admin') {
      this.dashboardCities.set(
        this.dashboardCities().filter(
          (dashboardCity) =>
            dashboardCity.coord.lat !== city.coord.lat &&
            dashboardCity.coord.lon !== city.coord.lon
        )
      );
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
