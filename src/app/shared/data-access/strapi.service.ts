import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../../users/utils/user.model';
import { IEvent, IEventsRequest, IEventsResponse } from '../../events/utils/event.model';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private http = inject(HttpClient);
  private baseUrl = environment.strapiUrl;

  // TODO: Replace with interceptor, make use of HttpClient
  protected getGetHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${environment.strapiToken}`
    })
  }

  protected getPostHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${environment.strapiToken}`,
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
