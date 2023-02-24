import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteFichaMedicaComponent } from './paciente-ficha-medica.component';

describe('PacienteFichaMedicaComponent', () => {
  let component: PacienteFichaMedicaComponent;
  let fixture: ComponentFixture<PacienteFichaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteFichaMedicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteFichaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
