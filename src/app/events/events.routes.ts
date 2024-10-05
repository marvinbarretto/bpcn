import { Routes } from "@angular/router";

export const EVENTS_ROUTES: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./feature/create-event/create-event.component').then(m => m.CreateEventComponent)
  }
]
