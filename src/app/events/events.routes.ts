import { Routes } from "@angular/router";

export const EVENTS_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () => import('./feature/create-event/create-event.component').then(m => m.CreateEventComponent)
  },
  {
    path: 'review',
    loadComponent: () => import('./feature/review-events/review-events.component').then(m => m.ReviewEventsComponent)
  },
  {
    path: ':slug',
    loadComponent: () => import('./ui/event-detail/event-detail.component').then(m => m.EventDetailComponent)
  },
  {
    path: '',
    loadComponent: () => import('./feature/event-list/event-list.component').then(m => m.EventListComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
]
