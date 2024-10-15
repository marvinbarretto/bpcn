import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSnippet } from '../../utils/news/news.model';
import { NewsService } from '../../data-access/news.service';
@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent {
  news: NewsSnippet[] = [];
  constructor(private newsService: NewsService) {

  }

  ngOnInit() {
    this.newsService.getNews().subscribe((news: NewsSnippet[]) => {
      console.log('news', news);

      this.news = news;
    });
  }
}
