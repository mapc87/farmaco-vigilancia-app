import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaFarmaceuticaComponent } from './casa-farmaceutica.component';

describe('CasaFarmaceuticaComponent', () => {
  let component: CasaFarmaceuticaComponent;
  let fixture: ComponentFixture<CasaFarmaceuticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaFarmaceuticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaFarmaceuticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
