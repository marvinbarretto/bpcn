import { Component } from '@angular/core';
import { AuthStore } from '../../../auth/data-access/auth.store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Roles } from '../../../auth/utils/roles.enum';
import { FeatureFlagPipe } from '../../utils/feature-flag.pipe';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, RouterModule, FeatureFlagPipe],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  public Roles = Roles;
  constructor(public authStore: AuthStore) {}

  get isLoggedIn(): boolean {
    return !!this.authStore.token$$();
  }

  get username(): string | null {
    return this.authStore.user$$()?.username || null;
  }

  get role(): string | null {
    return this.authStore.user$$()?.role?.name || 'No Role';
  }


  // Console out the contents of authStore
  ngOnInit() {
    console.log(this.authStore.user$$());

  }
}
