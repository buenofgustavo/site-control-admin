import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogComputadoresComponent } from './log-computadores.component';

describe('LogComputadoresComponent', () => {
  let component: LogComputadoresComponent;
  let fixture: ComponentFixture<LogComputadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogComputadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogComputadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
