import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError,  Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private http = inject(HttpClient);
  private baseUrl: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('INITIAL_ENV') private initialEnv: any
  ) {
    this.baseUrl = `${this.initialEnv.strapiUrl}/api`;
  }

  getStrapiUrl() {
    return this.initialEnv.strapiUrl;
  }

  getStrapiToken() {
    return this.initialEnv.strapiToken;
  }

  private getAuthToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // TODO: Replace with interceptor, make use of HttpClient
  protected getGetHeaders(): HttpHeaders {
    const token = this.getAuthToken() || this.getStrapiToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  protected getPostHeaders(): HttpHeaders {
    const token = this.getAuthToken() || this.getStrapiToken();
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
