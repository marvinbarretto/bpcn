import { Component, Input } from '@angular/core';
import { IEvent } from '../../utils/event.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  @Input() events: IEvent[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
}
