import { Component } from '@angular/core';
import { PageService } from '../../data-access/page.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Page, PageResponse } from '../../utils/page.model';


@Component({
  selector: 'app-site-map',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './site-map.component.html',
  styleUrl: './site-map.component.scss'
})
export class SiteMapComponent {

  pages!: PageResponse;

  constructor(private pageService: PageService) {

    this.pageService.getPages().subscribe(pages => {
      console.log('siteMap', pages);
      this.pages = pages;
    });
  }

  getChildPages(pageId: number): Page[] {
    return this.pages.data.filter( page => page.parentPage?.id === pageId);
  }

  hasChildren(pageId: number): boolean {
    return this.getChildPages(pageId).length > 0;
  }
}
