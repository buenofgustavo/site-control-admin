import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarChamadosGeralComponent } from './visualizar-chamados-geral.component';

describe('VisualizarChamadosGeralComponent', () => {
  let component: VisualizarChamadosGeralComponent;
  let fixture: ComponentFixture<VisualizarChamadosGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarChamadosGeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarChamadosGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
