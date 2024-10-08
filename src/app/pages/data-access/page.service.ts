import { Injectable } from '@angular/core';
import { StrapiService } from '../../shared/data-access/strapi.service';

@Injectable({
  providedIn: 'root'
})
export class PageService extends StrapiService {

  getPageBySlug(slug: string) {
    return this.get(`pages?slug=${slug}`);
  }
}
