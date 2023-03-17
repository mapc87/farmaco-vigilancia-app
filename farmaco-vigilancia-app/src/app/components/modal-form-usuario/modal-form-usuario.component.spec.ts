import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormUsuarioComponent } from './modal-form-usuario.component';

describe('ModalFormUsaurioComponent', () => {
  let component: ModalFormUsuarioComponent;
  let fixture: ComponentFixture<ModalFormUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
