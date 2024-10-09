import { Component } from '@angular/core';
import { UserService } from '../../../users/data-access/user.service';
import { SiteMapComponent } from '../../../pages/feature/site-map/site-map.component';

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  role?: {
    id: number;
    name: string;
    description: string;
    type: string;
  };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor() {}
}
