import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoColaboradoresDpComponent } from './solicitacao-colaboradores-dp.component';

describe('SolicitacaoColaboradoresDpComponent', () => {
  let component: SolicitacaoColaboradoresDpComponent;
  let fixture: ComponentFixture<SolicitacaoColaboradoresDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoColaboradoresDpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoColaboradoresDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
