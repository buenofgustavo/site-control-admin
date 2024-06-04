import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCadastroComponent } from './solicitar-cadastro.component';

describe('SolicitarCadastroComponent', () => {
  let component: SolicitarCadastroComponent;
  let fixture: ComponentFixture<SolicitarCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
