import { TestBed } from '@angular/core/testing';

import { GestaoAtivosService } from './gestao-ativos.service';

describe('GestaoAtivosService', () => {
  let service: GestaoAtivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestaoAtivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
