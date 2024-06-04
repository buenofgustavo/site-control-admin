import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarDesligamentoComponent } from './solicitar-desligamento.component';

describe('SolicitarDesligamentoComponent', () => {
  let component: SolicitarDesligamentoComponent;
  let fixture: ComponentFixture<SolicitarDesligamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarDesligamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarDesligamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
