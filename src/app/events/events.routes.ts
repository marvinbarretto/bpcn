import { Routes } from "@angular/router";

export const EVENTS_ROUTES: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./feature/create-event/create-event.component').then(m => m.CreateEventComponent)
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
