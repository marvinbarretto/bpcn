import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../auth/data-access/auth.store';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NewsService } from '../../../news/data-access/news.service';
import { AccessibilityComponent } from '../../../shared/feature/accessibility/accessibility.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, AccessibilityComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authStore = inject(AuthStore);


}
