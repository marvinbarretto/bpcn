import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSnippet } from '../../utils/news/news.model';
import { NewsService } from '../../data-access/news.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PaginationService } from '../../../shared/data-access/pagination.service';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { DateComponent } from '../../../shared/ui/date/date.component';
@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, DateComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
  news: NewsSnippet[] = [];
  paginatedNews: NewsSnippet[] = [];
  errorMessage: string | null = null;
  isLoading = true;


  sortDescending = true;

  constructor(
    private newsService: NewsService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.fetchNews();
  }

  getTotalPages() {
    return this.paginationService.getTotalPages(this.news.length, 10);
  }

  fetchNews() {
    this.newsService.getNews()
      .pipe(
        catchError((error) => {
          console.error('Error fetching news', error);
          this.errorMessage = 'Error fetching news';
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe((news: NewsSnippet[]) => {
        this.news = news;
        this.isLoading = false;

        this.updatePaginatedNews(1);
      });
  }

  // Update paginated news when the page changes
  updatePaginatedNews(page: number) {
    const pageSize = 10; // Default page size (can be customized)
    this.paginatedNews = this.paginationService.paginate(
      this.news,
      page,
      pageSize,
      this.sortDescending ? this.sortByDateDesc : undefined
    );
  }

  sortByDateDesc(a: NewsSnippet, b: NewsSnippet): number {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  }

  // When the PaginationComponent emits a page change event
  onPageChange(page: number) {
    this.updatePaginatedNews(page);
  }

  getDate(dateString: string): Date {
    return new Date(dateString);
  }

}
