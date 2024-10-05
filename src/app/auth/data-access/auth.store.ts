import { Injectable, signal } from "@angular/core";
import { User } from "../../users/utils/user.model";
import { AuthService } from "./auth.service";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthResponse, RegisterPayload } from "../utils/auth.model";


@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  user$$ = signal<User | null>(null);
  token$$ = signal<string | null>(null);
  loading$$ = signal<boolean>(false);
  error$$ = signal<string | null>(null);

  constructor(private authService: AuthService) {
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

    return this.authService.login({ identifier, password }).pipe(
      tap((response: AuthResponse) => this.handleLoginSuccess(response)),
      catchError((error: any) => {
        this.handleLoginError(error);
        return of(null);
      })
    );
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

    return this.authService.register(payload).pipe(
      tap((response: AuthResponse) => this.handleLoginSuccess(response)),
      catchError((error: any) => {
        this.handleLoginError(error);
        return of(null);
      })
    );
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

    // Housekeeping
    this.loading$$.set(false);
    this.error$$.set(null);
  }

  // Handle error side-effect function
  private handleLoginError(error: any) {
    console.error('error', error);
    this.error$$.set('Login failed');
    this.loading$$.set(false);
  }

  isAuthenticated(): boolean {
    return !!this.token$$();
  }

  hasRole(role: string): boolean {
    return this.user$$()?.role === role;
  }
}
