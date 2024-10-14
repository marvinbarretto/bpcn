import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import { createMockAuthStore } from '../../../shared/utils/mock-store';
import { createMockEventStore } from '../../../shared/utils/mock-store';
import { EventStore } from '../../data-access/event.store';
import { AuthStore } from '../../../auth/data-access/auth.store';
import { provideRouter } from '@angular/router';


describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  let mockEventStore: ReturnType<typeof createMockEventStore>;
  let mockAuthStore: ReturnType<typeof createMockAuthStore>;

  beforeEach(async () => {
    mockEventStore = createMockEventStore();
    mockAuthStore = createMockAuthStore();

    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: EventStore, useValue: mockEventStore },
        { provide: AuthStore, useValue: mockAuthStore }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
