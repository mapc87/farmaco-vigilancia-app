import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormEnfermedadComponent } from './modal-form-enfermedad.component';

describe('ModalFormEnfermedadComponent', () => {
  let component: ModalFormEnfermedadComponent;
  let fixture: ComponentFixture<ModalFormEnfermedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormEnfermedadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
