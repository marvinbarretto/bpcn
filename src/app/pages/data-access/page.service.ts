import { Injectable } from '@angular/core';
import { StrapiService } from '../../shared/data-access/strapi.service';
import { PageResponse } from '../utils/page.model';


@Injectable({
  providedIn: 'root'
})
export class PageService extends StrapiService {

  getPageBySlug(slug: string) {
    return this.get(`pages?filters[slug][$eq]=${slug}`);
  }

  getPages() {
    return this.get<PageResponse>('pages?populate[parentPage]=*');
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
