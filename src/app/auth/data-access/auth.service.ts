import { Injectable } from '@angular/core';
import { AuthResponse, RegisterPayload } from '../utils/auth.model';
import { Observable } from 'rxjs';
import { StrapiService } from '../../shared/data-access/strapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends StrapiService {

  // Register new user
  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.post<AuthResponse>(`auth/local/register`, payload);
  }

  // User login
  login(payload: { identifier: string; password: string }): Observable<AuthResponse> {
    return this.post<AuthResponse>(`auth/local`, payload);
  }
}
