import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputadoresTiComponent } from './computadores-ti.component';

describe('ComputadoresTiComponent', () => {
  let component: ComputadoresTiComponent;
  let fixture: ComponentFixture<ComputadoresTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputadoresTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputadoresTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
