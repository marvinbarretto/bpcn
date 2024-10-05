import { Component, inject } from '@angular/core';
import { AuthService } from '../../data-access/auth.service';
import { AuthStore } from '../../data-access/auth.store';
import { RegisterForm, RegisterPayload } from '../../utils/auth.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: RegisterForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private authStore: AuthStore
  ) {}
  // Q: Should we use functions now in modern angular instead of injecting services?

  onRegister() {
    if (this.form.password !== this.form.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    const registerPayload: RegisterPayload = {
      username: this.form.username,
      email: this.form.email,
      password: this.form.password
    };

    // this.authService.register(registerPayload).subscribe(
    //   (response) => {
    //     this.authStore.setUser(response.user);
    //     this.authStore.setToken(response.jwt);
    //     // Q: Why do we set these values in the authStore and the localStorage?

    //     localStorage.setItem('authToken', response.jwt);
    //     localStorage.setItem('user', JSON.stringify(response.user));
    //     this.error = null;

    //     // Q: I guess we should dispatch an action on the successful register?

    //     // Q: I suppose we should consider how we might refactor this code so that it doesn't need a manual subscription and it can be reactive in its nature

    //   },
    //   (error) => {
    //     this.error = 'Registration failed';
    //     console.error('Registration failed:', error);
    //   }
    // );
  }
}
