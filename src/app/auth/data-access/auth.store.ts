import { Injectable, signal } from "@angular/core";
import { User } from "../../users/utils/user.model";
import { AuthService } from "./auth.service";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthResponse, RegisterPayload } from "../utils/auth.model";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  user$$ = signal<User | null>(null);
  token$$ = signal<string | null>(null);
  loading$$ = signal<boolean>(false);
  error$$ = signal<string | null>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      console.log('loadUserFromStorage', user);
      this.token$$.set(token);
      this.user$$.set(JSON.parse(user));
    }
  }

  login(identifier: string, password: string) {
    this.loading$$.set(true);
    this.error$$.set(null);

    return this.authService.login({ identifier, password }).pipe(
      tap((response: AuthResponse) => this.handleLoginSuccess(response)),
      catchError((error: any) => {
        this.error$$.set(`Login failed ${error}`);
        this.loading$$.set(false);
        return of(null);
      })
    ).subscribe();
  }

  logout() {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    // Clear state
    this.token$$.set(null);
    this.user$$.set(null);
  }

  register(payload: RegisterPayload) {
    this.loading$$.set(true);
    this.error$$.set(null);

    return this.authService.register(payload).pipe(
      tap((response: AuthResponse) => this.handleLoginSuccess(response)),
      catchError((error: any) => {
        this.error$$.set(`Login failed ${error}`);
        this.loading$$.set(false);
        return of(null);
      })
    ).subscribe();
  }

  // Extracted side-effect function
  private handleLoginSuccess(response: AuthResponse) {
    // Update state
    this.user$$.set(response.user);
    this.token$$.set(response.jwt);

    console.log('response', response);

    // Persist to local storage
    localStorage.setItem('authToken', response.jwt);
    localStorage.setItem('user', JSON.stringify(response.user));

    this.router.navigate(['/']);

    // Housekeeping
    this.loading$$.set(false);
    this.error$$.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.token$$();
  }

  hasRole(role: string): boolean {
    return this.user$$()?.role === role;
  }
}
