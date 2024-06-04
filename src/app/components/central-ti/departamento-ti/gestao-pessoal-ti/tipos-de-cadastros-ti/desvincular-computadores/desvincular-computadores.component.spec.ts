import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesvincularComputadoresComponent } from './desvincular-computadores.component';

describe('DesvincularComputadoresComponent', () => {
  let component: DesvincularComputadoresComponent;
  let fixture: ComponentFixture<DesvincularComputadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesvincularComputadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesvincularComputadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
