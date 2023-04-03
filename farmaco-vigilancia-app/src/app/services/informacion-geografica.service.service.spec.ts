import { TestBed } from '@angular/core/testing';

import { InformacionGeograficaServiceService } from './informacion-geografica.service.service';

describe('InformacionGeograficaServiceService', () => {
  let service: InformacionGeograficaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionGeograficaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
