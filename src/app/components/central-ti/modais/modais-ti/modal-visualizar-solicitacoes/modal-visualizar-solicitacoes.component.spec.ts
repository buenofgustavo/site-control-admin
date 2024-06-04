import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarSolicitacoesComponent } from './modal-visualizar-solicitacoes.component';

describe('ModalVisualizarSolicitacoesComponent', () => {
  let component: ModalVisualizarSolicitacoesComponent;
  let fixture: ComponentFixture<ModalVisualizarSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizarSolicitacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVisualizarSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
