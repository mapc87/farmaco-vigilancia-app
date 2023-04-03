import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfectosAdversosComponent } from './efectos-adversos.component';

describe('EfectosAdversosComponent', () => {
  let component: EfectosAdversosComponent;
  let fixture: ComponentFixture<EfectosAdversosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfectosAdversosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfectosAdversosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
