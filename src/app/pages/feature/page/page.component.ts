import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageStore } from '../../data-access/page.store';
import { CommonModule, JsonPipe } from '@angular/common';

import { Page } from '../../utils/page.model';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public pageStore: PageStore,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      // Ensure the data thats come through the resolver contains a page object
      const resolvedPage = data['page'] as { page: Page; fullPath: string } | null;

      if (resolvedPage && resolvedPage.page) {
        console.log('PageComponent: Resolved Page:', resolvedPage);
        this.pageStore.page$$.set(resolvedPage.page);
      }
    });
  }
}
