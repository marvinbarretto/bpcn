import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventStore } from '../../data-access/event.store';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements OnInit {
  constructor(public eventStore: EventStore) {}

  ngOnInit() {
    this.eventStore.loadEvents();
  }
}
