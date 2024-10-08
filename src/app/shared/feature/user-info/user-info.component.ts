import { Component } from '@angular/core';
import { AuthStore } from '../../../auth/data-access/auth.store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  constructor(public authStore: AuthStore) {}

  get isLoggedIn(): boolean {
    return !!this.authStore.token$$();
  }

  get username(): string | null {
    return this.authStore.user$$()?.username || null;
  }
}
