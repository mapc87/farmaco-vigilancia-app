import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalFarmacoComponent } from './form-modal-farmaco.component';

describe('FormModalFarmacoComponent', () => {
  let component: FormModalFarmacoComponent;
  let fixture: ComponentFixture<FormModalFarmacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormModalFarmacoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormModalFarmacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
