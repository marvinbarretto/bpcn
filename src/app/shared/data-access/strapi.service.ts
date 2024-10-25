import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError,  Observable, throwError } from 'rxjs';
import { environment } from '../../environment';

import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private http = inject(HttpClient);
  private baseUrl = environment.strapiUrl;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getAuthToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // TODO: Replace with interceptor, make use of HttpClient
  protected getGetHeaders(): HttpHeaders {
    const token = this.getAuthToken() || environment.strapiToken;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  protected getPostHeaders(): HttpHeaders {
    const token = this.getAuthToken() || environment.strapiToken;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
  }

  get<T>(endpoint: string): Observable<T> {
    const headers = this.getGetHeaders();
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.getPostHeaders();
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: any): Observable<never> {
    console.error('StrapiService error:', error);
    return throwError(() => new Error('StrapiService error'));
  }
}
