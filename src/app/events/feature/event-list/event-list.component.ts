import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventStore } from '../../data-access/event.store';
import { RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../../../auth/data-access/auth.store';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {
  eventStore = inject(EventStore);
  authStore = inject(AuthStore);

  ngOnInit() {
    if (this.eventStore.events$$().length === 0) {
      console.log('No events found in store, fetching from server...');
      this.eventStore.loadEvents();
    } else {
      console.log('Events already loaded in store, no need to fetch.');
    }
  }
}
