import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { PageStore } from '../../../pages/data-access/page.store';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { FeatureFlagPipe } from '../../utils/feature-flag.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FeatureFlagPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isHomepage = false;

  constructor(
    private router: Router,
    public pageStore: PageStore
  ) {}

  ngOnInit() {
    this.pageStore.loadPrimaryNavLinks();

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    ).subscribe((event: any) => {
      this.isHomepage = (event.url === '/');
    });
  }
}
