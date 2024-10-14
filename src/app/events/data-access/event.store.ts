import { Injectable, signal } from "@angular/core";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IEvent } from "../utils/event.model";
import { EventService } from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class EventStore {
  currentEvent$$ = signal<IEvent | null>(null);
  events$$ = signal<IEvent[]>([]);
  loading$$ = signal<boolean>(false);
  error$$ = signal<string | null>(null);

  constructor(private eventService: EventService) {}

  loadEvents() {
    console.log('Loading events from server...');
    this.loading$$.set(true);
    this.error$$.set(null);

    this.eventService.getEvents().pipe(
      tap((events: IEvent[]) => {
        console.log('Events loaded from server:', events);
        this.events$$.set(events);
        this.loading$$.set(false);
      }),
      catchError((error) => {
        console.log('Error loading events:', error);
        this.error$$.set(`Failed to load events. ${error}`);
        this.loading$$.set(false);
        return of([]);
      })
    ).subscribe();
  }

  // Select an event by slug, if not found in store, fetch from service by documentId
  selectEventBySlug(slug: string) {
    console.log(`Checking if event with slug "${slug}" exists in store...`);
    // Try to find the event in the events$$ store
    const event = this.events$$().find(event => event.slug === slug);

    if (event) {
      // If the event is found, set it as the current event
      console.log(`Event found in store for slug "${slug}":`, event);
      this.currentEvent$$.set(event);
    } else {
      // If event is not found, log and fetch from server using the documentId
      console.log(`Event not found in store for slug "${slug}". Fetching from server...`);
      this.fetchEventBySlug(slug);
    }
  }

  // Fetch event from the service based on the slug (assumes you need the documentId)
  private fetchEventBySlug(slug: string) {
    console.log(`Fetching event list from server to find documentId for slug "${slug}"...`);

    this.loading$$.set(true);
    this.eventService.getEvents().pipe(
      tap((events: IEvent[]) => {
        // Find the event with the matching slug to get the documentId
        const event = events.find(event => event.slug === slug);
        if (event && event.documentId) {
          console.log(`Event found on server for slug "${slug}". Fetching full details using documentId "${event.documentId}"...`);

          // If the event is found, fetch it by documentId
          this.fetchEventByDocumentId(event.documentId);
        } else {
          console.log(`Event with slug "${slug}" not found on server.`);

          this.error$$.set('Event not found');
          this.loading$$.set(false);
        }
      }),
      catchError((error) => {
        console.log('Error loading event list:', error);

        this.error$$.set(`Failed to load event. ${error}`);
        this.loading$$.set(false);
        return of([]);
      })
    ).subscribe();
  }

    // Fetch event by documentId
    private fetchEventByDocumentId(documentId: string) {
      console.log(`Fetching event details from server using documentId "${documentId}"...`);

      this.eventService.getEvent(documentId).pipe(
        tap((event: IEvent) => {
          console.log(`Event details loaded from server for documentId "${documentId}":`, event);

          this.currentEvent$$.set(event);
          this.loading$$.set(false);
        }),
        catchError((error) => {
          console.log('Error loading event details:', error);

          this.error$$.set(`Failed to load event details. ${error}`);
          this.loading$$.set(false);
          return of(null);
        })
      ).subscribe();
    }

    clearCurrentEvent() {
      console.log('Clearing current event...');

      this.currentEvent$$.set(null);
    }
}
