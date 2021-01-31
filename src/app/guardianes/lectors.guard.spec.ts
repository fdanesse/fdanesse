import { TestBed, async, inject } from '@angular/core/testing';

import { LectorsGuard } from './lectors.guard';

describe('LectorsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectorsGuard]
    });
  });

  it('should ...', inject([LectorsGuard], (guard: LectorsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
