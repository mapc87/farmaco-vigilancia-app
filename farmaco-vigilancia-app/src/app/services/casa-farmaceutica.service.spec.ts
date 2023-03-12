import { TestBed } from '@angular/core/testing';

import { CasaFarmaceuticaService } from './casa-farmaceutica.service';

describe('CasaFarmaceuticaService', () => {
  let service: CasaFarmaceuticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasaFarmaceuticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
