import { Routes } from "@angular/router";

export const EVENTS_ROUTES: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./feature/create-event/create-event.component').then(m => m.CreateEventComponent)
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
