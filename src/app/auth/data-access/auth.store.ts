import { Injectable, signal } from "@angular/core";
import { User } from "../../users/utils/user.model";
import { AuthService } from "./auth.service";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthResponse, RegisterPayload } from "../utils/auth.model";
import { Router } from "@angular/router";
import { UserService } from "../../users/data-access/user.service";
import { Roles } from "../utils/roles.enum";


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
    private userService: UserService,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
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

    this.router.navigate(['/']);
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

  private handleLoginSuccess(response: AuthResponse) {
    this.token$$.set(response.jwt);
    localStorage.setItem('authToken', response.jwt);

    // NOTE: Unfortunately we dont get enough information about the user in the response so we have to make a call to the userService to get the user with role
    this.userService.getUserDetails().subscribe((user: User) => {
      this.user$$.set(user);
      localStorage.setItem('user', JSON.stringify(user));

      this.loading$$.set(false);
      this.error$$.set(null);

      this.router.navigate(['/']);
    }, (error: any) => {
      this.error$$.set(`Login failed ${error}`);
      this.loading$$.set(false);
    });
  }

  isAuthenticated(): boolean {
    return !!this.token$$();
  }

  hasRole(role: Roles): boolean {
    return this.user$$()?.role.name === role;
  }

  // TODO: Sort these out in Strapi
  canCreateEvent(): boolean {
    return true;
  }

  canCreateArticle(): boolean {
    return true;
  }

  canCreateUser(): boolean {
    return true;
  }

  canReviewEvents(): boolean {
    return true;
  }

  // TODO: need roles for:
    // - public
    // - authenticated
    // - canCreateEvent
    // - canCreateArticle
    // - admin
    // - superAdmin

}
