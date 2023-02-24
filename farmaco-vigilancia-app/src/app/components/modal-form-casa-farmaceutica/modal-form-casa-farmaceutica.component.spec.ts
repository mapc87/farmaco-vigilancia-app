import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormCasaFarmaceuticaComponent } from './modal-form-casa-farmaceutica.component';

describe('ModalFormCasaFarmaceuticaComponent', () => {
  let component: ModalFormCasaFarmaceuticaComponent;
  let fixture: ComponentFixture<ModalFormCasaFarmaceuticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormCasaFarmaceuticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormCasaFarmaceuticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
