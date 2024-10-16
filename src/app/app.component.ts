import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserInfoComponent } from './shared/feature/user-info/user-info.component';
import { HeaderComponent } from "./shared/feature/header/header.component";
import { FooterComponent } from './shared/feature/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { filter, mergeMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { PageTitleService } from './shared/data-access/page-title.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, UserInfoComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private titleService: PageTitleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        // Traverse the route tree to find the deepest child
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data),
      map(data => data['title']) // Access the 'title' from route data
    ).subscribe(title => {
      this.titleService.setTitle(title);
    });
  }
}
