import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoMonitorComponent } from './gestao-monitor.component';

describe('GestaoMonitorComponent', () => {
  let component: GestaoMonitorComponent;
  let fixture: ComponentFixture<GestaoMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
