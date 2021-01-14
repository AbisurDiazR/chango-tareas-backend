import { TestBed } from '@angular/core/testing';

import { WpGuard } from './wp.guard';

describe('WpGuard', () => {
  let guard: WpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
