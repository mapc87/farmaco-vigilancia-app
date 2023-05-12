import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFarmacosComponent } from './modal-farmacos.component';

describe('ModalFarmacosComponent', () => {
  let component: ModalFarmacosComponent;
  let fixture: ComponentFixture<ModalFarmacosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFarmacosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFarmacosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
