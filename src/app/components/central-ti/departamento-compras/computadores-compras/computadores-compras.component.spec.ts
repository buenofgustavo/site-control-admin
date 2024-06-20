import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputadoresComprasComponent } from './computadores-compras.component';

describe('ComputadoresComprasComponent', () => {
  let component: ComputadoresComprasComponent;
  let fixture: ComponentFixture<ComputadoresComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputadoresComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputadoresComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
