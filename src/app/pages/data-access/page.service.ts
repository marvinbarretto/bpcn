import { Injectable } from '@angular/core';
import { StrapiService } from '../../shared/data-access/strapi.service';
import { Page, PageResponse } from '../utils/page.model';
import { catchError, map, Observable } from 'rxjs';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class PageService extends StrapiService {

  // https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
  getPageBySlug(slug: string): Observable<Page> {
    return this.get<PageResponse>(`pages?filters[slug][$eq]=${slug}`).pipe(
      map(response => response.data[0]),
      catchError(this.handleError)
    );
  }

  getPages(): Observable<Page[]> {
    return this.get<PageResponse>('pages?populate[parentPage]=*').pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // NOTE: Use this syntax later for specific queries
  // getSiteMap() {
  //   return this.get<PageResponse>(
  //     `pages?fields[0]=id&fields[1]=title&fields[2]=slug
  //     &populate[parentPage][fields][0]=id
  //     &populate[parentPage][fields][1]=title
  //     &populate[parentPage][fields][2]=slug`
  //   );
  // }

}
