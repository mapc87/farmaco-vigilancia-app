import { TestBed } from '@angular/core/testing';

import { EfectosAdversosServiceService } from './efectos-adversos.service.service';

describe('EfectosAdversosServiceService', () => {
  let service: EfectosAdversosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EfectosAdversosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
