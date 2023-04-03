import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmoKarchLasagnaComponent } from './algoritmo-karch-lasagna.component';

describe('AlgoritmoKarchLasagnaComponent', () => {
  let component: AlgoritmoKarchLasagnaComponent;
  let fixture: ComponentFixture<AlgoritmoKarchLasagnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoritmoKarchLasagnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgoritmoKarchLasagnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
