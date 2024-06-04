import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroColaboradorTiComponent } from './cadastro-colaborador-ti.component';

describe('CadastroColaboradorTiComponent', () => {
  let component: CadastroColaboradorTiComponent;
  let fixture: ComponentFixture<CadastroColaboradorTiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroColaboradorTiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroColaboradorTiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
