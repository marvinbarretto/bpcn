import { Injectable, signal } from "@angular/core";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IEvent } from "../utils/event.model";
import { EventService } from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class EventStore {
  events$$ = signal<IEvent[]>([]);
  loading$$ = signal<boolean>(false);
  error$$ = signal<string | null>(null);

  constructor(private eventService: EventService) {}

  loadEvents() {
    this.loading$$.set(true);
    this.error$$.set(null);

    this.eventService.getEvents().pipe(
      tap((events: IEvent[]) => {
        this.events$$.set(events);
        this.loading$$.set(false);
      }),
      catchError((error) => {
        this.error$$.set(`Failed to load events. ${error}`);
        this.loading$$.set(false);
        return of([]);
      })
    ).subscribe();
  }
}
