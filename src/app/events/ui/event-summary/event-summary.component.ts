import { Component, Input } from '@angular/core';
import { IEvent } from '../../utils/event.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-summary',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './event-summary.component.html',
  styleUrl: './event-summary.component.scss'
})
export class EventSummaryComponent {
  @Input() event!: IEvent
}
