import { TestBed } from '@angular/core/testing';

import { RandomNumberServiceService } from './random-number-service.service';

describe('RandomNumberServiceService', () => {
  let service: RandomNumberServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomNumberServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
