import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesColaboradoresTiComponent } from './solicitacoes-colaboradores-ti.component';

describe('SolicitacoesColaboradoresTiComponent', () => {
  let component: SolicitacoesColaboradoresTiComponent;
  let fixture: ComponentFixture<SolicitacoesColaboradoresTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacoesColaboradoresTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacoesColaboradoresTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
