import { Component } from '@angular/core';
import { IEvent, EventStatus } from '../../utils/event.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../../data-access/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  newEvent: IEvent = {
    title: '',
    description: '',
    date: '',
    location: '',
    locale: '',
    state: EventStatus.PENDING
  }

  message: string | null = null;

  constructor(private eventService: EventService) {}

  onSubmit() {
    this.eventService.createEvent(this.newEvent).subscribe(
      (createdEvent) => {
        this.message = `Event ID: ${createdEvent.id}`;
        console.log('Created event:', createdEvent);
      },
      (error) => {
        this.message = 'Error creating event.';
        console.error('Error:', error);
      }
    );
  }
}
