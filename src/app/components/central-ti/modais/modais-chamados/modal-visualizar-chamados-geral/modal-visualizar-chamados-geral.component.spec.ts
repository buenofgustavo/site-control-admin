import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarChamadosGeralComponent } from './modal-visualizar-chamados-geral.component';

describe('ModalVisualizarChamadosGeralComponent', () => {
  let component: ModalVisualizarChamadosGeralComponent;
  let fixture: ComponentFixture<ModalVisualizarChamadosGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizarChamadosGeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVisualizarChamadosGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
