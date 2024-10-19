import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventStore } from '../../data-access/event.store';
import { inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { IEventContentBlock } from '../../utils/event.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {

  eventStore = inject(EventStore);
  route = inject(ActivatedRoute);

  // Access the current event signal
  event = this.eventStore.currentEvent$$;
  loading = this.eventStore.loading$$;
  error = this.eventStore.error$$;

  assetPath = 'http://localhost:1337'; // FIXME: This is a temporary fix to allow the app to build. We need to find a better way to handle this.

  // TODO: The page title should be dynamic based on the event title


  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      console.log('loading event by slug', slug);
      this.eventStore.selectEventBySlug(slug);
    }
  }

  // Helper method to format date
  formatEventDate(date: string): string {
    const eventDate = new Date(date);
    return formatDate(eventDate, 'MMMM d, yyyy, h:mm a', 'en-US');
  }

  // Check if the block has any meaningful content
  hasContent(block: IEventContentBlock): boolean {
    return block.children.some((child) => child.text.trim().length > 0);
  }

  ngOnDestroy() {
    // Optionally clear the selected event when leaving the component
    this.eventStore.clearCurrentEvent();
  }

}
