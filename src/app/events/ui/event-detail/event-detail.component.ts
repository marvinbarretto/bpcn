import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventStore } from '../../data-access/event.store';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor(


  ) {

  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      console.log('loading event by slug', slug);
      this.eventStore.selectEventBySlug(slug);
    }
  }

  ngOnDestroy() {
    // Optionally clear the selected event when leaving the component
    this.eventStore.clearCurrentEvent();
  }

}
