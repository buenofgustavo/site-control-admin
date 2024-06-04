import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarAtivosTiComponent } from './modal-visualizar-ativos-ti.component';

describe('ModalVisualizarAtivosTiComponent', () => {
  let component: ModalVisualizarAtivosTiComponent;
  let fixture: ComponentFixture<ModalVisualizarAtivosTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizarAtivosTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVisualizarAtivosTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
