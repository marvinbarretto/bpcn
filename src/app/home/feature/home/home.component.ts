import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../auth/data-access/auth.store';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NewsService } from '../../../news/data-access/news.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authStore = inject(AuthStore);

  constructor(private newsService: NewsService) {
    this.newsService.getNews().subscribe((news) => {
      console.log('news', news);
    });
  }
}
