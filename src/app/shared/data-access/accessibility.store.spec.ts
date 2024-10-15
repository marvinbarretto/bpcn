import { TestBed } from '@angular/core/testing';

import { AccessibilityStore } from './accessibility.store';

describe('AccessibilityService', () => {
  let service: AccessibilityStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessibilityStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
