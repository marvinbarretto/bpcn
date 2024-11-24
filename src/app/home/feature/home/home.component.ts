import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '../../../auth/data-access/auth.store';
import { AccessibilityComponent } from '../../../shared/feature/accessibility/accessibility.component';
import { FeatureFlagPipe } from '../../../shared/utils/feature-flag.pipe';
import { SearchComponent } from '../../../shared/feature/search/search.component';

@Component({
    selector: 'app-home',
    imports: [RouterModule, CommonModule, AccessibilityComponent, FeatureFlagPipe, SearchComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  authStore = inject(AuthStore);
}
