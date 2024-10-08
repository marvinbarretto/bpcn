import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './shared/feature/user-info/user-info.component';
import { HeaderComponent } from "./shared/feature/header/header.component";
import { FooterComponent } from './shared/feature/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, UserInfoComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
