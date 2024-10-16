import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSnippet } from '../../utils/news/news.model';
import { NewsService } from '../../data-access/news.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
  news: NewsSnippet[] = [];
  errorMessage: string | null = null;
  isLoading = true;
  constructor(private newsService: NewsService) {}

  ngOnInit() {

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
      });
  }
}
