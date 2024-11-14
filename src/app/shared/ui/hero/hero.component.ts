import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input() title: string = '';
  @Input() backgroundImage?: string;
  @Input() cssClass?: string;
  @Input() headingLevel: 'h1' | 'h2' | 'h3' = 'h1';


  constructor() {}

}
