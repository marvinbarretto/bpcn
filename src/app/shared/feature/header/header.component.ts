import { Component, effect, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageStore } from '../../../pages/data-access/page.store';
import { Page } from '../../../pages/utils/page.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(public pageStore: PageStore) {}

  ngOnInit() {
    this.pageStore.loadPages();
  }

}
