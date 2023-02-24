import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormCasaMedicaComponent } from './modal-form-casa-medica.component';

describe('ModalFormCasaMedicaComponent', () => {
  let component: ModalFormCasaMedicaComponent;
  let fixture: ComponentFixture<ModalFormCasaMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormCasaMedicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormCasaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
