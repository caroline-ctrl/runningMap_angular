import { TestBed } from '@angular/core/testing';

import { RunningMapService } from './running-map.service';

describe('RunningMapService', () => {
  let service: RunningMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RunningMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
