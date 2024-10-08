import { Routes } from '@angular/router';
import { LoginComponent } from './auth/feature/login/login.component';
import { RegisterComponent } from './auth/feature/register/register.component';
import { authGuard } from './auth/data-access/auth.guard';
import { HomeComponent } from './home/feature/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.routes').then(m => m.EVENTS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.routes').then(m => m.PAGES_ROUTES),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
