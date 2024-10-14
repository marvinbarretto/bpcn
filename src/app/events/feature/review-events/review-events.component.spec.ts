import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEventsComponent } from './review-events.component';

describe('ReviewEventsComponent', () => {
  let component: ReviewEventsComponent;
  let fixture: ComponentFixture<ReviewEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
