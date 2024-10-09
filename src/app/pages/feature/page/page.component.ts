import { Component } from '@angular/core';
import { PageService } from '../../data-access/page.service';
import { ActivatedRoute } from '@angular/router';
import { PageStore } from '../../data-access/page.store';
import { CommonModule, JsonPipe } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  page = {} as any;

  constructor(
    private route: ActivatedRoute,
    public pageStore: PageStore,
    private pageService: PageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        // this.pageService.getPageBySlug(slug).pipe(
        //   tap( page => {
        //     console.log('Page:', page);
        //   }),
        // ).subscribe(page => {
        //   console.log('!', page);
        //   this.page = page;
        // });
        this.pageStore.loadPage(slug);
      }
    });
  }
}
