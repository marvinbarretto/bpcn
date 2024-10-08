import { Component } from '@angular/core';
import { PageService } from '../../data-access/page.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  page: any;
  error: string = '';
  loading: any;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    console.log('slug', slug);

    if (slug) {
      this.loadPage(slug);
    } else {
      this.error = 'Page not found';
    }
  }

  loadPage(slug: string) {
    this.pageService.getPageBySlug(slug).subscribe({
      next: (page) => {
        this.page = page;
      },
      error: (error) => {
        this.error = error;
      }
    });
  }
}
