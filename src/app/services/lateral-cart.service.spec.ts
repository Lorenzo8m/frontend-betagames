import { TestBed } from '@angular/core/testing';

import { LateralCartService } from './lateral-cart.service';

describe('LateralCartService', () => {
  let service: LateralCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LateralCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
