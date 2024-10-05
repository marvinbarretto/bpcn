import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../data-access/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authStore = inject(AuthStore);

  identifier = 'test0209@test0209.com';
  password = 'test0209';

  onLogin() {
    if (this.identifier && this.password) {
      this.authStore.login(this.identifier, this.password);
    }
  }
}
