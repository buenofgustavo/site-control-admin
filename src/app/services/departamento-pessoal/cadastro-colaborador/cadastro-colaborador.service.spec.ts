import { TestBed } from '@angular/core/testing';

import { CadastroColaboradorService } from './cadastro-colaborador.service';

describe('CadastroColaboradorService', () => {
  let service: CadastroColaboradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroColaboradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
