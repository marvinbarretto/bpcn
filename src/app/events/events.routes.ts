import { Routes } from "@angular/router";

export const EVENTS_ROUTES: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./feature/create-event/create-event.component').then(m => m.CreateEventComponent)
  },
  {
    path: '',
    loadComponent: () => import('./feature/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
]
