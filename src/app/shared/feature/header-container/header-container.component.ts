import { Component } from '@angular/core';
import { AuthStore } from '../../../auth/data-access/auth.store';
import { HeaderComponent } from '../../ui/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-container',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './header-container.component.html',
  styleUrl: './header-container.component.scss'
})
export class HeaderContainerComponent {
  constructor(public authStore: AuthStore) {}

  get isLoggedIn(): boolean {
    return !!this.authStore.token$$();
  }

  get username(): string | null {
    return this.authStore.user$$()?.username || null;
  }
}