import { TestBed } from '@angular/core/testing';

import { FarmacoServiceService } from './farmaco.service.service';

describe('FarmacoServiceService', () => {
  let service: FarmacoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmacoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
