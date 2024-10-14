import { signal } from "@angular/core";
import { IEvent } from "../../events/utils/event.model";

export function createMockEventStore() {
  return {
    events$$: jest.fn(() => signal([])),
    loadEvents: jest.fn(),
    loadEvent: jest.fn(),
    createEvent: jest.fn(),
    updateEvent: jest.fn(),
    deleteEvent: jest.fn(),
    loading$$: jest.fn(() => signal(false)),
    error$$: jest.fn(() => signal(null)),
  };
}

export function createMockAuthStore() {
  return {
    user$: jest.fn(() => signal(null)),
    isAuthenticated$: jest.fn(() => signal(false)),
    canCreateEvent: jest.fn(() => true),
    canReviewEvents: jest.fn(() => true),
  };
}
