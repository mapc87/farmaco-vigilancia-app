import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormUsaurioComponent } from './modal-form-usaurio.component';

describe('ModalFormUsaurioComponent', () => {
  let component: ModalFormUsaurioComponent;
  let fixture: ComponentFixture<ModalFormUsaurioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormUsaurioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormUsaurioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
