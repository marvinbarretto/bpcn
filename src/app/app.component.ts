import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StrapiService } from './shared/data-access/strapi.service';
import { JsonPipe } from '@angular/common';
import { CreateEventComponent } from './events/feature/create-event/create-event.component';
import { RegisterComponent } from './auth/feature/register/register.component';
import { UserService } from './users/data-access/user.service';
import { EventService } from './events/data-access/event.service';
import { LoginComponent } from './auth/feature/login/login.component';
import { HeaderContainerComponent } from './shared/feature/header-container/header-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, CreateEventComponent, RegisterComponent, LoginComponent, HeaderContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bpcn';
  users: any;
  events: any;

  constructor(
    private userService:  UserService,
    private eventService: EventService) {
    this.userService.getUsers().subscribe((users) => {
      console.log('users:', users);
      this.users = users;
    });

    this.eventService.getEvents().subscribe((events) => {
      console.log('events:', events);
      this.events = events;
    });
  }
}
