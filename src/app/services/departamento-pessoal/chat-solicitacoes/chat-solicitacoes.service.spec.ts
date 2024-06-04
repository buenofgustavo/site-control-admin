import { TestBed } from '@angular/core/testing';

import { ChatSolicitacoesService } from './chat-solicitacoes.service';

describe('ChatSolicitacoesService', () => {
  let service: ChatSolicitacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatSolicitacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
