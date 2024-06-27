import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogComputadoresComprasComponent } from './log-computadores-compras.component';

describe('LogComputadoresComprasComponent', () => {
  let component: LogComputadoresComprasComponent;
  let fixture: ComponentFixture<LogComputadoresComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogComputadoresComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogComputadoresComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
