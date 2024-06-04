import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosTiComponent } from './chamados-ti.component';

describe('ChamadosTiComponent', () => {
  let component: ChamadosTiComponent;
  let fixture: ComponentFixture<ChamadosTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamadosTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadosTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
