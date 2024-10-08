import { Routes } from "@angular/router";

export const PAGES_ROUTES: Routes = [
  {
    path: ':slug',
    loadComponent: () => import('./feature/page/page.component').then(m => m.PageComponent)
  }
];
