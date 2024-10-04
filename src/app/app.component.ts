import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StrapiService } from './shared/data-access/strapi.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bpcn';
  users: any;

  constructor(private authService:  StrapiService) {
    this.authService.getUsers().subscribe((users) => {
      console.log('users:', users);
      this.users = users;
    });
  }
}
