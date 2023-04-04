import { TestBed } from '@angular/core/testing';

import { EnfermedadServiceService } from './enfermedad.service.service';

describe('EnfermedadServiceService', () => {
  let service: EnfermedadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnfermedadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
