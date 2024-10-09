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
  page: any = null;

  constructor(
    private route: ActivatedRoute,
    public pageStore: PageStore,
    private pageService: PageService
  ) {}

  // ngOnInit() {
  //   // Subscribe to the resolved page data
  //   this.route.data.subscribe(data => {
  //     if (data['page']) {
  //       console.log('PageComponent: Resolved Page:', data['page']);
  //       this.page = data['page'];

  //       this.pageStore.loadPage(this.page.page.slug);
  //     } else {
  //       console.error('PageComponent: No page resolved');
  //     }
  //   });
  // }

  ngOnInit() {
    // Subscribe to the resolved page data
    this.route.data.subscribe(data => {
      if (data['page']) {
        console.log('PageComponent: Resolved Page:', data['page']);
        // Instead of calling loadPage(), we directly set the page$$ signal
        this.pageStore.page$$.set(data['page'].page); // Assuming the resolved data contains page object
      } else {
        console.error('PageComponent: No page resolved');
      }
    });
  }
}
