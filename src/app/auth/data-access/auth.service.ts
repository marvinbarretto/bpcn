import { Injectable } from '@angular/core';
import { AuthResponse, LoginPayload, RegisterPayload } from '../utils/auth.model';
import { Observable } from 'rxjs';
import { StrapiService } from '../../shared/data-access/strapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends StrapiService {
  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.post<AuthResponse>(`auth/local`, payload);
  }

  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.post<AuthResponse>(`auth/local/register`, payload);
  }

  logout(): Observable<any> {
    return this.post<any>(`auth/logout`, {});
  }
}
