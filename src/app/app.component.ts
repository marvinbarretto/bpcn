import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StrapiService } from './shared/data-access/strapi.service';
import { JsonPipe } from '@angular/common';
import { CreateEventComponent } from './events/feature/create-event/create-event.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, CreateEventComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bpcn';
  users: any;
  events: any;

  constructor(private strapiService:  StrapiService) {
    this.strapiService.getUsers().subscribe((users) => {
      console.log('users:', users);
      this.users = users;
    });

    this.strapiService.getEvents().subscribe((events) => {
      console.log('events:', events);
      this.events = events;
    });
  }
}
