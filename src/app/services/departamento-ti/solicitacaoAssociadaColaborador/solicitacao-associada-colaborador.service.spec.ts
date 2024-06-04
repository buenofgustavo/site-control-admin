import { TestBed } from '@angular/core/testing';

import { SolicitacaoAssociadaColaboradorService } from './solicitacao-associada-colaborador.service';

describe('SolicitacaoAssociadaColaboradorService', () => {
  let service: SolicitacaoAssociadaColaboradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitacaoAssociadaColaboradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
